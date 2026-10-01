export default function initBanner() {
    (() => {
        const marquee = document.querySelector("[data-marquee]");
        const track = document.querySelector("[data-marquee-track]");
        const original = document.querySelector("[data-marquee-content]");

        if (!marquee || !track || !original) return;

        let resizeTimer;

        function setupMarquee() {
            track.classList.remove("is-ready");
            track.style.removeProperty("--marquee-distance");
            track.style.removeProperty("--marquee-duration");

            track
                .querySelectorAll(".marquee-content.clone")
                .forEach((el) => {
                    el.remove();
                });

            const width = original.getBoundingClientRect().width;

            if (!width) return;

            const viewportWidth =
                marquee.getBoundingClientRect().width;

            const copiesNeeded =
                Math.ceil(viewportWidth / width) + 2;

            for (let i = 0; i < copiesNeeded; i++) {
                const clone = original.cloneNode(true);

                clone.classList.add("clone");
                clone.setAttribute("aria-hidden", "true");

                track.appendChild(clone);
            }

            track.style.setProperty(
                "--marquee-distance",
                `-${width}px`
            );

            const speed = 70;
            const duration = width / speed;

            track.style.setProperty(
                "--marquee-duration",
                `${duration}s`
            );

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    track.classList.add("is-ready");
                });
            });
        }

        setupMarquee();

        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                setupMarquee();
            }, 150);
        });

        document.fonts?.ready.then(() => {
            setupMarquee();
        });
    })();
}
