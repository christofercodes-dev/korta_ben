/*
 * Staggered reveal: elements with [data-reveal] fade and slide up when
 * they enter the viewport. Inside a [data-reveal-group] the second column
 * trails the first by a short delay (desktop only).
 */
export default function initReveal() {

    const items = document.querySelectorAll('[data-reveal]');

    if (!items.length) return;

    if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)
    ) {
        return;
    }

    const desktop = window.matchMedia('(min-width: 768px)');

    items.forEach((item) => {

        const group = item.closest('[data-reveal-group]');
        const siblings = group ? [...group.querySelectorAll('[data-reveal]')] : [item];
        const column = siblings.indexOf(item) % 2;

        item.style.setProperty('--reveal-delay', desktop.matches && column === 1 ? '140ms' : '0ms');

    });

    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);

            });

        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    items.forEach((item) => observer.observe(item));

}
