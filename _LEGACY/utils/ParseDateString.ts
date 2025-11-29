const parseDateString = (value: number) => {
  const dateStr = value.toString();
  const yearStr = parseInt(dateStr.substring(0, 4), 10);
  const monthStr = parseInt(dateStr.substring(4, 6), 10) - 1;
  const dayStr = parseInt(dateStr.substring(6, 8), 10);
  const date = new Date(yearStr, monthStr, dayStr);

  const pad = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더합니다.
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default parseDateString;