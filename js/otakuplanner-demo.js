// The OtakuPlanner prototype for /otakuplanner/: the whole app in Normal mode and in Anime
// mode (Luffy), switched with the bar above the phone. Same format as js/app-prototypes.js;
// paths are absolute because the page lives in a folder.
(function () {
    'use strict';

    function tabBar(y, h, tabs) {
        const width = 100 / tabs.length;
        return tabs.map((tab, i) => ({ id: tab[0], label: tab[1], to: tab[2], t: 'tab', x: i * width, y, w: width, h }));
    }

    const back = (x, y, w = 11, h = 6.5) => ({ id: 'back', label: 'Back', to: 'back', x, y, w, h });

    const normalTabs = () => tabBar(90, 7.5, [
        ['tab-today', 'Today', 'normal-today'],
        ['tab-calendar', 'Calendar', '6'],
        ['tab-tasks', 'Tasks', '4'],
        ['tab-badges', 'Badges', '5'],
        ['tab-settings', 'Settings', 'normal-settings']
    ]);

    const animeTabs = () => tabBar(90, 7.5, [
        ['tab-today', 'Today', 'anime-today'],
        ['tab-calendar', 'Calendar', 'anime-calendar'],
        ['tab-tasks', 'Tasks', 'anime-tasks'],
        ['tab-badges', 'Badges', 'anime-badges'],
        ['tab-settings', 'Settings', 'anime-settings']
    ]);

    const ask = (to) => ({ id: 'ask', label: 'Ask the assistant', to, x: 18, y: 9.5, w: 14, h: 5 });

    window.APP_PROTOTYPES = {
        otakuplanner: {
            name: 'OtakuPlanner',
            base: '/screenshots/device/otakuplanner/',
            island: true,
            start: 'normal-today',
            personaLabel: 'Mode',
            personas: [
                {
                    id: 'normal',
                    label: 'Normal',
                    start: 'normal-today',
                    chips: ['normal-today', '6', '4', '2', '5', '8', 'normal-settings']
                },
                {
                    id: 'anime',
                    label: 'Anime mode',
                    start: 'anime-today',
                    chips: [
                        'anime-today', 'anime-celebrate', 'anime-calendar', 'anime-empty', 'anime-tasks',
                        'anime-badges', 'anime-ask', 'anime-reply', 'anime-settings', 'anime-picker', 'anime-colours'
                    ]
                }
            ],
            screens: {
                // Normal mode ---------------------------------------------------------------
                'normal-today': {
                    label: 'Today', persona: 'normal',
                    hotspots: [
                        ask('8'),
                        { id: 'badges', label: 'Badges', to: '5', t: 'tab', x: 69.5, y: 23.5, w: 25.5, h: 14 },
                        ...normalTabs()
                    ]
                },
                6: { label: 'Calendar', persona: 'normal', hotspots: [ask('8'), ...normalTabs()] },
                4: {
                    label: 'Tasks', persona: 'normal',
                    hotspots: [
                        ask('8'),
                        { id: 'automate', label: 'Automate a task', to: '2', x: 68.5, y: 16.5, w: 31, h: 5.5 },
                        ...normalTabs()
                    ]
                },
                2: {
                    label: 'Automate a task', persona: 'normal', back: '4',
                    hotspots: [
                        back(1, 8.5, 11, 7),
                        { id: 'add', label: 'Add the repeats to my calendar', to: '6', t: 'tab', x: 4, y: 65.5, w: 92, h: 6 }
                    ]
                },
                5: { label: 'Badges', persona: 'normal', hotspots: [ask('8'), ...normalTabs()] },
                8: { label: 'Ask', persona: 'normal', back: 'normal-today', hotspots: [back(1, 8.5)] },
                'normal-settings': {
                    label: 'Settings', persona: 'normal',
                    hotspots: [
                        ask('8'),
                        { id: 'anime', label: 'Switch to Anime mode', to: 'anime-settings', t: 'fade', x: 52, y: 44, w: 41, h: 4.4 },
                        ...normalTabs()
                    ]
                },

                // Anime mode (Luffy) -------------------------------------------------------------
                'anime-today': {
                    label: 'Today, in Luffy’s colours', persona: 'anime',
                    hotspots: [
                        ask('anime-ask'),
                        { id: 'badges', label: 'Badges', to: 'anime-badges', t: 'tab', x: 69.5, y: 23.5, w: 25.5, h: 14 },
                        { id: 'tick', label: 'Finish Read chapter 4', to: 'anime-celebrate', t: 'tab', x: 4, y: 68.5, w: 12, h: 6.5 },
                        ...animeTabs()
                    ]
                },
                'anime-celebrate': {
                    label: 'A streak, from Luffy', persona: 'anime',
                    hotspots: [
                        ask('anime-ask'),
                        { id: 'toast', label: 'Close the message', to: 'anime-today', t: 'tab', x: 3, y: 74.5, w: 94, h: 13.5 },
                        ...animeTabs()
                    ]
                },
                'anime-calendar': {
                    label: 'Calendar', persona: 'anime',
                    hotspots: [
                        ask('anime-ask'),
                        { id: 'day', label: 'Open Friday 20 November', to: 'anime-empty', t: 'tab', x: 70, y: 41.3, w: 9.4, h: 4.6 },
                        ...animeTabs()
                    ]
                },
                'anime-empty': {
                    label: 'An empty day', persona: 'anime',
                    hotspots: [
                        ask('anime-ask'),
                        { id: 'today', label: 'Back to today', to: 'anime-calendar', t: 'tab', x: 70, y: 36, w: 9.4, h: 4.6 },
                        ...animeTabs()
                    ]
                },
                'anime-tasks': { label: 'Tasks', persona: 'anime', hotspots: [ask('anime-ask'), ...animeTabs()] },
                'anime-badges': { label: 'Badges', persona: 'anime', hotspots: [ask('anime-ask'), ...animeTabs()] },
                'anime-ask': {
                    label: 'Ask Luffy', persona: 'anime', back: 'anime-today',
                    hotspots: [
                        back(1, 8.5),
                        { id: 'prompt', label: 'Fit two episodes in this week', to: 'anime-reply', x: 4, y: 43, w: 92, h: 5.5 }
                    ]
                },
                'anime-reply': { label: 'Luffy’s reply', persona: 'anime', back: 'anime-ask', hotspots: [back(1, 8.5)] },
                'anime-settings': {
                    label: 'Settings', persona: 'anime',
                    hotspots: [
                        ask('anime-ask'),
                        { id: 'normal', label: 'Switch to Normal', to: 'normal-settings', t: 'fade', x: 7, y: 44, w: 45, h: 4.4 },
                        { id: 'change', label: 'Change character', to: 'anime-picker', x: 4, y: 52.6, w: 92, h: 9.7 },
                        ...animeTabs()
                    ]
                },
                'anime-picker': {
                    label: 'Pick a character', persona: 'anime', back: 'anime-settings',
                    hotspots: [
                        back(1, 8.5),
                        { id: 'luffy', label: 'Pick Luffy', to: 'anime-colours', x: 67, y: 33, w: 29, h: 24 }
                    ]
                },
                'anime-colours': {
                    label: 'Colours from his art', persona: 'anime', back: 'anime-picker',
                    hotspots: [
                        back(1, 8.5),
                        { id: 'use', label: 'Use these colours', to: 'anime-settings', t: 'fade', x: 4, y: 70, w: 92, h: 5.8 }
                    ]
                }
            },
            demo: [
                'tab-settings', 'anime', 'change', 'luffy', 'use', 'tab-today', 'tick', 'ask', 'prompt',
                'back', 'back', 'tab-calendar', 'day', 'tab-settings', 'normal'
            ]
        }
    };
})();
