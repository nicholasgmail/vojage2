export default (context, inject) => {
  const getLcStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error getting value from localStorage for key "${key}":`, error);
      return null;
    }
  };
  const setLcStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting value in localStorage for key "${key}":`, error);
    }
  };
  const delLcStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error setting value in localStorage for key "${key}":`, error);
    }
  };

  // Внедряем функции в контекст и компоненты
  inject('getLcStorage', getLcStorage);
  inject('setLcStorage', setLcStorage);
  inject('delLcStorage', delLcStorage);
};
