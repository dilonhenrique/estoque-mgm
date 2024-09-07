import { FormProps } from "@/types/form";
import { zodResolver } from "@/utils/formResolver/zodResolver";
import { merge } from "lodash";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  get,
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
    resolver: schema ? zodResolver(schema) : undefined,
  };
  const methods = useForm<T>(merge(defaultFormProps, useFormProps));

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

  const submit = async (event?: React.BaseSyntheticEvent) => {
    let hasError = false;
    let type = "";

    await control.handleSubmit(async (data) => {
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
          // const shouldStringifySubmissionData = [
          //   headers && headers["Content-Type"],
          //   encType,
          // ].some((value) => value && value.includes("json"));

          const response = await action(data);
          // : await fetch(action, {
          //     method,
          //     headers: {
          //       ...headers,
          //       ...(encType ? { "Content-Type": encType } : {}),
          //     },
          //     body: shouldStringifySubmissionData ? formDataJson : formData,
          //   });

          if (
            response &&
            (validateResponse ? !validateResponse(response) : !response.success)
          ) {
            hasError = true;
            onError && onError({ response });
            type = String(response.status);
          } else {
            onSuccess && onSuccess({ response });
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
