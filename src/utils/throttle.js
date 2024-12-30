const throttle = (func, delay) => {
  let timeoutId = null;

  return function (...args) {
    if (!timeoutId) {
      func(...args);

      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
};

export default throttle;
