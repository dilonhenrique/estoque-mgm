export default function numberMask(value?: string) {
  return value?.replace(/[^\d-]/g, "");
}
