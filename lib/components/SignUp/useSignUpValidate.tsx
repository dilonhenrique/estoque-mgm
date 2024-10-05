import { signupSchema } from "@/utils/validation/schema/signup";
import { useFormCustom } from "../ui/forms/fields/Form/useFormCustom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseErrorSchema } from "@/utils/formResolver/zodResolver";

const stepToName = new Map([
  [1, "account"],
  [2, "address"],
  [3, "user"],
]);
const steps = Array.from({ length: stepToName.size }, (_, i) => i + 1);

export function useSignUpValidate() {
  const router = useRouter();

  const [validSteps, setValidSteps] = useState<number[]>([]);
  const [disabledKeys, setDisabledKeys] = useState(["2_tab", "3_tab"]);

  const methods = useFormCustom({
    schema: signupSchema,
    useFormProps: { shouldUnregister: false },
  });

  function addValidStep(step: number) {
    if (!validSteps.includes(step)) {
      setValidSteps((current) => [...current, step]);
    }
  }

  function removeValidStep(step: number) {
    setValidSteps((current) => current.filter((s) => s !== step));
  }

  useEffect(() => {
    const lastValidStep = getLastValidStep(validSteps) ?? 0;
    handleDisabledKeys(lastValidStep);
  }, [validSteps]);

  function getLastValidStep(validSteps: number[]) {
    for (const step of steps) {
      if (!validSteps.includes(step)) return step - 1;
    }

    return undefined;
  }

  function handleDisabledKeys(lastValidStep: number) {
    const nextDisabledKey = lastValidStep + 2;

    const disabledSteps = steps
      .filter((step) => step >= nextDisabledKey)
      .map((step) => `${step}_tab`);

    setDisabledKeys(disabledSteps);
  }

  function validateStep(step: number): boolean {
    methods.clearErrors();

    const activeKey = stepToName.get(step) as keyof typeof signupSchema.shape;
    const activeSchema = signupSchema.pick({ [activeKey]: true } as any);

    const data = methods.getValues();
    const validation = activeSchema.safeParse(data);

    if (validation.success) {
      addValidStep(step);
      return true;
    }

    Object.entries(parseErrorSchema(validation.error.errors, true)).forEach(
      ([name, error]) => {
        methods.control.setError(name, error);
      }
    );

    removeValidStep(step);

    router.refresh();
    return false;
  }

  return { methods, validateStep, validSteps, disabledKeys };
}
