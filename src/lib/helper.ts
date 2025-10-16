export function getLastChars(value: string, length: number) {
  if (typeof value !== "string") {
    throw new Error("First argument must be a string");
  }
  if (length <= 0) {
    return "";
  }
  return value.slice(-length);
}

export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number, decimals = 1) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
}
