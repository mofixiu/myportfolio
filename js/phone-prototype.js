// Interactive phone prototypes built from static app screenshots.
// Screen maps live in js/app-prototypes.js. Each `.phone-prototype` element becomes a
// clickable device; `.phone-prototype--mini` elements become auto-cycling card previews.
(function () {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const debugHotspots = new URLSearchParams(window.location.search).has('hotspots');
    const REVERSE = { push: 'pop', sheet: 'dismiss', scroll: 'scrollup', scrollup: 'scroll' };

    // Motion mirrors the apps' own Flutter transitions: aLaStudie's premium fade for
    // screen changes, a 280ms crossfade for tabs and the standard bottom-sheet slide.
    const EASE_OUT_CUBIC = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
    const EASE_IN_OUT_CUBIC = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    const DECELERATE = 'cubic-bezier(0, 0, 0.2, 1)';
    const RISE = 'translateY(1.8%) scale(0.985)';
    const SETTLED = { opacity: 1, transform: 'none' };

    const STATUS_ICONS = [
        '<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>',
        '<svg viewBox="0 0 16 12"><path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.8 10.8 0 0 0 8 .5 10.8 10.8 0 0 0 .5 3.4l1.2 1.3A9 9 0 0 1 8 2.2Zm0 3.4c1.5 0 2.9.6 4 1.6l1.2-1.3A7.4 7.4 0 0 0 8 3.9a7.4 7.4 0 0 0-5.2 2l1.2 1.3c1.1-1 2.5-1.6 4-1.6Zm0 3.4c.6 0 1.2.2 1.6.6L8 11.5 6.4 9.6c.4-.4 1-.6 1.6-.6Z"/></svg>',
        '<svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="19" height="8" rx="2"/><path d="M24 4v4c.8-.3 1.4-1.1 1.4-2S24.8 4.3 24 4Z" opacity=".45"/></svg>'
    ].join('');

    function make(tag, className, attrs = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
        return element;
    }

    function screenSrc(app, id, small) {
        return `${app.base}${small ? 'sm/' : ''}${id}.webp`;
    }

    function pause(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Card previews sit inside <button>/<a> elements, so they are built from spans.
    function buildDevice(app, inline) {
        const box = inline ? 'span' : 'div';
        const device = make(box, 'pp-device');
        const screen = make(box, 'pp-screen');
        const stage = make(box, 'pp-stage');
        screen.append(stage);

        if (app.statusBar) {
            const bar = make(box, `pp-statusbar pp-statusbar--${app.statusBar}`, { 'aria-hidden': 'true' });
            bar.innerHTML = `<span>9:41</span><span class="pp-status-icons">${STATUS_ICONS}</span>`;
            screen.append(bar);
        }
        if (app.island) {
            screen.append(make(box, 'pp-island', { 'aria-hidden': 'true' }));
        }

        device.append(screen);
        return { device, screen, stage };
    }

    class PhonePrototype {
        constructor(root, app) {
            this.root = root;
            this.app = app;
            this.persona = app.personas ? app.personas[0].id : null;
            this.history = [];
            this.current = null;
            this.busy = false;
            this.demo = null;
            this.loaded = false;
            this.build();
        }

        build() {
            const { root, app } = this;
            root.textContent = '';
            root.classList.add('is-ready');
            root.classList.toggle('pp-debug', debugHotspots);

            if (app.personas) {
                this.personaBar = make('div', 'pp-personas', { role: 'group', 'aria-label': app.personaLabel || 'View the app as' });
                app.personas.forEach((persona) => {
                    const button = make('button', 'pp-persona', { type: 'button', 'aria-pressed': 'false' });
                    button.dataset.persona = persona.id;
                    button.textContent = persona.label;
                    button.addEventListener('click', () => this.switchPersona(persona.id));
                    this.personaBar.append(button);
                });
                root.append(this.personaBar);
            }

            const { device, screen, stage } = buildDevice(app);
            this.screen = screen;
            this.stage = stage;
            screen.setAttribute('role', 'group');
            screen.setAttribute('aria-label', app.screenLabel || `${app.name} interactive prototype`);
            this.cursor = make('div', 'pp-cursor', { 'aria-hidden': 'true' });
            screen.append(this.cursor);

            this.caption = make('p', 'pp-caption', { 'aria-live': 'polite' });
            this.chips = make('div', 'pp-chips', { role: 'group', 'aria-label': `${app.name} screens` });

            const actions = make('div', 'pp-actions');
            const hint = make('span', 'pp-hint');
            hint.innerHTML = '<i class="fas fa-hand-pointer" aria-hidden="true"></i> Tap the screen to explore';
            actions.append(hint);
            if (app.demo) {
                const replay = make('button', 'pp-replay', { type: 'button' });
                replay.innerHTML = '<i class="fas fa-rotate-right" aria-hidden="true"></i> Replay demo';
                replay.addEventListener('click', () => this.playDemo());
                actions.append(replay);
            }

            root.append(device, this.caption, this.chips, actions);

            // Any real input hands control back to the visitor.
            root.addEventListener('pointerdown', (event) => {
                if (!event.target.closest('.pp-replay')) this.stopDemo();
            });
            root.addEventListener('keydown', (event) => {
                this.stopDemo();
                this.onKey(event);
            });
            screen.addEventListener('click', (event) => {
                if (!this.swiped && !event.target.closest('.pp-hotspot')) this.revealHotspots();
            });
            this.bindEdgeSwipe();
        }

        open() {
            if (!this.loaded) {
                this.loaded = true;
                Object.keys(this.app.screens).forEach((id) => {
                    const image = new Image();
                    image.decoding = 'async';
                    image.src = screenSrc(this.app, id);
                });
            }
            this.stopDemo();
            this.reset();
        }

        reset() {
            this.stage.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
            this.busy = false;
            this.current = null;
            this.cursorPos = null;
            if (this.app.personas) {
                this.setPersona(this.app.personas[0].id);
            } else if (!this.chips.childElementCount) {
                this.renderChips();
            }
            this.history = [{ id: this.app.start, t: 'fade' }];
            this.transition(this.app.start, 'fade');
        }

        chipIds() {
            const persona = this.app.personas && this.app.personas.find((item) => item.id === this.persona);
            return (persona && persona.chips) || this.app.chips || Object.keys(this.app.screens);
        }

        renderChips() {
            this.chips.replaceChildren(...this.chipIds().map((id) => {
                const chip = make('button', 'pp-chip', { type: 'button', 'aria-pressed': 'false' });
                chip.dataset.screen = id;
                chip.textContent = this.app.screens[id].label;
                chip.addEventListener('click', () => this.navigate(id, 'tab'));
                return chip;
            }));
        }

        renderChrome() {
            const id = this.current.id;
            const ids = this.chipIds();
            const index = ids.indexOf(id);
            const label = make('strong');
            label.textContent = this.app.screens[id].label;
            this.caption.replaceChildren(label);
            if (index >= 0) this.caption.append(` · ${index + 1} of ${ids.length}`);
            this.chips.querySelectorAll('.pp-chip').forEach((chip) => {
                chip.setAttribute('aria-pressed', String(chip.dataset.screen === id));
            });
        }

        setPersona(id) {
            this.persona = id;
            this.personaBar.querySelectorAll('.pp-persona').forEach((button) => {
                button.setAttribute('aria-pressed', String(button.dataset.persona === id));
            });
            this.renderChips();
        }

        switchPersona(id) {
            if (this.busy || id === this.persona) return Promise.resolve();
            this.setPersona(id);
            return this.navigate(this.app.personas.find((item) => item.id === id).start, 'fade');
        }

        resolve(target) {
            return target && typeof target === 'object' ? target[this.persona] : target;
        }

        activate(hotspot) {
            if (hotspot.to === 'back') return this.back();
            return this.navigate(this.resolve(hotspot.to), hotspot.t || 'push');
        }

        navigate(id, type = 'push') {
            if (this.busy || !this.app.screens[id] || (this.current && id === this.current.id)) {
                return Promise.resolve();
            }
            const previous = this.history[this.history.length - 2];
            if (previous && previous.id === id && type !== 'tab' && type !== 'fade') return this.back();

            if (type === 'tab' || type === 'fade') {
                this.history = [{ id, t: type }];
            } else {
                this.history.push({ id, t: type });
            }
            return this.transition(id, type);
        }

        back() {
            if (this.busy || !this.current) return Promise.resolve();
            const leaving = this.history.pop();
            const fromScreen = this.app.screens[this.current.id];
            let target = this.history[this.history.length - 1];

            if (!target) {
                const persona = this.app.personas && this.app.personas.find((item) => item.id === this.persona);
                const fallback = this.resolve(fromScreen.back) || (persona ? persona.start : this.app.start);
                if (fallback === this.current.id) {
                    this.history = [leaving];
                    return Promise.resolve();
                }
                target = { id: fallback, t: 'fade' };
                this.history = [target];
            }

            const enteredBy = leaving && REVERSE[leaving.t] ? leaving.t : null;
            const type = enteredBy ? REVERSE[enteredBy] : (fromScreen.sheetTop != null ? 'dismiss' : 'pop');
            return this.transition(target.id, type);
        }

        makeLayer(id) {
            const screen = this.app.screens[id];
            const layer = make('div', 'pp-layer');
            layer.append(make('img', 'pp-shot', {
                src: screenSrc(this.app, id),
                alt: `${this.app.name}: ${screen.label}`,
                draggable: 'false',
                decoding: 'async'
            }));

            (screen.hotspots || []).forEach((hotspot) => {
                const button = make('button', 'pp-hotspot', { type: 'button', 'aria-label': hotspot.label });
                button.dataset.hotspot = hotspot.id;
                Object.assign(button.style, {
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    width: `${hotspot.w}%`,
                    height: `${hotspot.h}%`
                });
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.stopDemo();
                    this.activate(hotspot);
                });
                layer.append(button);
            });
            return layer;
        }

        async transition(id, type) {
            const from = this.current && this.current.layer;
            const fromScreen = this.current && this.app.screens[this.current.id];
            // Keep the persona switch in step with the screen, whichever way it was reached.
            const persona = this.app.screens[id].persona;
            if (persona && this.app.personas && persona !== this.persona) this.setPersona(persona);
            const to = this.makeLayer(id);
            this.current = { id, layer: to };
            this.renderChrome();

            if (!from || reducedMotion.matches) {
                this.stage.replaceChildren(to);
                return;
            }

            this.busy = true;
            from.inert = true;
            const animations = this.animate(from, to, type, fromScreen, this.app.screens[id]);
            await Promise.all(animations.map((animation) => animation.finished)).catch(() => {});
            from.remove();
            to.querySelectorAll('.pp-sheet-backdrop').forEach((node) => node.remove());
            to.querySelector('.pp-shot').style.clipPath = '';
            to.classList.remove('is-entering');
            this.busy = false;
        }

        // Splits a bottom-sheet screenshot into a fading scrim and a sliding sheet.
        splitSheet(layer, top) {
            const shot = layer.querySelector('.pp-shot');
            const backdrop = shot.cloneNode();
            backdrop.classList.add('pp-sheet-backdrop');
            backdrop.alt = '';
            backdrop.style.clipPath = `inset(0 0 ${100 - top}% 0)`;
            shot.style.clipPath = `inset(${top}% 0 0 0)`;
            layer.prepend(backdrop);
            return { shot, backdrop };
        }

        animate(from, to, type, fromScreen, toScreen) {
            const timing = (duration, easing) => ({ duration, easing });
            const stage = this.stage;
            to.classList.add('is-entering');

            switch (type) {
            case 'push':
                // The new screen fades up into place while the one beneath dims slightly.
                stage.append(to);
                return [
                    to.animate([{ opacity: 0, transform: RISE }, SETTLED], timing(300, EASE_OUT_CUBIC)),
                    from.animate([{ opacity: 1 }, { opacity: 0.94 }], timing(300, EASE_IN_OUT_CUBIC))
                ];
            case 'pop':
                stage.prepend(to);
                return [
                    from.animate([SETTLED, { opacity: 0, transform: RISE }], timing(300, EASE_IN_OUT_CUBIC)),
                    to.animate([{ opacity: 0.94 }, { opacity: 1 }], timing(300, EASE_IN_OUT_CUBIC))
                ];
            case 'sheet': {
                const top = toScreen.sheetTop || 0;
                stage.append(to);
                const { shot, backdrop } = this.splitSheet(to, top);
                return [
                    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], timing(440, 'ease')),
                    shot.animate([{ transform: `translateY(${100 - top}%)` }, { transform: 'none' }], timing(440, DECELERATE))
                ];
            }
            case 'dismiss': {
                const top = (fromScreen && fromScreen.sheetTop) || 0;
                stage.prepend(to);
                const { shot, backdrop } = this.splitSheet(from, top);
                return [
                    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], timing(280, 'ease')),
                    shot.animate([{ transform: 'none' }, { transform: `translateY(${100 - top}%)` }], timing(280, 'cubic-bezier(0.4, 0, 1, 1)'))
                ];
            }
            case 'scroll':
            case 'scrollup': {
                const shift = type === 'scroll' ? 3 : -3;
                stage.append(to);
                return [to.animate([{ opacity: 0, transform: `translateY(${shift}%)` }, SETTLED], timing(340, EASE_OUT_CUBIC))];
            }
            case 'fade':
                stage.append(to);
                return [to.animate([{ opacity: 0, transform: 'scale(0.985)' }, SETTLED], timing(420, EASE_OUT_CUBIC))];
            default: // tab
                stage.append(to);
                return [to.animate([{ opacity: 0 }, { opacity: 1 }], timing(280, EASE_OUT_CUBIC))];
            }
        }

        revealHotspots() {
            this.screen.classList.remove('pp-reveal');
            void this.screen.offsetWidth;
            this.screen.classList.add('pp-reveal');
            clearTimeout(this.revealTimer);
            this.revealTimer = setTimeout(() => this.screen.classList.remove('pp-reveal'), 1100);
        }

        bindEdgeSwipe() {
            let start = null;
            this.screen.addEventListener('pointerdown', (event) => {
                const rect = this.screen.getBoundingClientRect();
                this.swiped = false;
                start = event.clientX - rect.left < rect.width * 0.14
                    ? { x: event.clientX, y: event.clientY, width: rect.width }
                    : null;
            });
            this.screen.addEventListener('pointerup', (event) => {
                if (start && event.clientX - start.x > start.width * 0.25 && Math.abs(event.clientY - start.y) < start.width * 0.4) {
                    this.swiped = true;
                    this.back();
                }
                start = null;
            });
            this.screen.addEventListener('pointercancel', () => {
                start = null;
            });
        }

        onKey(event) {
            if ((event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') || event.target.closest('.pp-personas')) return;
            const ids = this.chipIds();
            const step = event.key === 'ArrowRight' ? 1 : -1;
            const next = ids[(ids.indexOf(this.current.id) + step + ids.length) % ids.length];
            event.preventDefault();
            this.navigate(next, 'tab');
            if (event.target.closest('.pp-chip')) {
                this.chips.querySelector(`[data-screen="${next}"]`).focus();
            }
        }

        // Demo mode: a fake fingertip walks through the scripted taps, then loops.
        cursorTo(x, y, duration) {
            const cursor = this.cursor;
            const from = this.cursorPos || { x: 50, y: 105 };
            this.cursorPos = { x, y };
            cursor.classList.add('is-visible');
            cursor.style.left = `${x}%`;
            cursor.style.top = `${y}%`;
            return cursor.animate(
                [{ left: `${from.x}%`, top: `${from.y}%` }, { left: `${x}%`, top: `${y}%` }],
                { duration: reducedMotion.matches ? 0 : duration, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' }
            ).finished.catch(() => {});
        }

        async press() {
            this.cursor.classList.add('is-pressing');
            await pause(170);
            this.cursor.classList.remove('is-pressing');
        }

        async playDemo() {
            if (!this.app.demo) return;
            this.stopDemo();
            const token = {};
            const alive = () => this.demo === token;
            this.demo = token;
            this.root.classList.add('is-demo');
            this.reset();
            await pause(1100);

            for (const step of this.app.demo) {
                if (!alive()) return;
                if (typeof step === 'object' && step.persona) {
                    const button = this.personaBar.querySelector(`[data-persona="${step.persona}"]`);
                    button.classList.add('is-demo-press');
                    await pause(500);
                    button.classList.remove('is-demo-press');
                    if (!alive()) return;
                    await this.switchPersona(step.persona);
                } else {
                    const hotspots = this.app.screens[this.current.id].hotspots || [];
                    const hotspot = hotspots.find((item) => item.id === step);
                    if (hotspot) {
                        await this.cursorTo(hotspot.x + hotspot.w / 2, hotspot.y + hotspot.h / 2, 650);
                        if (!alive()) return;
                        await this.press();
                        if (!alive()) return;
                        await this.activate(hotspot);
                    } else if (step === 'back') {
                        await this.cursorTo(4, 55, 600);
                        if (!alive()) return;
                        this.cursor.classList.add('is-holding');
                        await Promise.all([this.cursorTo(72, 55, 420), this.back()]);
                        this.cursor.classList.remove('is-holding');
                    }
                }
                await pause(1500);
            }

            if (!alive()) return;
            this.cursor.classList.remove('is-visible');
            await pause(1800);
            if (alive()) this.playDemo();
        }

        stopDemo() {
            if (!this.demo) return;
            this.demo = null;
            this.root.classList.remove('is-demo');
            this.cursor.classList.remove('is-visible', 'is-pressing', 'is-holding');
            this.cursorPos = null;
        }
    }

    class PhonePreview {
        constructor(root, app) {
            this.root = root;
            this.app = app;
            this.index = 0;
            this.timer = null;
            this.visible = false;

            root.textContent = '';
            root.classList.add('is-ready');
            const { device, stage } = buildDevice(app, true);
            this.stage = stage;
            root.append(device);
            this.layer = this.makeLayer(app.preview[0], true);
            stage.append(this.layer);

            if (app.preview.length > 1) {
                new IntersectionObserver((entries) => {
                    this.visible = entries[entries.length - 1].isIntersecting;
                    this.update();
                }, { threshold: 0.35 }).observe(root);
                document.addEventListener('visibilitychange', () => this.update());
                reducedMotion.addEventListener('change', () => this.update());
            }
        }

        makeLayer(id, lazy) {
            const layer = make('span', 'pp-layer');
            // `loading` has to be set before `src` for the browser to defer the request.
            const attrs = lazy ? { loading: 'lazy' } : {};
            layer.append(make('img', 'pp-shot', { ...attrs, src: screenSrc(this.app, id, true), alt: '', draggable: 'false', decoding: 'async' }));
            return layer;
        }

        update() {
            const run = this.visible && !document.hidden && !reducedMotion.matches;
            if (run && !this.timer) {
                if (!this.preloaded) {
                    this.preloaded = true;
                    this.app.preview.slice(1).forEach((id) => {
                        new Image().src = screenSrc(this.app, id, true);
                    });
                }
                this.timer = setInterval(() => this.advance(), 2600);
            } else if (!run && this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }

        advance() {
            this.index = (this.index + 1) % this.app.preview.length;
            const previous = this.layer;
            this.layer = this.makeLayer(this.app.preview[this.index]);
            this.stage.append(this.layer);
            this.layer.animate(
                [{ opacity: 0, transform: RISE }, SETTLED],
                { duration: 420, easing: EASE_OUT_CUBIC }
            ).finished.then(() => previous.remove(), () => previous.remove());
        }
    }

    function initializePhonePrototypes() {
        const apps = window.APP_PROTOTYPES || {};

        document.querySelectorAll('.phone-prototype').forEach((root) => {
            const app = apps[root.dataset.app];
            if (!app) return;

            if (root.classList.contains('phone-prototype--mini')) {
                new PhonePreview(root, app);
                return;
            }

            const prototype = new PhonePrototype(root, app);
            const modal = root.closest('.modal');
            if (!modal) {
                prototype.open();
                return;
            }
            // Screens load only when their project is opened.
            modal.addEventListener('show.bs.modal', () => prototype.open());
            modal.addEventListener('shown.bs.modal', () => {
                if (!reducedMotion.matches) prototype.playDemo();
            });
            modal.addEventListener('hidden.bs.modal', () => prototype.stopDemo());
        });
    }

    document.addEventListener('DOMContentLoaded', initializePhonePrototypes);
})();
