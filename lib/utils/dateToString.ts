export function dateToString(date?: Date) {
  if (!date) return null;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function dateTimeToString(date?: Date) {
  if (!date) return null;

  const day = dateToString(date);

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${day} às ${hour}:${minute}`;
}
