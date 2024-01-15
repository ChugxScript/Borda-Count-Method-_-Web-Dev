document.addEventListener("DOMContentLoaded", function () {
    // Add fading in effect while scrolling
    const elements = document.querySelectorAll('.fadeIn');

    const fadeIn = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(fadeIn, { rootMargin: '0px 0px -100px 0px' });

    elements.forEach(element => {
        observer.observe(element);
    });
});
