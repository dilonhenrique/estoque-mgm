export default function notEmpty(val: string) {
  const trimed = val.trim();
  return trimed.length > 0;
}
