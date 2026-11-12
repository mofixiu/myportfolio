// Screen maps for the interactive phone prototypes (rendered by js/phone-prototype.js).
// Hotspot boxes are percentages of the screen: x, y, w, h. `to` is a screen id, 'back',
// or { personaId: screenId }. `t` is the transition: push (the default fade-up), tab, fade, sheet or scroll.
// Images come from screenshots/device/<app>/ (full size) and .../sm/ (card previews).
(function () {
    'use strict';

    // Evenly spaced tab-bar hotspots. Each tab is [id, label, target] or null for a tab
    // without a matching screenshot.
    function tabBar(y, h, tabs, left = 0, right = 100) {
        const width = (right - left) / tabs.length;
        return tabs.map((tab, i) => tab && {
            id: tab[0],
            label: tab[1],
            to: tab[2],
            t: 'tab',
            x: left + i * width,
            y,
            w: width,
            h
        }).filter(Boolean);
    }

    const back = (x, y, w = 11, h = 6, label = 'Back') => ({ id: 'back', label, to: 'back', x, y, w, h });

    // aLaStudie -----------------------------------------------------------------------
    const alaHome = { nia: '01-home-nia', tobi: '12-home-tobi' };
    const alaRooms = { nia: '07-my-rooms-nia', tobi: '13-my-rooms-tobi' };
    const alaProfile = { nia: '04-profile-nia', tobi: '11-profile-tobi' };
    const alaTabs = (skip) => tabBar(88, 8, [
        ['tab-home', 'Home', alaHome],
        ['tab-discover', 'Discover', '02-discover'],
        ['tab-myrooms', 'My rooms', alaRooms],
        ['tab-profile', 'Profile', alaProfile]
    ].map((tab) => (tab[0] === skip ? null : tab)), 4, 96);

    const alastudie = {
        name: 'aLaStudie',
        base: 'screenshots/device/alastudie/',
        island: true,
        start: '00-splash',
        personas: [
            {
                id: 'nia', label: 'Nia · student', start: '01-home-nia',
                chips: ['00-splash', '01-home-nia', '05-notifications-sheet', '02-discover', '03-discover-filters', '07-my-rooms-nia', '08-create-room-sheet', '09-room-detail-chemistry', '04-profile-nia', '10-settings']
            },
            {
                id: 'tobi', label: 'Tobi · host', start: '12-home-tobi',
                chips: ['12-home-tobi', '02-discover', '13-my-rooms-tobi', '08-create-room-sheet', '14-hosted-room-tobi', '11-profile-tobi', '10-settings']
            }
        ],
        screens: {
            '00-splash': {
                label: 'Splash',
                hotspots: [{ id: 'enter', label: 'Open the app', to: alaHome, t: 'fade', x: 0, y: 0, w: 100, h: 100 }]
            },
            '01-home-nia': {
                label: 'Home', persona: 'nia',
                hotspots: [
                    { id: 'bell', label: 'Notifications', to: '05-notifications-sheet', t: 'sheet', x: 84, y: 8, w: 11, h: 5.5 },
                    { id: 'explore', label: 'Explore rooms', to: '02-discover', t: 'tab', x: 10.5, y: 39, w: 48.5, h: 5.6 },
                    { id: 'all-rooms', label: 'All rooms', to: '02-discover', t: 'tab', x: 75, y: 49.6, w: 20, h: 4.6 },
                    ...alaTabs('tab-home')
                ]
            },
            '02-discover': {
                label: 'Discover',
                hotspots: [
                    { id: 'filters', label: 'Filter rooms', to: '03-discover-filters', t: 'sheet', x: 5, y: 62.8, w: 77.8, h: 5.4 },
                    ...alaTabs('tab-discover')
                ]
            },
            '03-discover-filters': {
                label: 'Filters', sheetTop: 42, back: '02-discover',
                hotspots: [
                    { id: 'scrim', label: 'Close filters', to: 'back', x: 0, y: 0, w: 100, h: 41 },
                    { id: 'close', label: 'Close filters', to: 'back', x: 86, y: 44.6, w: 9.5, h: 5.6 },
                    { id: 'apply', label: 'Apply filters', to: 'back', x: 3.9, y: 83, w: 92.2, h: 6.2 },
                    { id: 'clear', label: 'Clear filters', to: 'back', x: 30, y: 89.8, w: 40, h: 4 }
                ]
            },
            '04-profile-nia': {
                label: 'Profile', persona: 'nia',
                hotspots: [
                    { id: 'gear', label: 'Settings', to: '10-settings', x: 85, y: 8, w: 10, h: 5.5 },
                    ...alaTabs('tab-profile')
                ]
            },
            '05-notifications-sheet': {
                label: 'Notifications', persona: 'nia', sheetTop: 70, back: '01-home-nia',
                hotspots: [
                    { id: 'scrim', label: 'Close notifications', to: 'back', x: 0, y: 0, w: 100, h: 69 },
                    { id: 'close', label: 'Close notifications', to: 'back', x: 86, y: 72.6, w: 9.6, h: 5.6 }
                ]
            },
            '07-my-rooms-nia': {
                label: 'My rooms', persona: 'nia',
                hotspots: [
                    { id: 'create', label: 'Create a room', to: '08-create-room-sheet', t: 'sheet', x: 10.8, y: 35.6, w: 48.4, h: 5.4 },
                    { id: 'room', label: 'Open Organic chemistry, quiet hour', to: '09-room-detail-chemistry', x: 4.4, y: 47.6, w: 91.2, h: 22 },
                    ...alaTabs('tab-myrooms')
                ]
            },
            '08-create-room-sheet': {
                label: 'Create a room', sheetTop: 7, back: alaRooms,
                hotspots: [{ id: 'close', label: 'Close', to: 'back', x: 86, y: 9.5, w: 9.5, h: 5.6 }]
            },
            '09-room-detail-chemistry': {
                label: 'Room detail', persona: 'nia', back: '07-my-rooms-nia',
                hotspots: [back(4, 8, 13, 5.5)]
            },
            '10-settings': {
                label: 'Settings', back: alaProfile,
                hotspots: [{ id: 'close', label: 'Close settings', to: 'back', x: 85, y: 8, w: 10, h: 5.5 }]
            },
            '11-profile-tobi': {
                label: 'Profile', persona: 'tobi',
                hotspots: [
                    { id: 'gear', label: 'Settings', to: '10-settings', x: 85, y: 8, w: 10, h: 5.5 },
                    ...alaTabs('tab-profile')
                ]
            },
            '12-home-tobi': {
                label: 'Home', persona: 'tobi',
                hotspots: [
                    { id: 'explore', label: 'Explore rooms', to: '02-discover', t: 'tab', x: 10.5, y: 39, w: 48.5, h: 5.6 },
                    { id: 'all-rooms', label: 'All rooms', to: '02-discover', t: 'tab', x: 75, y: 49.6, w: 20, h: 4.6 },
                    ...alaTabs('tab-home')
                ]
            },
            '13-my-rooms-tobi': {
                label: 'My rooms', persona: 'tobi',
                hotspots: [
                    { id: 'create', label: 'Create a room', to: '08-create-room-sheet', t: 'sheet', x: 10.8, y: 35.6, w: 48.4, h: 5.4 },
                    ...alaTabs('tab-myrooms')
                ]
            },
            '14-hosted-room-tobi': {
                label: 'Hosted room', persona: 'tobi', back: '13-my-rooms-tobi',
                hotspots: [back(4, 8, 13, 5.5)]
            }
        },
        demo: ['enter', 'explore', 'filters', 'apply', 'tab-myrooms', 'room', 'back', 'tab-profile', 'gear'],
        preview: ['01-home-nia', '02-discover', '07-my-rooms-nia', '09-room-detail-chemistry']
    };

    // neFaRec ------------------------------------------------------------------------------
    const nefaTabs = (skip) => tabBar(89, 8, [
        ['tab-today', 'Today', '01-today'],
        ['tab-routines', 'Routines', '06-routines'],
        ['tab-history', 'History', '18-history-sessions'],
        ['tab-library', 'Library', '24-library']
    ].map((tab) => (tab[0] === skip ? null : tab)), 4, 96);
    const nefaBack = back(2, 8, 10, 5);
    const nefaHistory = (skip) => [
        ['sessions', 'Sessions', '18-history-sessions', 5],
        ['progress', 'Progress', '19-history-progress', 35],
        ['calendar', 'Calendar', '21-history-calendar', 65]
    ].filter((seg) => seg[0] !== skip).map((seg) => ({ id: seg[0], label: seg[1], to: seg[2], t: 'tab', x: seg[3], y: 21.5, w: 30, h: 5 }));

    const nefarec = {
        name: 'neFaRec',
        base: 'screenshots/device/nefarec/',
        island: true,
        start: '01-today',
        chips: ['01-today', '02-paste', '04-review', '06-routines', '09-workout', '09c-exercise-options', '09b-workout-video', '13-rest-countdown', '14-rest-overtime', '15-hold-timer', '17-summary-receipt', '18-history-sessions', '19-history-progress', '21-history-calendar', '24-library', '25b-exercise-detail-video', '27-form-check', '28-settings'],
        screens: {
            '01-today': {
                label: 'Today',
                hotspots: [
                    { id: 'resume', label: 'Back to workout', to: '09-workout', x: 11, y: 50, w: 78, h: 6.5 },
                    { id: 'paste', label: 'Paste a routine', to: '02-paste', x: 63, y: 9, w: 10, h: 4.5 },
                    { id: 'settings', label: 'Settings', to: '28-settings', x: 74, y: 9, w: 10, h: 4.5 },
                    { id: 'profile', label: 'Profile', to: '29-account-profile', x: 85, y: 8.5, w: 11, h: 5 },
                    { id: 'in-progress', label: 'Open the workout in progress', to: '09-workout', x: 4, y: 82, w: 92, h: 6 },
                    ...nefaTabs('tab-today')
                ]
            },
            '02-paste': {
                label: 'Paste a routine', back: '01-today',
                hotspots: [
                    { id: 'close', label: 'Close', to: 'back', x: 2, y: 8, w: 10, h: 5 },
                    { id: 'example', label: 'Try the example', to: '03-paste-filled', t: 'fade', x: 26, y: 72, w: 31, h: 4.5 }
                ]
            },
            '03-paste-filled': {
                label: 'Routine pasted', back: '01-today',
                hotspots: [
                    { id: 'close', label: 'Close', to: 'back', x: 2, y: 8, w: 10, h: 5 },
                    { id: 'read', label: 'Read routine', to: '04-review', x: 4, y: 88, w: 92, h: 7 }
                ]
            },
            '04-review': {
                label: 'Review', back: '03-paste-filled',
                hotspots: [
                    nefaBack,
                    { id: 'card', label: 'Edit Side Lateral Raise', to: '05-edit-sheet', t: 'sheet', x: 5, y: 55.5, w: 90, h: 14.5 },
                    { id: 'save', label: 'Save routine', to: '06-routines', t: 'fade', x: 4, y: 88, w: 92, h: 7 }
                ]
            },
            '05-edit-sheet': {
                label: 'Edit exercise', sheetTop: 10, back: '04-review',
                hotspots: [
                    { id: 'scrim', label: 'Close', to: 'back', x: 0, y: 0, w: 100, h: 9.5 },
                    { id: 'close', label: 'Close', to: 'back', x: 85, y: 13, w: 10, h: 4.5 },
                    { id: 'done', label: 'Done', to: 'back', x: 7, y: 89.5, w: 86, h: 6.5 }
                ]
            },
            '06-routines': {
                label: 'Routines',
                hotspots: [
                    { id: 'routine', label: 'Open Thursday — Legs', to: '07-routine-detail', x: 4, y: 22, w: 92, h: 10.5 },
                    { id: 'paste', label: 'Paste a routine', to: '02-paste', x: 76, y: 10, w: 22, h: 5 },
                    { id: 'in-progress', label: 'Open the workout in progress', to: '09-workout', x: 4, y: 82, w: 92, h: 6 },
                    ...nefaTabs('tab-routines')
                ]
            },
            '07-routine-detail': {
                label: 'Routine', back: '06-routines',
                hotspots: [
                    nefaBack,
                    { id: 'start', label: 'Start Thursday — Legs', to: '09-workout', x: 5, y: 88, w: 90, h: 7 }
                ]
            },
            '09-workout': {
                label: 'Workout', back: '01-today',
                hotspots: [
                    { id: 'minimise', label: 'Minimise the workout', to: 'back', x: 2, y: 7.5, w: 10, h: 5 },
                    { id: 'options', label: 'Exercise options', to: '09c-exercise-options', t: 'sheet', x: 84, y: 41, w: 12, h: 6 },
                    { id: 'tick', label: 'Complete set 3', to: '13-rest-countdown', t: 'fade', x: 81, y: 79, w: 15, h: 6 }
                ]
            },
            '09c-exercise-options': {
                label: 'Exercise options', sheetTop: 48, back: '09-workout',
                hotspots: [
                    { id: 'scrim', label: 'Close', to: 'back', x: 0, y: 0, w: 100, h: 47 },
                    { id: 'close-options', label: 'Close', to: 'back', x: 84, y: 50.5, w: 12, h: 6 },
                    { id: 'how-to', label: 'How to do it', to: '10-how-to', t: 'sheet', x: 5, y: 59.5, w: 90, h: 6.5 },
                    { id: 'swap', label: 'Swap exercise', to: '11-swap-sheet', t: 'sheet', x: 5, y: 67, w: 90, h: 6.5 },
                    { id: 'form-check', label: 'Form check', to: '27-form-check', x: 5, y: 81.5, w: 90, h: 6.5 }
                ]
            },
            '09b-workout-video': {
                label: 'Video demo', back: '01-today',
                hotspots: [{ id: 'minimise', label: 'Minimise the workout', to: 'back', x: 2, y: 7.5, w: 10, h: 5 }]
            },
            '10-how-to': {
                label: 'How to', sheetTop: 10, back: '09-workout',
                hotspots: [
                    { id: 'scrim', label: 'Close', to: 'back', x: 0, y: 0, w: 100, h: 9.5 },
                    { id: 'close', label: 'Close', to: 'back', x: 85, y: 13, w: 10, h: 4.5 }
                ]
            },
            '11-swap-sheet': {
                label: 'Swap', sheetTop: 7, back: '09-workout',
                hotspots: [
                    { id: 'scrim', label: 'Close', to: 'back', x: 0, y: 0, w: 100, h: 6.5 },
                    { id: 'close', label: 'Close', to: 'back', x: 84, y: 10, w: 11, h: 5 }
                ]
            },
            '13-rest-countdown': {
                label: 'Rest', back: '09-workout',
                hotspots: [
                    { id: 'wait', label: 'Let the rest run over', to: '14-rest-overtime', t: 'fade', x: 5, y: 70, w: 55, h: 10 },
                    { id: 'skip-rest', label: 'Skip rest', to: '12-sets-logged', t: 'fade', x: 53, y: 87, w: 41, h: 6.5 }
                ]
            },
            '14-rest-overtime': {
                label: 'Overtime', back: '09-workout',
                hotspots: [{ id: 'next-set', label: 'Next set', to: '12-sets-logged', t: 'fade', x: 44, y: 87, w: 48, h: 6.5 }]
            },
            '12-sets-logged': {
                label: 'Sets logged', back: '09-workout',
                hotspots: [
                    { id: 'minimise', label: 'Minimise the workout', to: '01-today', t: 'fade', x: 2, y: 7.5, w: 10, h: 5 },
                    { id: 'skip', label: 'Skip to Wall Sit', to: '15-hold-timer', t: 'fade', x: 51, y: 95.5, w: 45, h: 4.5 }
                ]
            },
            '15-hold-timer': {
                label: 'Hold timer', back: '12-sets-logged',
                hotspots: [{ id: 'stop', label: 'Stop, log and finish', to: '17-summary-receipt', t: 'fade', x: 37, y: 87, w: 54, h: 6.5 }]
            },
            '17-summary-receipt': {
                label: 'Summary',
                hotspots: [
                    { id: 'done', label: 'Done', to: '18-history-sessions', t: 'fade', x: 4, y: 88, w: 92, h: 7 },
                    { id: 'close', label: 'Close', to: '18-history-sessions', t: 'fade', x: 2, y: 8, w: 10, h: 5 }
                ]
            },
            '18-history-sessions': {
                label: 'History',
                hotspots: [
                    ...nefaHistory('sessions'),
                    { id: 'session', label: 'Open Thursday — Legs', to: '23-session-detail', x: 5, y: 45.5, w: 90, h: 9.5 },
                    ...nefaTabs('tab-history')
                ]
            },
            '19-history-progress': { label: 'Progress', hotspots: [...nefaHistory('progress'), ...nefaTabs('tab-history')] },
            '21-history-calendar': {
                label: 'Calendar',
                hotspots: [
                    ...nefaHistory('calendar'),
                    ...nefaTabs('tab-history')
                ]
            },
            '23-session-detail': { label: 'Session receipt', back: '18-history-sessions', hotspots: [nefaBack] },
            '24-library': {
                label: 'Library',
                hotspots: [
                    { id: 'exercise', label: 'Open Barbell Bench Press', to: '25b-exercise-detail-video', x: 4, y: 62, w: 92, h: 9 },
                    ...nefaTabs('tab-library')
                ]
            },
            '25b-exercise-detail-video': { label: 'Exercise', back: '24-library', hotspots: [nefaBack] },
            '27-form-check': { label: 'Form check', back: '09-workout', hotspots: [nefaBack] },
            '28-settings': {
                label: 'Settings', back: '01-today',
                hotspots: [
                    nefaBack,
                    { id: 'account', label: 'Profile & account', to: '29-account-profile', x: 5, y: 22, w: 90, h: 9 }
                ]
            },
            '29-account-profile': { label: 'Profile', back: '28-settings', hotspots: [nefaBack] }
        },
        demo: ['resume', 'options', 'how-to', 'close', 'close-options', 'tick', 'wait', 'next-set', 'skip', 'stop', 'done', 'progress', 'calendar', 'tab-library', 'exercise'],
        preview: ['01-today', '09b-workout-video', '14-rest-overtime', '19-history-progress']
    };

    // HYBSTOCKADVISOR ----------------------------------------------------------------------
    const hybTabs = (skip) => tabBar(89, 8, [
        ['tab-home', 'Home', '1'],
        ['tab-insights', 'AI insights', '2'],
        ['tab-portfolio', 'Portfolio', '3'],
        null // Profile: no screenshot
    ].map((tab) => (tab && tab[0] === skip ? null : tab)));
    const lexi = { id: 'lexi', label: 'Ask Lexi, the AI advisor', to: '5', t: 'sheet', x: 85.5, y: 82, w: 12, h: 7 };

    const hybstock = {
        name: 'HybStockAdvisor',
        base: 'screenshots/device/hybstock/',
        island: true,
        start: '1',
        screens: {
            1: {
                label: 'Dashboard',
                hotspots: [
                    { id: 'explain', label: 'Why this recommendation?', to: '2', x: 22, y: 64.5, w: 56, h: 12 },
                    lexi,
                    ...hybTabs('tab-home')
                ]
            },
            2: {
                label: 'AI insights',
                hotspots: [
                    { id: 'drivers', label: 'Scroll to market drivers', to: '6', t: 'scroll', x: 3, y: 72, w: 94, h: 16 },
                    lexi,
                    ...hybTabs('tab-insights')
                ]
            },
            3: {
                label: 'Portfolio',
                hotspots: [
                    { id: 'holding', label: 'Open a holding', to: '4', t: 'sheet', x: 3, y: 22, w: 94, h: 6.2 },
                    lexi,
                    ...hybTabs('tab-portfolio')
                ]
            },
            4: {
                label: 'Asset breakdown', sheetTop: 37, back: '3',
                hotspots: [
                    { id: 'scrim', label: 'Close breakdown', to: 'back', x: 0, y: 0, w: 100, h: 36 },
                    { id: 'ask-ai', label: 'Ask AI about WAPCO', to: '5', t: 'sheet', x: 5, y: 87.2, w: 89.6, h: 5.4 }
                ]
            },
            5: {
                label: 'Lexi AI chat', sheetTop: 15, back: '1',
                hotspots: [
                    { id: 'scrim', label: 'Close chat', to: 'back', x: 0, y: 0, w: 100, h: 14 },
                    { id: 'close', label: 'Close chat', to: 'back', x: 87, y: 18, w: 11, h: 5.5 }
                ]
            },
            6: {
                label: 'Market drivers',
                hotspots: [
                    { id: 'top', label: 'Back to the top', to: '2', t: 'scrollup', x: 5, y: 6.5, w: 90, h: 6 },
                    lexi,
                    ...tabBar(89, 8, [['tab-home', 'Home', '1'], ['tab-insights', 'AI insights', '2'], ['tab-portfolio', 'Portfolio', '3'], null])
                ]
            }
        },
        demo: ['explain', 'drivers', 'tab-portfolio', 'holding', 'ask-ai', 'close'],
        preview: ['1', '2', '3', '5']
    };

    // SIWES360 -------------------------------------------------------------------------------
    // One sign-in screen, then four roles. Tabs without a screenshot are left out.
    const siwesTabs = (tabs) => (skip) => tabBar(90, 7, tabs.map((tab) => (tab && tab[0] === skip ? null : tab)));
    const studentTabs = siwesTabs([['tab-today', 'Today', '1'], ['tab-logbook', 'Logbook', '2'], null]);
    const supervisorTabs = siwesTabs([['tab-review', 'Review', '4'], null, null]);
    const schoolTabs = siwesTabs([['tab-overview', 'Overview', '6'], ['tab-students', 'Students', '7'], null]);

    const siwes360 = {
        name: 'SIWES360',
        base: 'screenshots/device/siwes360/',
        island: true,
        start: '10',
        personas: [
            { id: 'student', label: 'Student', start: '1', chips: ['1', '2', '3'] },
            { id: 'supervisor', label: 'Supervisor', start: '4', chips: ['4', '5'] },
            { id: 'school', label: 'School', start: '6', chips: ['6', '7', '8'] },
            { id: 'itf', label: 'ITF', start: '9', chips: ['9'] }
        ],
        screens: {
            10: {
                label: 'Sign in',
                hotspots: [
                    { id: 'signin', label: 'Sign in', to: { student: '1', supervisor: '4', school: '6', itf: '9' }, t: 'fade', x: 4, y: 64.6, w: 92, h: 7 }
                ]
            },
            1: {
                label: 'Today', persona: 'student',
                hotspots: [
                    { id: 'write', label: "Write today's entry", to: '3', x: 5, y: 27.3, w: 90, h: 6.3 },
                    { id: 'all-entries', label: 'All entries', to: '2', t: 'tab', x: 3, y: 84, w: 94, h: 5.5 },
                    ...studentTabs('tab-today')
                ]
            },
            2: {
                label: 'Logbook', persona: 'student',
                hotspots: [
                    { id: 'new', label: 'New entry', to: '3', x: 66, y: 9.8, w: 31, h: 5 },
                    ...studentTabs('tab-logbook')
                ]
            },
            3: {
                label: 'New entry', persona: 'student', back: '2',
                hotspots: [
                    back(1, 9, 11, 6),
                    { id: 'submit', label: 'Submit for review', to: 'back', x: 4, y: 88.3, w: 92, h: 6.4 }
                ]
            },
            4: {
                label: 'Logbooks to review', persona: 'supervisor',
                hotspots: [
                    { id: 'week', label: "Open Kelechi Obi's week 9", to: '5', x: 3, y: 36.2, w: 94, h: 6.6 },
                    ...supervisorTabs('tab-review')
                ]
            },
            5: { label: 'Week review', persona: 'supervisor', back: '4', hotspots: [back(1, 9, 11, 6)] },
            6: {
                label: 'School overview', persona: 'school',
                hotspots: [
                    { id: 'see-all', label: 'See all students behind', to: '7', t: 'tab', x: 78, y: 43.3, w: 19, h: 4 },
                    { id: 'behind', label: "Open Ibrahim Musa's record", to: '8', x: 3, y: 48, w: 94, h: 6 },
                    ...schoolTabs('tab-overview')
                ]
            },
            7: {
                label: 'Students', persona: 'school',
                hotspots: [
                    { id: 'student', label: "Open Ibrahim Musa's record", to: '8', x: 3, y: 74.8, w: 94, h: 8 },
                    ...schoolTabs('tab-students')
                ]
            },
            8: { label: "A student's record", persona: 'school', back: '7', hotspots: [back(1, 9, 11, 6)] },
            9: { label: 'Institutions', persona: 'itf', hotspots: [] }
        },
        demo: ['signin', 'write', 'back', 'tab-logbook', { persona: 'supervisor' }, 'week', 'back', { persona: 'school' }, 'behind', 'back', 'tab-students', { persona: 'itf' }],
        preview: ['1', '2', '4', '6']
    };

    // OtakuPlanner ---------------------------------------------------------------------------
    const otakuTabs = (skip) => tabBar(90, 7.5, [
        ['tab-today', 'Today', '3'],
        ['tab-calendar', 'Calendar', '6'],
        ['tab-tasks', 'Tasks', '4'],
        ['tab-badges', 'Badges', '5'],
        ['tab-settings', 'Settings', '7']
    ].map((tab) => (tab[0] === skip ? null : tab)));
    const otakuAsk = { id: 'ask', label: 'Ask the assistant', to: '8', x: 18, y: 9.5, w: 14, h: 5 };

    const otakuplanner = {
        name: 'OtakuPlanner',
        base: 'screenshots/device/otakuplanner/',
        island: true,
        start: '1',
        chips: ['1', '3', '6', '4', '2', '5', '8', '7'],
        screens: {
            1: {
                label: 'Log in',
                hotspots: [
                    { id: 'login', label: 'Log in', to: '3', t: 'fade', x: 5.5, y: 67.4, w: 89, h: 6.3 }
                ]
            },
            2: {
                label: 'Automate a task', back: '4',
                hotspots: [
                    back(1, 8.5, 11, 7),
                    { id: 'add', label: 'Add the repeats to my calendar', to: '6', t: 'tab', x: 4, y: 65.5, w: 92, h: 6 }
                ]
            },
            3: {
                label: 'Today',
                hotspots: [
                    otakuAsk,
                    { id: 'badges', label: 'Badges', to: '5', t: 'tab', x: 69.5, y: 23.5, w: 25.5, h: 14 },
                    ...otakuTabs('tab-today')
                ]
            },
            4: {
                label: 'Tasks',
                hotspots: [
                    otakuAsk,
                    { id: 'automate', label: 'Automate a task', to: '2', x: 68.5, y: 16.5, w: 31, h: 5.5 },
                    ...otakuTabs('tab-tasks')
                ]
            },
            5: { label: 'Badges', hotspots: [otakuAsk, ...otakuTabs('tab-badges')] },
            6: { label: 'Calendar', hotspots: [otakuAsk, ...otakuTabs('tab-calendar')] },
            7: { label: 'Settings', hotspots: [otakuAsk, ...otakuTabs('tab-settings')] },
            8: { label: 'Ask', back: '3', hotspots: [back(1, 8.5, 11, 6.5)] }
        },
        demo: ['login', 'ask', 'back', 'tab-tasks', 'automate', 'add', 'tab-badges', 'tab-settings'],
        preview: ['3', '4', '8', '5']
    };

    // Lodgix -------------------------------------------------------------------------------
    const lodgixTabs = (skip) => tabBar(90, 8, [
        ['tab-home', 'Home', '1'],
        ['tab-booked', 'Bookings', '2'],
        ['tab-saved', 'Saved', '3'],
        ['tab-profile', 'Profile', '4']
    ].map((tab) => (tab[0] === skip ? null : tab)));

    const lodgix = {
        name: 'Lodgix',
        base: 'screenshots/device/lodgix/',
        island: true,
        start: '1',
        chips: ['1', '5', '7', '8', '10', '2', '9', '3', '4', '6'],
        screens: {
            1: {
                label: 'Home',
                hotspots: [
                    { id: 'search', label: 'Search stays', to: '5', x: 7.5, y: 33, w: 85, h: 7.5 },
                    { id: 'see-all', label: 'See all stays in Lagos', to: '5', x: 79, y: 45, w: 18, h: 5 },
                    { id: 'open-hotel', label: 'Open Grand Plaza Hotel', to: '7', x: 4.5, y: 50, w: 63, h: 28.5 },
                    ...lodgixTabs('tab-home')
                ]
            },
            2: {
                label: 'Bookings',
                hotspots: [
                    { id: 'open-booking', label: 'Open the Ocean View Resort booking', to: '9', x: 3, y: 20, w: 94, h: 11.5 },
                    ...lodgixTabs('tab-booked')
                ]
            },
            3: { label: 'Saved', hotspots: lodgixTabs('tab-saved') },
            4: {
                label: 'Profile',
                hotspots: [
                    { id: 'payments', label: 'Payment history', to: '6', x: 3, y: 31, w: 94, h: 6.5 },
                    ...lodgixTabs('tab-profile')
                ]
            },
            5: {
                label: 'Search results', back: '1',
                hotspots: [
                    back(1, 8.5, 10, 6),
                    { id: 'open-hotel', label: 'Open Grand Plaza Hotel', to: '7', x: 3, y: 23, w: 94, h: 11.5 }
                ]
            },
            6: { label: 'Payment history', back: '4', hotspots: [back(1, 8.5, 10, 6)] },
            7: {
                label: 'Hotel details', back: '1',
                hotspots: [
                    back(3, 8.5, 10, 6.5),
                    { id: 'dates', label: 'Choose dates', to: '8', x: 54.5, y: 87.5, w: 41.5, h: 7.5 }
                ]
            },
            8: {
                label: 'Your stay', back: '7',
                hotspots: [
                    back(1, 8.5, 10, 6),
                    { id: 'continue', label: 'Continue to payment', to: '10', x: 4.5, y: 87.8, w: 91, h: 7 }
                ]
            },
            9: { label: 'Booking', back: '2', hotspots: [back(1, 8.5, 10, 6)] },
            10: { label: 'Payment', back: '8', hotspots: [back(1, 8.5, 10, 6)] }
        },
        demo: ['open-hotel', 'dates', 'continue', 'back', 'back', 'back', 'tab-booked', 'open-booking', 'back', 'tab-profile', 'payments'],
        preview: ['1', '7', '8', '2']
    };

    // TheMentRent ----------------------------------------------------------------------------
    const mentTabs = (skip) => tabBar(92.5, 7.5, [
        ['tab-home', 'Home', '2'],
        ['tab-chat', 'Chat', '3'],
        ['tab-meet', 'Meet', '5'],
        null // Profile: no screenshot
    ].map((tab) => (tab && tab[0] === skip ? null : tab)));

    const thementrent = {
        name: 'TheMentRent',
        base: 'screenshots/device/thementrent/',
        statusBar: 'dark',
        island: true,
        start: '1',
        screens: {
            1: {
                label: 'Sign in',
                hotspots: [
                    { id: 'sign-in', label: 'Sign in', to: '2', t: 'fade', x: 4.7, y: 57, w: 90, h: 4.4 },
                    { id: 'social', label: 'Continue with Google or Apple', to: '2', t: 'fade', x: 4.7, y: 79, w: 90, h: 11.3 }
                ]
            },
            2: {
                label: 'Home',
                hotspots: [{ id: 'show-all', label: 'Show all mentors', to: '5', t: 'tab', x: 76, y: 38.5, w: 22, h: 5 }]
            },
            3: {
                label: 'Chat',
                hotspots: [
                    { id: 'conversation', label: 'Open conversation', to: '4', x: 4.4, y: 31.5, w: 93.4, h: 6.8 },
                    ...mentTabs('tab-chat')
                ]
            },
            4: { label: 'Conversation', back: '3', hotspots: [back(1, 6.5, 11, 6)] },
            5: { label: 'Meet mentors', hotspots: mentTabs('tab-meet') }
        },
        demo: ['sign-in', 'show-all', 'tab-chat', 'conversation'],
        preview: ['2', '3', '4', '5']
    };

    // Spotify Clone --------------------------------------------------------------------------
    const spotifyclone = {
        name: 'Spotify Clone',
        base: 'screenshots/device/spotifyclone/',
        statusBar: 'light',
        island: true,
        start: '1',
        screens: {
            1: {
                label: 'Home',
                hotspots: [
                    { id: 'birthday', label: 'Open My 24th Birthday', to: '3', x: 4.2, y: 20.3, w: 43.3, h: 6.8 },
                    { id: 'mix', label: 'Open Burna Boy Mix', to: '2', x: 3, y: 84.5, w: 33.4, h: 14.6 }
                ]
            },
            2: { label: 'Mix', back: '1' },
            3: { label: 'Playlist', back: '1' }
        },
        demo: ['mix', 'back', 'birthday'],
        preview: ['1', '2', '3']
    };

    // Haze Couture ---------------------------------------------------------------------------
    // Screens that show other people's details, addresses or emails were left out of the set.
    const hazeTabs = (skip) => tabBar(90, 7.5, [
        ['tab-shop', 'Shop', '03-shop'],
        null, // Explore: no screenshot
        ['tab-cart', 'Cart', '07-cart'],
        null // Muse profile: no screenshot
    ].map((tab) => (tab && tab[0] === skip ? null : tab)), 10, 90);

    // A shipped App Store app, so it is presented as a tour rather than a prototype.
    const haze = {
        name: 'Haze Couture',
        screenLabel: 'Haze Couture app tour',
        base: 'screenshots/device/haze/',
        island: true,
        start: '01-onboarding',
        chips: ['01-onboarding', '03-shop', '05-tryon', '09-talk', '12-poll', '14-pay-for-me', '16-garment-scan', '18-trip-wardrobe', '21-teen-approval'],
        screens: {
            '01-onboarding': {
                label: 'Body scan intro',
                hotspots: [
                    { id: 'maybe-later', label: 'Maybe later', to: '03-shop', t: 'fade', x: 7, y: 89, w: 41.6, h: 5 },
                    { id: 'start-scan', label: 'Start scan', to: '02-scan-building', x: 52, y: 89, w: 40, h: 5 }
                ]
            },
            '02-scan-building': {
                label: 'Building your body scan',
                hotspots: [{ id: 'next', label: 'Next', to: '03-shop', t: 'fade', x: 6.7, y: 88.9, w: 86.6, h: 4.4 }]
            },
            '03-shop': {
                label: 'Shop',
                hotspots: [
                    { id: 'heritage', label: 'Open Heritage Trail', to: '04-product', x: 50.3, y: 13.8, w: 48.6, h: 44.7 },
                    { id: 'tryons', label: 'Your try-ons', to: '06-tryons', x: 75, y: 7, w: 10, h: 6 },
                    { id: 'chats', label: 'Open a group chat', to: '11-group-menu', x: 87, y: 7, w: 11, h: 6 },
                    { id: 'search', label: 'Search with Haze', to: '08-search', x: 84, y: 80.5, w: 11, h: 6 },
                    ...hazeTabs('tab-shop')
                ]
            },
            '04-product': {
                label: 'Product in 3D', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'try-on', label: 'Try on', to: '05-tryon', x: 62.8, y: 90.7, w: 25.5, h: 4.2 }
                ]
            },
            '05-tryon': {
                label: 'Try-on', back: '04-product',
                hotspots: [
                    back(2, 6.5, 11, 6),
                    { id: 'exit', label: 'Exit try-on', to: 'back', x: 57.2, y: 91.7, w: 27.2, h: 4.1 }
                ]
            },
            '06-tryons': {
                label: 'Your try-ons', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'heritage', label: 'Open the Heritage Trail try-on', to: '05-tryon', x: 52, y: 19.5, w: 45.8, h: 35.2 }
                ]
            },
            '07-cart': { label: 'Cart', hotspots: hazeTabs('tab-cart') },
            '08-search': {
                label: 'Magic search', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'talk', label: 'Talk to Haze', to: '09-talk', x: 84, y: 91, w: 13, h: 7 }
                ]
            },
            '09-talk': {
                label: 'Talk to Haze', back: '08-search',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'try-on', label: 'Try on the Linen Pant Set', to: '10-tryon-linen', x: 34, y: 84.9, w: 28, h: 4.6 }
                ]
            },
            '10-tryon-linen': {
                label: 'Try-on', back: '09-talk',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'exit', label: 'Exit try-on', to: 'back', x: 63.3, y: 91, w: 29.5, h: 4.4 }
                ]
            },
            '11-group-menu': {
                label: 'Group chat tools', back: '03-shop',
                hotspots: [
                    { id: 'close', label: 'Close menu', to: 'back', x: 0, y: 0, w: 100, h: 18 },
                    { id: 'poll', label: 'Create an outfit poll', to: '12-poll', t: 'sheet', x: 5, y: 21.8, w: 55, h: 4.6 }
                ]
            },
            '12-poll': {
                label: 'Outfit poll', sheetTop: 47, back: '11-group-menu',
                hotspots: [
                    { id: 'scrim', label: 'Close poll', to: 'back', x: 0, y: 0, w: 100, h: 46 },
                    { id: 'close', label: 'Close poll', to: 'back', x: 84, y: 49, w: 9, h: 5 },
                    { id: 'send', label: 'Send poll', to: 'back', x: 9.2, y: 90.7, w: 81.6, h: 4.4 }
                ]
            },
            '13-chat-menu': {
                label: 'Chat tools', back: '03-shop',
                hotspots: [
                    { id: 'close', label: 'Close menu', to: 'back', x: 0, y: 0, w: 100, h: 18 },
                    { id: 'pay-for-me', label: 'Request a Pay For Me', to: '14-pay-for-me', x: 5, y: 73.2, w: 55, h: 4.4 }
                ]
            },
            '14-pay-for-me': {
                label: 'Pay For Me', back: '13-chat-menu',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'continue', label: 'Send the request', to: 'back', x: 5.8, y: 60.4, w: 88.4, h: 4.5 }
                ]
            },
            '15-wardrobes': {
                label: 'Personal wardrobe', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'scan-first', label: 'Scan your first garment', to: '16-garment-scan', x: 26.9, y: 71, w: 46.1, h: 4.1 },
                    { id: 'scan', label: 'Scan clothes', to: '16-garment-scan', x: 62.5, y: 87.6, w: 32.5, h: 4.1 }
                ]
            },
            '16-garment-scan': {
                label: 'Scan a garment', back: '15-wardrobes',
                hotspots: [
                    { id: 'close', label: 'Close camera', to: 'back', x: 4, y: 8.6, w: 12, h: 6 },
                    { id: 'shutter', label: 'Take photo', to: '17-garment-details', x: 40, y: 83.5, w: 20, h: 9.5 }
                ]
            },
            '17-garment-details': {
                label: 'Garment details', back: '16-garment-scan',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'save', label: 'Save to my own clothes', to: '22-extracting', t: 'tab', x: 5.8, y: 90.7, w: 88.2, h: 4.5 }
                ]
            },
            '22-extracting': {
                label: 'Extracting garment', back: '15-wardrobes',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'scan', label: 'Scan clothes', to: '16-garment-scan', x: 62.5, y: 87.5, w: 32.5, h: 4.3 }
                ]
            },
            '18-trip-wardrobe': {
                label: 'Shared wardrobe', back: '15-wardrobes',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'suggestions', label: 'Wardrobe suggestions', to: '19-suggestions', t: 'sheet', x: 26.5, y: 16.4, w: 38.5, h: 4 }
                ]
            },
            '19-suggestions': {
                label: 'Suggestions', sheetTop: 52, back: '18-trip-wardrobe',
                hotspots: [
                    { id: 'scrim', label: 'Close suggestions', to: 'back', x: 0, y: 0, w: 100, h: 51 },
                    { id: 'close', label: 'Close suggestions', to: 'back', x: 83, y: 53.5, w: 10, h: 6 },
                    { id: 'decline', label: 'Decline suggestion', to: 'back', x: 10.3, y: 85.3, w: 37.8, h: 4.7 },
                    { id: 'accept', label: 'Accept suggestion', to: 'back', x: 51.5, y: 85.3, w: 37.9, h: 4.7 }
                ]
            },
            '20-account': {
                label: 'Account', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'profile-sharing', label: 'Profile sharing', to: '23-profile-sharing', x: 4.4, y: 12.9, w: 89.2, h: 6.3 }
                ]
            },
            '23-profile-sharing': { label: 'Profile sharing', back: '20-account', hotspots: [back(2, 7, 11, 6)] },
            '21-teen-approval': {
                label: 'Guardian approval', back: '20-account',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'approve', label: 'Approve', to: 'back', x: 6.8, y: 65.5, w: 86.2, h: 4.4 },
                    { id: 'decline', label: 'Decline', to: 'back', x: 6.8, y: 72, w: 86.2, h: 5 }
                ]
            }
        },
        demo: ['start-scan', 'next', 'heritage', 'try-on', 'exit', 'back', 'search', 'talk', 'try-on'],
        preview: ['03-shop', '05-tryon', '09-talk', '12-poll']
    };

    // Escra (card preview only) ----------------------------------------------------------
    const escra = {
        name: 'Escra',
        base: 'screenshots/device/escra/',
        island: true,
        start: 'login',
        screens: { login: { label: 'Authenticate identity' } },
        preview: ['login']
    };

    window.APP_PROTOTYPES = { haze, alastudie, nefarec, hybstock, siwes360, otakuplanner, lodgix, thementrent, spotifyclone, escra };
})();
