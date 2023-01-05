export function debounce(func, timeout = 300) {
  let timer;
  return (...text) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, text);
    }, timeout);
  };
}
