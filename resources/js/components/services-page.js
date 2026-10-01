export default function initServicesPage() {
    (function () {

        function initServicesAnimations() {


            /* =================================================
               HERO
               ================================================= */

            const heroLabel =
                document.querySelector('.services-hero-label');

            const heroTitle =
                document.querySelector('.services-hero-title');

            const heroContent =
                document.querySelector('.services-hero-content');


            /*
             * LABEL
             */

            if (heroLabel) {

                setTimeout(function () {

                    heroLabel.classList.add('is-visible');

                }, 100);

            }


            /*
             * TITLE
             */

            if (heroTitle) {

                setTimeout(function () {

                    heroTitle.classList.add('is-visible');

                }, 220);

            }


            /*
             * INTRO
             */

            if (heroContent) {

                setTimeout(function () {

                    heroContent.classList.add('is-visible');

                }, 650);

            }


            /* =================================================
               SCROLL SECTIONS
               ================================================= */

            const sections =
                document.querySelectorAll('.services-section');


            if (!sections.length) return;


            const observer =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) return;


                            const section =
                                entry.target;


                            /* ---------------------------------
                               LABEL
                            --------------------------------- */

                            const label =
                                section.querySelector(
                                    '.services-section-label'
                                );


                            if (label) {

                                setTimeout(function () {

                                    label.classList.add(
                                        'is-visible'
                                    );

                                }, 50);

                            }


                            /* ---------------------------------
                               TITLE
                            --------------------------------- */

                            const title =
                                section.querySelector(
                                    '.services-section-title'
                                );


                            if (title) {

                                setTimeout(function () {

                                    title.classList.add(
                                        'is-visible'
                                    );

                                }, 150);

                            }


                            /* ---------------------------------
                               CONTENT
                            --------------------------------- */

                            const content =
                                section.querySelector(
                                    '.services-section-content'
                                );


                            if (content) {

                                setTimeout(function () {

                                    content.classList.add(
                                        'is-visible'
                                    );

                                }, 400);

                            }


                            /* ---------------------------------
                               SERVICES
                            --------------------------------- */

                            const serviceItems =
                                section.querySelectorAll(
                                    '.service-item'
                                );


                            serviceItems.forEach(
                                function (item, index) {

                                    setTimeout(function () {

                                        item.classList.add(
                                            'is-visible'
                                        );

                                    }, 300 + (index * 110));

                                }
                            );


                            /* ---------------------------------
                               CTA LINK
                            --------------------------------- */

                            const ctaLink =
                                section.querySelector(
                                    '.services-cta-link'
                                );


                            if (ctaLink) {

                                setTimeout(function () {

                                    ctaLink.classList.add(
                                        'is-visible'
                                    );

                                }, 500);

                            }


                            /* ---------------------------------
                               ONLY ONCE
                            --------------------------------- */

                            observer.unobserve(section);

                        });

                    },

                    {
                        threshold: 0.12,
                        rootMargin: '0px 0px -10% 0px'
                    }

                );


            sections.forEach(function (section) {

                observer.observe(section);

            });

        }


        /* =====================================================
           INIT
           ===================================================== */

        if (document.readyState === 'loading') {

            document.addEventListener(
                'DOMContentLoaded',
                initServicesAnimations
            );

        } else {

            initServicesAnimations();

        }

    })();
}
