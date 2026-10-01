export default function initProjects() {
    document.addEventListener('DOMContentLoaded', () => {

        const button = document.querySelector('.project-button');

        if (!button) return;

        const fill = button.querySelector('.project-button-fill');
        const text = button.querySelector('.project-button-text');
        const arrow = button.querySelector('.project-button-arrow');

        const colors = [
            '#181818',

        ];

        let colorIndex = 0;

        button.addEventListener('mouseenter', () => {

            const color = colors[colorIndex];

            fill.style.backgroundColor = color;

            text.style.color = '#ffffff';
            arrow.style.color = '#ffffff';
            arrow.style.borderColor = '#ffffff';

            colorIndex = (colorIndex + 1) % colors.length;

        });

        button.addEventListener('mouseleave', () => {

            text.style.color = '';
            arrow.style.color = '';
            arrow.style.borderColor = '';

        });

    });
}
