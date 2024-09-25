import { FormProps } from "./form";
import { FormEvent, useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  get,
  Path,
  useFormContext,
} from "react-hook-form";
import { useFormCustom } from "./useFormCustom";
import { resolveActionToUse } from "@/utils/form/resolveActionToUse";

export default function Form<T extends FieldValues>({
  schema,
  defaultValues,
  useFormProps,
  ...props
}: FormProps<T>) {
  const contextMethods = useFormContext<T>();
  const defaultMethods = useFormCustom<T>({
    defaultValues,
    schema,
    useFormProps,
  });

  const methods = contextMethods ?? defaultMethods;

  const [mounted, setMounted] = useState(false);
  const {
    control = methods.control,
    beforeSubmit,
    children,
    action,
    headers,
    render,
    onError,
    onSuccess,
    validateResponse,
    formRef,
    ...rest
  } = props;

  const submit = async (event?: FormEvent<HTMLFormElement>) => {
    let hasError = false;
    let type = "";

    await control.handleSubmit(async (data) => {
      const formData = new FormData();

      for (const name of Object.keys(methods.getValues())) {
        formData.append(name, get(data, name));
      }

      if (beforeSubmit) {
        await beforeSubmit({
          data,
          event,
          formData,
          methods,
        });
      }

      const actionToUse = resolveActionToUse(
        event?.nativeEvent as SubmitEvent,
        action
      );

      if (actionToUse) {
        try {
          const response = await actionToUse(data);

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

  function FormChildren() {
    return (
      <>
        {render ? (
          render({ submit })
        ) : (
          <form ref={formRef} noValidate={mounted} onSubmit={submit} {...rest}>
            {children}
          </form>
        )}
      </>
    );
  }

  if (contextMethods) {
    return <FormChildren />;
  }

  return (
    <FormProvider {...methods}>
      <FormChildren />
    </FormProvider>
  );
}
