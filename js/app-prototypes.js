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
    const studentTabs = (skip) => tabBar(89.5, 7, [
        ['tab-home', 'Home', '1'],
        ['tab-logbook', 'Logbook', '3'],
        ['tab-profile', 'Profile', '6']
    ].map((tab) => (tab[0] === skip ? null : tab)));
    const supervisorTabs = (skip) => tabBar(89.5, 7, [
        ['tab-home', 'Home', '9'],
        ['tab-students', 'Students', '10'],
        ['tab-profile', 'Profile and settings', '8']
    ].map((tab) => (tab[0] === skip ? null : tab)));

    const siwes360 = {
        name: 'SIWES360',
        base: 'screenshots/device/siwes360/',
        start: '1',
        personas: [
            { id: 'student', label: 'Student', start: '1', chips: ['1', '2', '3', '4', '5', '6', '7'] },
            { id: 'supervisor', label: 'Supervisor', start: '9', chips: ['9', '10', '8'] }
        ],
        screens: {
            1: {
                label: 'Dashboard', persona: 'student',
                hotspots: [
                    { id: 'more', label: 'Scroll down', to: '2', t: 'scroll', x: 4, y: 64, w: 92, h: 13.5 },
                    { id: 'write', label: 'Write new log entry', to: '4', x: 4.7, y: 79.8, w: 90.6, h: 6.4 },
                    ...studentTabs('tab-home')
                ]
            },
            2: {
                label: 'Recent entries', persona: 'student',
                hotspots: [
                    { id: 'view-all', label: 'View all entries', to: '3', t: 'tab', x: 76, y: 10.5, w: 20, h: 5 },
                    ...tabBar(89.5, 7, [['tab-home', 'Home', '1'], ['tab-logbook', 'Logbook', '3'], ['tab-profile', 'Profile', '6']])
                ]
            },
            3: {
                label: 'Logbook', persona: 'student',
                hotspots: [
                    { id: 'entry', label: 'Open log entry', to: '5', t: 'sheet', x: 5, y: 56.3, w: 90.3, h: 11.8 },
                    { id: 'add', label: 'New log entry', to: '4', x: 83, y: 80, w: 13, h: 8 },
                    ...studentTabs('tab-logbook')
                ]
            },
            4: { label: 'New log entry', persona: 'student', back: '3', hotspots: [back(2, 7.5, 10, 5.5)] },
            5: {
                label: 'Entry details', persona: 'student', sheetTop: 30, back: '3',
                hotspots: [{ id: 'scrim', label: 'Close entry', to: 'back', x: 0, y: 0, w: 100, h: 29 }]
            },
            6: {
                label: 'Profile', persona: 'student',
                hotspots: [
                    { id: 'edit', label: 'Edit profile', to: '7', x: 9.7, y: 44, w: 80.3, h: 5.6 },
                    ...studentTabs('tab-profile')
                ]
            },
            7: { label: 'Edit profile', persona: 'student', back: '6', hotspots: [back(2, 7.5, 10, 5.5)] },
            8: { label: 'Settings', persona: 'supervisor', back: '9', hotspots: [back(2, 7.5, 10, 5.5)] },
            9: {
                label: 'Supervisor dashboard', persona: 'supervisor',
                hotspots: [
                    { id: 'pending', label: 'Pending approvals', to: '10', t: 'tab', x: 52.2, y: 18.9, w: 43.1, h: 16 },
                    ...supervisorTabs('tab-home')
                ]
            },
            10: { label: 'My students', persona: 'supervisor', hotspots: supervisorTabs('tab-students') }
        },
        demo: ['write', 'back', 'tab-logbook', 'entry', 'scrim', 'tab-profile', 'edit', 'back', { persona: 'supervisor' }, 'tab-students'],
        preview: ['1', '3', '4', '9']
    };

    // OtakuPlanner ---------------------------------------------------------------------------
    const otakuTabs = (skip) => tabBar(89.5, 7, [
        ['tab-home', 'Home', '3'],
        null, // Calendar: no screenshot
        ['tab-tasks', 'Tasks', '4'],
        ['tab-achievements', 'Achievements', '5'],
        null // Settings: no screenshot
    ].map((tab) => (tab && tab[0] === skip ? null : tab)));

    const otakuplanner = {
        name: 'OtakuPlanner',
        base: 'screenshots/device/otakuplanner/',
        start: '1',
        chips: ['1', '3', '4', '2', '5'],
        screens: {
            1: {
                label: 'Log in',
                hotspots: [
                    { id: 'login', label: 'Log in', to: '3', t: 'fade', x: 9.7, y: 66.4, w: 80.3, h: 4.9 },
                    { id: 'social', label: 'Continue with a social account', to: '3', t: 'fade', x: 9.7, y: 77.9, w: 80.3, h: 4.5 }
                ]
            },
            2: { label: 'Task automation', back: '4', hotspots: [back(2, 7.5, 10, 5.5)] },
            3: { label: 'Home', hotspots: otakuTabs('tab-home') },
            4: {
                label: 'My tasks',
                hotspots: [
                    { id: 'automate', label: 'Automate a task', to: '2', x: 60.6, y: 16, w: 37.2, h: 4.4 },
                    ...otakuTabs('tab-tasks')
                ]
            },
            5: { label: 'Achievements', hotspots: otakuTabs('tab-achievements') }
        },
        demo: ['login', 'tab-tasks', 'automate', 'back', 'tab-achievements'],
        preview: ['3', '4', '2', '5']
    };

    // Lodgix -------------------------------------------------------------------------------
    const lodgixTabs = (skip) => tabBar(89, 8, [
        ['tab-home', 'Home', '1'],
        ['tab-booked', 'Booked', '2'],
        ['tab-saved', 'Saved', '3'],
        ['tab-profile', 'Profile', '4']
    ].map((tab) => (tab[0] === skip ? null : tab)));

    const lodgix = {
        name: 'Lodgix',
        base: 'screenshots/device/lodgix/',
        start: '1',
        screens: {
            1: {
                label: 'Home',
                hotspots: [
                    { id: 'search', label: 'Search hotels', to: '5', x: 5.5, y: 15, w: 86.5, h: 5.7 },
                    { id: 'bookmarks', label: 'Bookmarks', to: '3', t: 'tab', x: 84, y: 4.5, w: 12, h: 7.5 },
                    ...lodgixTabs('tab-home')
                ]
            },
            2: {
                label: 'Bookings',
                hotspots: [
                    { id: 'payments', label: 'Payment history', to: '6', x: 77, y: 7, w: 10, h: 6 },
                    ...lodgixTabs('tab-booked')
                ]
            },
            3: { label: 'Saved hotels', hotspots: lodgixTabs('tab-saved') },
            4: {
                label: 'Profile',
                hotspots: [
                    { id: 'payment', label: 'Payment', to: '6', x: 3, y: 48.5, w: 94, h: 6 },
                    ...lodgixTabs('tab-profile')
                ]
            },
            5: { label: 'Search', back: '1', hotspots: [back(2, 7, 10, 6)] },
            6: { label: 'Payment history', back: '4', hotspots: [back(2, 7, 10, 6)] }
        },
        demo: ['search', 'back', 'tab-booked', 'payments', 'back', 'tab-saved', 'tab-profile'],
        preview: ['1', '2', '3', '5']
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
    // Personas here are areas of the app; screens that show other people's details,
    // addresses or emails were left out of the screenshot set.
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
        personaLabel: 'Explore the app',
        personas: [
            {
                id: 'tryon', label: 'Try-on', start: '03-shop',
                chips: ['01-onboarding', '02-scan-building', '03-shop', '04-product', '05-tryon', '06-tryons', '07-cart']
            },
            { id: 'ai', label: 'Haze AI', start: '08-search', chips: ['08-search', '09-talk', '10-tryon-linen'] },
            { id: 'chat', label: 'Chat', start: '11-group-menu', chips: ['11-group-menu', '12-poll', '13-chat-menu', '14-pay-for-me'] },
            {
                id: 'wardrobe', label: 'Wardrobe', start: '15-wardrobes',
                chips: ['15-wardrobes', '16-garment-scan', '17-garment-details', '22-extracting', '18-trip-wardrobe', '19-suggestions']
            },
            { id: 'account', label: 'Account', start: '20-account', chips: ['20-account', '23-profile-sharing', '21-teen-approval'] }
        ],
        screens: {
            '01-onboarding': {
                label: 'Body scan intro', persona: 'tryon',
                hotspots: [
                    { id: 'maybe-later', label: 'Maybe later', to: '03-shop', t: 'fade', x: 7, y: 89, w: 41.6, h: 5 },
                    { id: 'start-scan', label: 'Start scan', to: '02-scan-building', x: 52, y: 89, w: 40, h: 5 }
                ]
            },
            '02-scan-building': {
                label: 'Building your body scan', persona: 'tryon',
                hotspots: [{ id: 'next', label: 'Next', to: '03-shop', t: 'fade', x: 6.7, y: 88.9, w: 86.6, h: 4.4 }]
            },
            '03-shop': {
                label: 'Shop', persona: 'tryon',
                hotspots: [
                    { id: 'heritage', label: 'Open Heritage Trail', to: '04-product', x: 50.3, y: 13.8, w: 48.6, h: 44.7 },
                    { id: 'tryons', label: 'Your try-ons', to: '06-tryons', x: 75, y: 7, w: 10, h: 6 },
                    { id: 'chats', label: 'Open a group chat', to: '11-group-menu', x: 87, y: 7, w: 11, h: 6 },
                    ...hazeTabs('tab-shop')
                ]
            },
            '04-product': {
                label: 'Product in 3D', persona: 'tryon', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'try-on', label: 'Try on', to: '05-tryon', x: 62.8, y: 90.7, w: 25.5, h: 4.2 }
                ]
            },
            '05-tryon': {
                label: 'Try-on', persona: 'tryon', back: '04-product',
                hotspots: [
                    back(2, 6.5, 11, 6),
                    { id: 'exit', label: 'Exit try-on', to: 'back', x: 57.2, y: 91.7, w: 27.2, h: 4.1 }
                ]
            },
            '06-tryons': {
                label: 'Your try-ons', persona: 'tryon', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'heritage', label: 'Open the Heritage Trail try-on', to: '05-tryon', x: 52, y: 19.5, w: 45.8, h: 35.2 }
                ]
            },
            '07-cart': { label: 'Cart', persona: 'tryon', hotspots: hazeTabs('tab-cart') },
            '08-search': {
                label: 'Magic search', persona: 'ai', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'talk', label: 'Talk to Haze', to: '09-talk', x: 84, y: 91, w: 13, h: 7 }
                ]
            },
            '09-talk': {
                label: 'Talk to Haze', persona: 'ai', back: '08-search',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'try-on', label: 'Try on the Linen Pant Set', to: '10-tryon-linen', x: 34, y: 84.9, w: 28, h: 4.6 }
                ]
            },
            '10-tryon-linen': {
                label: 'Try-on', persona: 'ai', back: '09-talk',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'exit', label: 'Exit try-on', to: 'back', x: 63.3, y: 91, w: 29.5, h: 4.4 }
                ]
            },
            '11-group-menu': {
                label: 'Group chat tools', persona: 'chat', back: '03-shop',
                hotspots: [
                    { id: 'close', label: 'Close menu', to: 'back', x: 0, y: 0, w: 100, h: 18 },
                    { id: 'poll', label: 'Create an outfit poll', to: '12-poll', t: 'sheet', x: 5, y: 21.8, w: 55, h: 4.6 }
                ]
            },
            '12-poll': {
                label: 'Outfit poll', persona: 'chat', sheetTop: 47, back: '11-group-menu',
                hotspots: [
                    { id: 'scrim', label: 'Close poll', to: 'back', x: 0, y: 0, w: 100, h: 46 },
                    { id: 'close', label: 'Close poll', to: 'back', x: 84, y: 49, w: 9, h: 5 },
                    { id: 'send', label: 'Send poll', to: 'back', x: 9.2, y: 90.7, w: 81.6, h: 4.4 }
                ]
            },
            '13-chat-menu': {
                label: 'Chat tools', persona: 'chat', back: '03-shop',
                hotspots: [
                    { id: 'close', label: 'Close menu', to: 'back', x: 0, y: 0, w: 100, h: 18 },
                    { id: 'pay-for-me', label: 'Request a Pay For Me', to: '14-pay-for-me', x: 5, y: 73.2, w: 55, h: 4.4 }
                ]
            },
            '14-pay-for-me': {
                label: 'Pay For Me', persona: 'chat', back: '13-chat-menu',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'continue', label: 'Send the request', to: 'back', x: 5.8, y: 60.4, w: 88.4, h: 4.5 }
                ]
            },
            '15-wardrobes': {
                label: 'Personal wardrobe', persona: 'wardrobe', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'scan-first', label: 'Scan your first garment', to: '16-garment-scan', x: 26.9, y: 71, w: 46.1, h: 4.1 },
                    { id: 'scan', label: 'Scan clothes', to: '16-garment-scan', x: 62.5, y: 87.6, w: 32.5, h: 4.1 }
                ]
            },
            '16-garment-scan': {
                label: 'Scan a garment', persona: 'wardrobe', back: '15-wardrobes',
                hotspots: [
                    { id: 'close', label: 'Close camera', to: 'back', x: 4, y: 8.6, w: 12, h: 6 },
                    { id: 'shutter', label: 'Take photo', to: '17-garment-details', x: 40, y: 83.5, w: 20, h: 9.5 }
                ]
            },
            '17-garment-details': {
                label: 'Garment details', persona: 'wardrobe', back: '16-garment-scan',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'save', label: 'Save to my own clothes', to: '22-extracting', t: 'tab', x: 5.8, y: 90.7, w: 88.2, h: 4.5 }
                ]
            },
            '22-extracting': {
                label: 'Extracting garment', persona: 'wardrobe', back: '15-wardrobes',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'scan', label: 'Scan clothes', to: '16-garment-scan', x: 62.5, y: 87.5, w: 32.5, h: 4.3 }
                ]
            },
            '18-trip-wardrobe': {
                label: 'Shared wardrobe', persona: 'wardrobe', back: '15-wardrobes',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'suggestions', label: 'Wardrobe suggestions', to: '19-suggestions', t: 'sheet', x: 26.5, y: 16.4, w: 38.5, h: 4 }
                ]
            },
            '19-suggestions': {
                label: 'Suggestions', persona: 'wardrobe', sheetTop: 52, back: '18-trip-wardrobe',
                hotspots: [
                    { id: 'scrim', label: 'Close suggestions', to: 'back', x: 0, y: 0, w: 100, h: 51 },
                    { id: 'close', label: 'Close suggestions', to: 'back', x: 83, y: 53.5, w: 10, h: 6 },
                    { id: 'decline', label: 'Decline suggestion', to: 'back', x: 10.3, y: 85.3, w: 37.8, h: 4.7 },
                    { id: 'accept', label: 'Accept suggestion', to: 'back', x: 51.5, y: 85.3, w: 37.9, h: 4.7 }
                ]
            },
            '20-account': {
                label: 'Account', persona: 'account', back: '03-shop',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'profile-sharing', label: 'Profile sharing', to: '23-profile-sharing', x: 4.4, y: 12.9, w: 89.2, h: 6.3 }
                ]
            },
            '23-profile-sharing': { label: 'Profile sharing', persona: 'account', back: '20-account', hotspots: [back(2, 7, 11, 6)] },
            '21-teen-approval': {
                label: 'Guardian approval', persona: 'account', back: '20-account',
                hotspots: [
                    back(2, 7, 11, 6),
                    { id: 'approve', label: 'Approve', to: 'back', x: 6.8, y: 65.5, w: 86.2, h: 4.4 },
                    { id: 'decline', label: 'Decline', to: 'back', x: 6.8, y: 72, w: 86.2, h: 5 }
                ]
            }
        },
        demo: ['start-scan', 'next', 'heritage', 'try-on', 'exit', { persona: 'ai' }, 'talk', 'try-on', { persona: 'wardrobe' }, 'scan-first', 'shutter', 'save'],
        preview: ['03-shop', '05-tryon', '09-talk', '12-poll']
    };

    // Escra (card preview only) ----------------------------------------------------------
    const escra = {
        name: 'Escra',
        base: 'screenshots/device/escra/',
        start: 'login',
        screens: { login: { label: 'Authenticate identity' } },
        preview: ['login']
    };

    window.APP_PROTOTYPES = { haze, alastudie, hybstock, siwes360, otakuplanner, lodgix, thementrent, spotifyclone, escra };
})();
