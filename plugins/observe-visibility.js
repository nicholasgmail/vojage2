// plugins/observe-visibility.js

export default ({ app }, inject) => {
  const handleVisibilityChange = (isVisible) => {
    if (isVisible) {
      console.log('Элемент появился в области видимости');
    } else {
      console.log('Элемент покинул область видимости');
    }
  };

  inject('observeVisibility', (el) => {
    const options = {
      callback: entries => {
        entries.forEach(entry => {
          handleVisibilityChange(entry.isIntersecting);
        });
      },
    };

    const observer = new IntersectionObserver(options.callback);
    observer.observe(el);

    el._intersectionObserver = observer;
  });
};
