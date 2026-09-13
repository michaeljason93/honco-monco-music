(function () {
  'use strict';

  const galleries = document.querySelectorAll('[data-testimonial-gallery]');

  galleries.forEach(function (gallery) {
    const quote = gallery.querySelector('[data-testimonial-quote]');
    const author = gallery.querySelector('[data-testimonial-author]');
    const count = gallery.querySelector('[data-testimonial-count]');
    const previous = gallery.querySelector('[data-testimonial-previous]');
    const next = gallery.querySelector('[data-testimonial-next]');
    let testimonials = [];
    let currentIndex = 0;

    function showTestimonial() {
      const testimonial = testimonials[currentIndex];
      quote.textContent = '“' + testimonial.quote + '”';
      author.textContent = '— ' + testimonial.author;
      count.textContent = (currentIndex + 1) + ' / ' + testimonials.length;
    }

    function move(step) {
      currentIndex = (currentIndex + step + testimonials.length) % testimonials.length;
      showTestimonial();
    }

    function showFallback() {
      testimonials = [{
        quote: 'Add your first testimonial to wwwroot/json/testimonials.json.',
        author: 'Honco Monco family'
      }];
      showTestimonial();
    }

    previous.addEventListener('click', function () { move(-1); });
    next.addEventListener('click', function () { move(1); });

    fetch('wwwroot/json/testimonials.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Testimonials could not be loaded.');
        }
        return response.json();
      })
      .then(function (data) {
        testimonials = Array.isArray(data) ? data.filter(function (item) {
          return item && item.quote && item.author;
        }) : [];
        if (!testimonials.length) {
          showFallback();
          return;
        }
        currentIndex = Math.floor(Math.random() * testimonials.length);
        showTestimonial();
      })
      .catch(showFallback);
  });
})();