/*
 * Spelar upp Lottie-animationer (.json) som laddats upp där man annars
 * laddar upp bilder. Biblioteket hämtas först när en animation finns
 * på sidan, så sidor utan animationer påverkas inte.
 */
export default function initLottie() {

    const elements = document.querySelectorAll('[data-lottie]');

    if (!elements.length) return;

    const reducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('lottie-web').then(({ default: lottie }) => {

        elements.forEach((element) => {

            const cover = element.dataset.lottieFit === 'cover';

            const animation = lottie.loadAnimation({
                container: element,
                renderer: 'svg',
                loop: true,
                autoplay: !reducedMotion,
                path: element.dataset.lottie,
                rendererSettings: {
                    preserveAspectRatio: cover
                        ? 'xMidYMid slice'
                        : 'xMidYMid meet',
                },
            });

            // Animationens egna proportioner styr formen, utom när den
            // ska fylla hela ytan.
            animation.addEventListener('data_ready', () => {

                if (cover) return;

                const { w, h } = animation.animationData;

                if (w && h) {
                    element.style.aspectRatio = `${w} / ${h}`;
                }

            });

            // Pausa animationer som inte syns för att spara prestanda.
            if (!reducedMotion && 'IntersectionObserver' in window) {

                new IntersectionObserver((entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {
                            animation.play();
                        } else {
                            animation.pause();
                        }

                    });

                }).observe(element);

            }

        });

    }).catch((error) => {

        console.error(error);

    });

}
