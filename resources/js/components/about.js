export default function initAbout() {
    document.addEventListener('DOMContentLoaded', () => {

        const section = document.querySelector('#about');
        const button = document.querySelector('.magnetic-button');

        if (!section || !button) return;


        /* =====================================
           INTRO — "HÄR ÄR JAG"
        ===================================== */

        let hasEntered = false;

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting && !hasEntered) {

                    hasEntered = true;

                    setTimeout(() => {
                        button.classList.add('is-intro');

                        setTimeout(() => {
                            button.classList.remove('is-intro');
                        }, 750);

                    }, 250);

                }

            });

        }, {
            threshold: 0.35
        });

        observer.observe(section);


        /* =====================================
           MAGNETIC MOVEMENT
        ===================================== */

        if (window.matchMedia('(min-width: 768px)').matches) {

            const strength = 0.28;

            button.addEventListener('mousemove', (event) => {

                const rect = button.getBoundingClientRect();

                const x = event.clientX - (rect.left + rect.width / 2);
                const y = event.clientY - (rect.top + rect.height / 2);

                button.style.transform =
                    `translate3d(${x * strength}px, ${y * strength}px, 0)`;

            });


            button.addEventListener('mouseleave', () => {

                button.style.transform =
                    'translate3d(0, 0, 0)';

            });

        }

    });
}
