import Vue from 'vue';

Vue.directive('lazyload', {
  bind(el, binding) {
    const imageUrl = binding.value;

    // Set a placeholder image or loading state if needed
    el.src = 'placeholder-image.jpg';

    // Check if IntersectionObserver is supported in the browser
    if ('IntersectionObserver' in window) {
      let observer;

      // Use Intersection Observer for lazy loading
      observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          // Load the actual image when it comes into view
          el.src = imageUrl;

          // Unobserve the element to stop further callbacks
          if (observer) {
            observer.unobserve(el);
          }
        }
      });

      // Observe the target element
      observer.observe(el);

      // Store the observer instance on the element
      el.__vueLazyloadObserver = observer;
    } else {
      // Fallback for browsers that don't support Intersection Observer
      // Load the image immediately for such browsers
      el.src = imageUrl;
    }
  },
  unbind(el) {
    // Clean up and disconnect the IntersectionObserver when the element is unbound
    const observer = el.__vueLazyloadObserver;
    if (observer) {
      observer.disconnect();
      delete el.__vueLazyloadObserver;
    }
  },
});

