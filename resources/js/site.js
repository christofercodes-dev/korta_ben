const aboutSection = document.querySelector('.about-section');

if (aboutSection) {

    const aboutObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    aboutSection.classList.add('is-visible');

                    aboutObserver.unobserve(aboutSection);

                }

            });

        },
        {
            threshold: 0.2
        }
    );


    aboutObserver.observe(aboutSection);

}


/* ==================================================
   STATEMENT WALL REVEAL
================================================== */

const statementWall =
    document.querySelector(".statement-wall");

if (statementWall) {

    const statementObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        statementWall.classList.add(
                            "is-visible"
                        );

                        statementObserver.unobserve(
                            statementWall
                        );

                    }

                });

            },
            {
                threshold: 0.25
            }
        );


    statementObserver.observe(
        statementWall
    );

}

document.addEventListener('DOMContentLoaded', () => {

    const section = document.querySelector('#hero-scroll');
    const title = document.querySelector('#hero-title');
    const images = document.querySelector('#hero-images');
    const meta = document.querySelector('#hero-meta');
    const cards = document.querySelectorAll('.hero-card');

    if (!section || !title || !images) {
        return;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let ticking = false;

    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };

    const updateTarget = () => {

        const rect = section.getBoundingClientRect();
        const maxScroll = section.offsetHeight - window.innerHeight;

        if (maxScroll <= 0) {
            targetProgress = 0;
            return;
        }

        const scrolled = clamp(-rect.top, 0, maxScroll);

        targetProgress = scrolled / maxScroll;
    };


    const render = () => {

        currentProgress +=
            (targetProgress - currentProgress) * 0.075;


        /*
         * TITLE
         *
         * 1 → 0.38
         */

        const titleScale =
            1 - (currentProgress * 0.62);

        const titleY =
            -(currentProgress * 90);

        const titleOpacity =
            1 - (currentProgress * 1.5);

            title.style.opacity =
    clamp(titleOpacity, 0, 1);


        title.style.transform =
            `translate3d(0, ${titleY}px, 0) scale(${titleScale})`;

        title.style.opacity = titleOpacity;


        /*
         * IMAGE HEIGHT
         *
         * Start around 38vh
         * End at full viewport
         */

        const imageHeight =
            38 + (currentProgress * 62);

        images.style.height =
            `${imageHeight}vh`;


        /*
         * REMOVE OUTER MARGINS
         *
         * Images start inside the page.
         * They slowly expand to edge-to-edge.
         */

        const sideMargin =
            20 - (currentProgress * 20);

        images.style.left =
            `${sideMargin}px`;

        images.style.right =
            `${sideMargin}px`;


        /*
         * GAP
         */

        const gap =
            8 - (currentProgress * 8);

        images.style.gap =
            `${gap}px`;


        /*
         * IMAGE SCALE
         *
         * Very subtle movement while expanding.
         */

        const imageScale =
            1 + (currentProgress * 0.06);

        document
            .querySelectorAll('.hero-image img')
            .forEach(image => {
                image.style.transform =
                    `scale(${imageScale})`;
            });


        /*
         * META
         */

        const metaOpacity =
            1 - (currentProgress * 1.2);

        meta.style.opacity =
            clamp(metaOpacity, 0, 1);


        /*
         * Continue animation until smooth.
         */

        if (
            Math.abs(targetProgress - currentProgress) > 0.0005
        ) {
            requestAnimationFrame(render);
        } else {
            ticking = false;
        }

    };


    const onScroll = () => {

        updateTarget();

        if (!ticking) {
            ticking = true;
            requestAnimationFrame(render);
        }

    };


    window.addEventListener(
        'scroll',
        onScroll,
        { passive: true }
    );


    window.addEventListener(
        'resize',
        updateTarget
    );


    updateTarget();
    render();

});


const aboutElements = document.querySelectorAll(".about-animate");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-8");
                entry.target.classList.add("opacity-100", "translate-y-0");
            } else {
                entry.target.classList.remove("opacity-100", "translate-y-0");
                entry.target.classList.add("opacity-0", "translate-y-8");
            }
        });
    },
    {
        threshold: 0.15,
    }
);

aboutElements.forEach((element) => observer.observe(element));

