export default function initContactPage() {
    (function () {

        function initContactAnimations() {

            /* =========================================
               HERO
               ========================================= */

            const heroLabel =
                document.querySelector('.contact-hero-label');

            const heroTitle =
                document.querySelector('.contact-hero-title');

            const heroContent =
                document.querySelector('.contact-hero-content');


            if (heroLabel) {

                setTimeout(function () {
                    heroLabel.classList.add('is-visible');
                }, 100);

            }


            if (heroTitle) {

                setTimeout(function () {
                    heroTitle.classList.add('is-visible');
                }, 220);

            }


            if (heroContent) {

                setTimeout(function () {
                    heroContent.classList.add('is-visible');
                }, 650);

            }


            /* =========================================
               SCROLL SECTIONS
               ========================================= */

            const sections =
                document.querySelectorAll('.contact-section');

            if (!sections.length) return;


            const observer =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) return;

                            const section =
                                entry.target;


                            /* LABEL */

                            const label =
                                section.querySelector(
                                    '.contact-section-label'
                                );

                            if (label) {

                                setTimeout(function () {

                                    label.classList.add(
                                        'is-visible'
                                    );

                                }, 100);

                            }


                            /* TITLE */

                            const title =
                                section.querySelector(
                                    '.contact-section-title'
                                );

                            if (title) {

                                setTimeout(function () {

                                    title.classList.add(
                                        'is-visible'
                                    );

                                }, 220);

                            }


                            /* FORM FIELDS */

                            const fields =
                                section.querySelectorAll(
                                    '.contact-form-field'
                                );

                            fields.forEach(
                                function (field, index) {

                                    setTimeout(function () {

                                        field.classList.add(
                                            'is-visible'
                                        );

                                    }, 450 + (index * 100));

                                }
                            );


                            /* FORM SUBMIT */

                            const submit =
                                section.querySelector(
                                    '.contact-form-submit'
                                );

                            if (submit) {

                                setTimeout(function () {

                                    submit.classList.add(
                                        'is-visible'
                                    );

                                }, 950);

                            }


                            /* DIRECT CONTACT */

                            const directItems =
                                section.querySelectorAll(
                                    '.contact-direct-item'
                                );

                            directItems.forEach(
                                function (item, index) {

                                    setTimeout(function () {

                                        item.classList.add(
                                            'is-visible'
                                        );

                                    }, 350 + (index * 120));

                                }
                            );


                            /* ADDRESS */

                            const address =
                                section.querySelector(
                                    '.contact-address'
                                );

                            if (address) {

                                setTimeout(function () {

                                    address.classList.add(
                                        'is-visible'
                                    );

                                }, 650);

                            }


                            /* ONLY ONCE */

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


        /* =========================================
           INIT
           ========================================= */

        if (document.readyState === 'loading') {

            document.addEventListener(
                'DOMContentLoaded',
                initContactAnimations
            );

        } else {

            initContactAnimations();

        }

    })();
}
