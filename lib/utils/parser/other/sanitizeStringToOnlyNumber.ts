export function sanitizeStringToOnlyNumber(val: undefined): undefined;
export function sanitizeStringToOnlyNumber(val: string): string;
export function sanitizeStringToOnlyNumber(val?: string): string | undefined;
export function sanitizeStringToOnlyNumber(val?: string) {
  return val?.replace(/[^\d]+/g, "");
}
