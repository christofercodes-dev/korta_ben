export default function initAboutPage() {
    (function () {

        function initAboutAnimations() {

            /* =================================================
               HERO
               ================================================= */

            const label = document.querySelector('.about-label');
            const title = document.querySelector('.about-title');
            const content = document.querySelector('.about-content');


            /*
             * LABEL
             */

            if (label) {

                setTimeout(function () {

                    label.classList.add('is-visible');

                }, 100);

            }


            /*
             * TITLE
             */

            if (title) {

                setTimeout(function () {

                    title.classList.add('is-visible');

                }, 220);

            }


            /*
             * CONTENT
             */

            if (content) {

                setTimeout(function () {

                    content.classList.add('is-visible');

                }, 650);

            }


            /* =================================================
               SCROLL ANIMATIONS
               ================================================= */

            const sections =
                document.querySelectorAll('.about-section');

            if (!sections.length) return;


            const observer =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) return;


                            const section =
                                entry.target;


                            /*
                             * LABEL
                             */

                            const sectionLabel =
                                section.querySelector(
                                    '.about-section-label'
                                );


                            if (sectionLabel) {

                                setTimeout(function () {

                                    sectionLabel.classList.add(
                                        'is-visible'
                                    );

                                }, 50);

                            }


                            /*
                             * TITLE
                             */

                            const sectionTitle =
                                section.querySelector(
                                    '.about-section-title'
                                );


                            if (sectionTitle) {

                                setTimeout(function () {

                                    sectionTitle.classList.add(
                                        'is-visible'
                                    );

                                }, 150);

                            }


                            /*
                             * CONTENT
                             */

                            const sectionContent =
                                section.querySelector(
                                    '.about-section-content'
                                );


                            if (sectionContent) {

                                setTimeout(function () {

                                    sectionContent.classList.add(
                                        'is-visible'
                                    );

                                }, 400);

                            }


                            /*
                             * TEAM
                             */

                            const teamMembers =
                                section.querySelectorAll(
                                    '.about-team-member'
                                );


                            teamMembers.forEach(
                                function (member, index) {

                                    setTimeout(function () {

                                        member.classList.add(
                                            'is-visible'
                                        );

                                    }, 250 + (index * 100));

                                }
                            );


                            /*
                             * CLOSING LINK
                             */

                            const closingLink =
                                section.querySelector(
                                    '.about-closing-link'
                                );


                            if (closingLink) {

                                setTimeout(function () {

                                    closingLink.classList.add(
                                        'is-visible'
                                    );

                                }, 500);

                            }


                            /*
                             * Kör endast en gång
                             */

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
                initAboutAnimations
            );

        } else {

            initAboutAnimations();

        }

    })();
}
