export default function formatDate(dateString) {
  const date = new Date();
  date.setTime(Date.parse(dateString));
  return date.toLocaleString('en-US', { timeZone: 'UTC' }).split(', ')[0];
}