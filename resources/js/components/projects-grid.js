export default function initProjectsGrid() {
    (function () {

        function initProjectAnimations() {

            const label =
                document.querySelector('.project-label');

            const title =
                document.querySelector('.project-title');

            const cards =
                document.querySelectorAll('.project-card');


            /* -------------------------------------------------
               HERO LABEL
               ------------------------------------------------- */

            if (label) {

                setTimeout(function () {

                    label.classList.add('is-visible');

                }, 100);

            }


            /* -------------------------------------------------
               HERO TITLE
               ------------------------------------------------- */

            if (title) {

                setTimeout(function () {

                    title.classList.add('is-visible');

                }, 220);

            }


            /* -------------------------------------------------
               PROJECT CARDS
               ------------------------------------------------- */

            cards.forEach(function (card, index) {

                const delay =
                    850 + (index * 130);

                setTimeout(function () {

                    card.classList.add('is-visible');

                }, delay);

            });

        }


        /* -----------------------------------------------------
           INIT
           ----------------------------------------------------- */

        if (document.readyState === 'loading') {

            document.addEventListener(
                'DOMContentLoaded',
                initProjectAnimations
            );

        } else {

            initProjectAnimations();

        }

    })();
}
