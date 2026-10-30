/*
 * Självhostade filmer.
 * - Filmer utan ljud (data-video-loop) loopar automatiskt och pausas när de
 *   är utanför bild, eller helt om besökaren valt minskad rörelse.
 * - Filmer med ljud (data-video-player) startar pausade. Knappen växlar mellan
 *   spela och pausa, och bara en film med ljud spelas åt gången.
 */
export default function initVideo() {

    const reducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-video-loop]').forEach((video) => {

        if (reducedMotion) {
            video.removeAttribute('autoplay');
            video.pause();
            return;
        }

        if (!('IntersectionObserver' in window)) return;

        new IntersectionObserver(([entry]) => {

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }

        }, { threshold: 0.1 }).observe(video);

    });

    const players = document.querySelectorAll('[data-video-player]');

    players.forEach((player) => {

        const video = player.querySelector('video');
        const button = player.querySelector('[data-video-toggle]');

        if (!video || !button) return;

        const sync = () => {

            const playing = !video.paused && !video.ended;

            player.classList.toggle('is-playing', playing);
            button.setAttribute('aria-label', playing ? 'Pausa film' : 'Spela film');

        };

        const toggle = () => {

            if (video.paused || video.ended) {

                players.forEach((other) => {
                    const otherVideo = other.querySelector('video');
                    if (other !== player && otherVideo) otherVideo.pause();
                });

                video.play().catch(() => {});

            } else {
                video.pause();
            }

        };

        button.addEventListener('click', (event) => {
            event.stopPropagation();
            toggle();
        });

        video.addEventListener('click', toggle);
        video.addEventListener('play', sync);
        video.addEventListener('pause', sync);
        video.addEventListener('ended', sync);

    });

}
