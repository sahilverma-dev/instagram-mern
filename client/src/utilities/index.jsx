export const formatNumder = (num) => {
  if (num < 1e3) return num.toLocaleString();
  else if (num >= 1e6) return `${(num / 1e6).toString().slice(0, 4)}m`;
  else if (num >= 1e3) return `${(num / 1e3).toString().slice(0, 3)}k`;
};
