function toDateString(date?: Date) {
  if (!date) return null;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function toDateTimeString(date?: Date) {
  if (!date) return null;

  const day = toDateString(date);

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${day} às ${hour}:${minute}`;
}

export default function dateToString(date?: Date) {
  return {
    date: () => toDateString(date),
    datetime: () => toDateTimeString(date),
  };
}
