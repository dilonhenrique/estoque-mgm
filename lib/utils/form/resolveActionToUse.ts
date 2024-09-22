import { FormAction } from "@/types/form";
import { AnyObject } from "@/types/types";
import { FieldValues } from "react-hook-form";

export function resolveActionToUse<T extends FieldValues>(
  event?: SubmitEvent,
  action?: FormAction<T> | AnyObject<FormAction<T>>
) {
  if (!action) return undefined;
  if (typeof action === "function") return action;

  const submitter = event?.submitter as HTMLButtonElement | undefined;
  const formAction = submitter?.value;

  if (formAction && formAction in action) {
    return action[formAction];
  }

  for (const act of Object.values(action)) {
    return act;
  }
}
