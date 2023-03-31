/**
 *
 * @param {any} func
 * @param {number} wait
 * @return {any}
 */
export const debounce = <T extends (...args: any[]) => unknown>(
  func: T,
  wait = 1000,
): ((...args: Parameters<T>) => void) => {
  let timerId: NodeJS.Timeout;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func(...args);
    }, wait);
  };
};
