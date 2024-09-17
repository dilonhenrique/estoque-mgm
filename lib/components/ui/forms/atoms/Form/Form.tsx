import { FormProps } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { merge } from "lodash";
import { useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  FormProvider,
  get,
  Path,
  useForm,
  UseFormProps,
} from "react-hook-form";

function Form<
  T extends FieldValues,
  U extends FieldValues | undefined = undefined
>({ schema, defaultValues, useFormProps, ...props }: FormProps<T, U>) {
  const defaultFormProps: UseFormProps<T> = {
    mode: "onBlur",
    defaultValues,
    resolver: schema
      ? (data, ctx, opt) => {
          console.log("schema interceptor:", data);
          return (yupResolver(schema, {}, { raw: true }) as any)(
            data,
            ctx,
            opt
          );
        }
      : undefined,
  };
  const _options = useMemo(
    () => merge(defaultFormProps, useFormProps),
    [defaultFormProps, useFormProps]
  );
  const methods = useForm<T>(merge(_options));

  const [mounted, setMounted] = useState(false);
  const {
    control = methods.control,
    onSubmit,
    children,
    action,
    method = "post",
    headers,
    encType,
    onError,
    render,
    onSuccess,
    validateResponse,
    ...rest
  } = props;
  console.log("errors", methods.formState.errors);
  const submit = async (event?: React.BaseSyntheticEvent) => {
    let hasError = false;
    let type = "";

    await control.handleSubmit(async (data) => {
      console.log("handling submit", data);
      const formData = new FormData();
      let formDataJson = "";

      try {
        formDataJson = JSON.stringify(data);
      } catch {}

      for (const name of Object.keys(methods.getValues())) {
        formData.append(name, get(data, name));
      }

      if (onSubmit) {
        await onSubmit({
          data,
          event,
          method,
          formData,
          formDataJson,
        });
      }

      if (action) {
        try {
          console.log("submit payload:", data);
          const response = await action(data);
          console.log("submit response:", response);

          if (
            response &&
            (validateResponse ? !validateResponse(response) : !response.success)
          ) {
            hasError = true;
            onError && onError({ response });

            for (const [name, error] of Object.entries(response.fieldErrors)) {
              methods.setError(name as Path<T>, error);
            }

            type = String(response.status);
          } else {
            onSuccess && onSuccess(response);
          }
        } catch (error: unknown) {
          hasError = true;
          onError && onError({ error });
        }
      }
    })(event);

    if (hasError && props.control) {
      props.control._subjects.state.next({
        isSubmitSuccessful: false,
      });
      props.control.setError("root.server", {
        type,
      });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <FormProvider {...methods}>
      {render ? (
        <>
          {render({
            submit,
          })}
        </>
      ) : (
        <form
          noValidate={mounted}
          action={action}
          method={method}
          onSubmit={submit}
          {...rest}
        >
          {children}
        </form>
      )}
    </FormProvider>
  );
}

export { Form };
