export function formatNumberWithCommas(value) {
  return value ? (value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : "";
}

export function maximizeString(string, maxLength) {
  return string ? (string.length > maxLength ? string.substring(0, maxLength) + "..." : string) : "";
}