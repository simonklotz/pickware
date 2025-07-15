let lastScrollTop = 0;
const hideOnScroll = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        hideOnScroll.classList.add('hidden');
    } else {
        // Scrolling up
        hideOnScroll.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});