// The tab icon fills with ink and drains again, like the paper the site is printed on.
// Cream ink on dark tab bars, dark ink on light ones. With reduced motion, or in browsers that
// ignore a changing icon, the static favicon.svg stays as it is.
(() => {
    if (!window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const S = 64;
    const TOP = 0.115 * S;
    const BOTTOM = 0.885 * S; // where the heart mark sits inside its image
    const darkTabs = matchMedia('(prefers-color-scheme: dark)');
    const INKS = {
        dark: { base: '#4b463e', fill: '#f3eadb' },
        light: { base: '#d8cebc', fill: '#322d26' },
    };

    const img = new Image();
    img.onload = start;
    img.src = 'web-app-manifest-192x192.png?v=20261010-dark-icon';

    function start() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = S;
        const g = canvas.getContext('2d');
        const layer = document.createElement('canvas');
        layer.width = layer.height = S;
        const l = layer.getContext('2d');

        // Browsers prefer the SVG and .ico icons, so hand the tab over to one icon we keep redrawing.
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach((el) => el.remove());
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        document.head.appendChild(link);

        const tinted = (color) => {
            l.globalCompositeOperation = 'source-over';
            l.clearRect(0, 0, S, S);
            l.drawImage(img, 0, 0, S, S);
            l.globalCompositeOperation = 'source-in';
            l.fillStyle = color;
            l.fillRect(0, 0, S, S);
            return layer;
        };

        const draw = () => {
            const t = performance.now() / 1000;
            const ink = darkTabs.matches ? INKS.dark : INKS.light;
            // fill for 1.5s, hold for 0.4s, drain for 0.5s
            const cycle = t % 2.4;
            const level = cycle < 1.5 ? cycle / 1.5 : cycle < 1.9 ? 1 : 1 - (cycle - 1.9) / 0.5;
            const eased = level * level * (3 - 2 * level);
            const surface = BOTTOM - eased * (BOTTOM - TOP);

            g.clearRect(0, 0, S, S);
            g.drawImage(tinted(ink.base), 0, 0);
            g.save();
            g.beginPath();
            g.moveTo(0, S);
            for (let x = 0; x <= S; x += 4) g.lineTo(x, surface + Math.sin(x * 0.24 + t * 7) * 1.2);
            g.lineTo(S, S);
            g.closePath();
            g.clip();
            g.drawImage(tinted(ink.fill), 0, 0);
            g.restore();

            link.href = canvas.toDataURL('image/png');
        };

        draw();
        setInterval(draw, 100);
    }
})();
