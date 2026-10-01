export default function initNavbar() {
    document.addEventListener(
        'DOMContentLoaded',
        function () {

            const header =
                document.getElementById(
                    'site-header'
                );

            const button =
                document.getElementById(
                    'mobile-menu-button'
                );

            const menu =
                document.getElementById(
                    'mobile-menu'
                );

            const links =
                document.querySelectorAll(
                    '.mobile-menu-link'
                );

            if (!header || !button || !menu) {
                return;
            }


            /* =================================================
               PAGE
               ================================================= */

            const isHomePage =
                window.location.pathname === '/' ||
                window.location.pathname === '';


            let ticking = false;


            /* =================================================
               NAVBAR
               ================================================= */

            function updateNavbar() {

                if (!isHomePage) {

                    header.classList.add(
                        'is-scrolled'
                    );

                    ticking = false;

                    return;
                }


                if (
                    window.scrollY > 40 &&
                    !header.classList.contains(
                        'menu-open'
                    )
                ) {

                    header.classList.add(
                        'is-scrolled'
                    );

                } else if (
                    !header.classList.contains(
                        'menu-open'
                    )
                ) {

                    header.classList.remove(
                        'is-scrolled'
                    );
                }


                ticking = false;
            }


            window.addEventListener(
                'scroll',
                function () {

                    if (!ticking) {

                        window.requestAnimationFrame(
                            updateNavbar
                        );

                        ticking = true;
                    }

                },
                {
                    passive: true
                }
            );


            /* =================================================
               NORMAL MENU OPEN
               ================================================= */

            function openMenu() {

                menu.classList.remove(
                    'is-closing'
                );

                header.classList.add(
                    'menu-open'
                );

                menu.classList.add(
                    'is-open'
                );

                button.setAttribute(
                    'aria-expanded',
                    'true'
                );

                button.setAttribute(
                    'aria-label',
                    'Stäng meny'
                );

                document.body.classList.add(
                    'menu-is-open'
                );
            }


            /* =================================================
               NORMAL MENU CLOSE
               ================================================= */

            function closeMenu() {

                menu.classList.add(
                    'is-closing'
                );

                menu.classList.remove(
                    'is-open'
                );

                header.classList.remove(
                    'menu-open'
                );

                button.setAttribute(
                    'aria-expanded',
                    'false'
                );

                button.setAttribute(
                    'aria-label',
                    'Öppna meny'
                );


                window.setTimeout(
                    function () {

                        menu.classList.remove(
                            'is-closing'
                        );

                        document.body.classList.remove(
                            'menu-is-open'
                        );

                        updateNavbar();

                    },
                    550
                );
            }


            /* =================================================
               MENU BUTTON
               ================================================= */

            button.addEventListener(
                'click',
                function (event) {

                    event.preventDefault();


                    const isOpen =
                        button.getAttribute(
                            'aria-expanded'
                        ) === 'true';


                    if (isOpen) {

                        closeMenu();

                    } else {

                        openMenu();

                    }

                }
            );


            /* =================================================
               NAVIGATION

               IMPORTANT:
               We do NOT close the menu here.
               We do NOT add/remove menu-open.
               We simply navigate.
               ================================================= */

            links.forEach(
                function (link) {

                    link.addEventListener(
                        'click',
                        function (event) {

                            if (
                                event.metaKey ||
                                event.ctrlKey ||
                                event.shiftKey ||
                                event.altKey
                            ) {
                                return;
                            }


                            if (
                                event.button !== 0
                            ) {
                                return;
                            }


                            const href =
                                link.getAttribute(
                                    'href'
                                );


                            if (!href) {
                                return;
                            }


                            event.preventDefault();


                            /*
                             * Tell the next page that it should
                             * begin with the menu transition.
                             */

                            try {

                                sessionStorage.setItem(
                                    'menu-navigation',
                                    'true'
                                );

                            } catch (e) {}


                            /*
                             * Navigate immediately.
                             *
                             * Nothing on the current page is
                             * animated or removed.
                             */

                            window.location.href =
                                href;

                        }
                    );

                }
            );


            /* =================================================
               ARRIVAL FROM MENU
               ================================================= */

            let arrivedFromMenu = false;


            try {

                arrivedFromMenu =
                    sessionStorage.getItem(
                        'menu-navigation'
                    ) === 'true';

            } catch (e) {

                arrivedFromMenu = false;
            }


            if (arrivedFromMenu) {

                /*
                 * Remove immediately so refresh will not
                 * trigger the transition again.
                 */

                try {

                    sessionStorage.removeItem(
                        'menu-navigation'
                    );

                } catch (e) {}


                /*
                 * IMPORTANT:
                 *
                 * We do NOT add .is-open.
                 * We do NOT add .menu-open.
                 *
                 * The <head> class is already controlling
                 * the visual state.
                 */


                /*
                 * Lock scrolling while the transition
                 * is running.
                 */

                document.body.classList.add(
                    'menu-is-open'
                );


                /*
                 * Allow the new document to render once.
                 */

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            function () {

                                /*
                                 * Tell CSS:
                                 *
                                 * "The new page is ready.
                                 * Start revealing it."
                                 */

                                document.documentElement.classList.add(
                                    'menu-transition-ready'
                                );


                                /*
                                 * After the CSS transition,
                                 * completely reset everything.
                                 */

                                window.setTimeout(
                                    function () {

                                        document.documentElement.classList.remove(
                                            'menu-transition-page',
                                            'menu-transition-ready'
                                        );

                                        document.body.classList.remove(
                                            'menu-is-open'
                                        );

                                        updateNavbar();

                                    },
                                    650
                                );

                            }
                        );

                    }
                );

            } else {

                /*
                 * Normal page load.
                 */

                updateNavbar();
            }


            /* =================================================
               RESIZE
               ================================================= */

            window.addEventListener(
                'resize',
                function () {

                    if (
                        window.innerWidth >= 768
                    ) {

                        menu.classList.remove(
                            'is-open',
                            'is-closing'
                        );

                        header.classList.remove(
                            'menu-open'
                        );

                        button.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                        document.body.classList.remove(
                            'menu-is-open'
                        );

                        document.documentElement.classList.remove(
                            'menu-transition-page',
                            'menu-transition-ready'
                        );

                        updateNavbar();
                    }

                }
            );

        }
    );
}
