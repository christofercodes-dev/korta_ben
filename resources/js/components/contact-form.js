/*
 * Kontaktformuläret skickas med fetch (webhook via ContactController).
 * Utan JavaScript skickas det som ett vanligt formulär och landar på /kontakt?skickat=1.
 */
export default function initContactForm() {

    const form = document.querySelector('[data-contact-form]');

    if (!form) return;

    const status = form.querySelector('[data-contact-status]');
    const button = form.querySelector('button[type="submit"]');

    const say = (text) => {
        if (status) status.textContent = text;
    };

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        button.disabled = true;
        say('Skickar…');

        try {

            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form),
            });

            if (response.ok) {

                const done = document.createElement('p');

                done.className = 'mt-16 max-w-[520px] text-[17px] leading-[1.6] text-white/70 md:mt-24';
                done.setAttribute('role', 'status');
                done.textContent = 'Tack! Jag har fått ditt meddelande och återkommer så fort jag kan.';

                form.replaceWith(done);

                return;

            }

            const data = await response.json().catch(() => ({}));
            const first = data.errors ? Object.values(data.errors)[0][0] : data.message;

            say(first || 'Det gick inte att skicka just nu. Mejla mig gärna direkt i stället.');

        } catch (error) {

            say('Det gick inte att skicka just nu. Mejla mig gärna direkt i stället.');

        }

        button.disabled = false;

    });

}
