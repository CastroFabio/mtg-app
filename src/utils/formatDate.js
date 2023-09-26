export default function formatDate(inputDate) {
  let date, day, month, year;
  date = new Date(inputDate);
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();
  day = day.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  return `${day}/${month}/${year}`;
}
