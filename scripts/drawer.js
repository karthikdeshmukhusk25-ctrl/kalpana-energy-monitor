/* ═══════════════════════════════════════════════════
   KALPANA — DRAWER LOGIC
   scripts/drawer.js
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    try {

        const drawer = document.getElementById('analytics-drawer');
        const handle = document.getElementById('drawer-handle');
        const mapZone = document.getElementById('map-zone');

        console.log('Drawer element:', drawer);

        if (!drawer || !handle) return;

        let isOpen = false;

        /* Drawer open height = window minus header (52px) minus map minimum (200px) */
        const HEADER_H = 52;   // px
        const HANDLE_H = 48;   // px — collapsed drawer strip
        const MAP_MIN_H = 200;  // px — minimum map height when drawer is open

        /**
         * Move #map-zone's bottom edge and trigger Leaflet resize if available.
         * @param {number} bottomPx — new bottom value for #map-zone (in px)
         */
        function syncMapZone(bottomVal) {
            if (mapZone) {
                mapZone.style.bottom = bottomVal;
            }

            // Tell Leaflet to recalculate its viewport
            if (window.leafletMap && typeof window.leafletMap.invalidateSize === 'function') {
                setTimeout(() => window.leafletMap.invalidateSize(), 420); // after CSS transition
            }
        }

        function openDrawer() {
            isOpen = true;
            drawer.classList.add('open');
            syncMapZone('60vh');
        }

        function closeDrawer() {
            isOpen = false;
            drawer.classList.remove('open');
            syncMapZone('48px');
        }

        function toggleDrawer() {
            isOpen ? closeDrawer() : openDrawer();
        }

        handle.addEventListener('click', toggleDrawer);

        /* ── Scroll-triggered: scrolling page body opens/closes ── */
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', function () {
            const currentY = window.scrollY;
            if (currentY > 60 && !isOpen) {
                openDrawer();
            } else if (currentY <= 10 && isOpen) {
                closeDrawer();
            }
            lastScrollY = currentY;
        }, { passive: true });

        /* ── On window resize, re-sync bottom so map stays correct ── */
        window.addEventListener('resize', function () {
            if (isOpen) {
                const openDrawerH = window.innerHeight - HEADER_H;
                syncMapZone(Math.max(openDrawerH, HANDLE_H));
            } else {
                syncMapZone(HANDLE_H);
            }
        });

        /* ── Expose globally so widgets.js and map.js can call ── */
        window.drawerAPI = {
            open: openDrawer,
            close: closeDrawer,
            toggle: toggleDrawer,
        };
    } catch (e) {
        console.error('Drawer init failed:', e);
    }
})();
