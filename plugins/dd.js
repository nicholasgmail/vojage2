export default ({ app }, inject) => {
  // Внедряем методы консоли в контекст приложения
  const consoleMethods = {
    log: (...args) => {
      console.log(...args);
    },
    dir: (...args) => {
      console.dir(...args);
    },
    error: (...args) => {
      console.error(...args);
    },
    warn: (...args) => {
      console.warn(...args);
    },
  };

  inject('dd', consoleMethods);
};
