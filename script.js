/* ═══════════════════════════════════════════════
   KALPANA HEADER — script.js
   Vanilla JavaScript only · No frameworks
   ═══════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────
       1. TIMELINE PILLS  (1h / 12h / 1d / 1w)
          Clicking sets the active state (blue)
    ───────────────────────────────────────────── */
    const timelineSelector = document.getElementById('timeline-selector');
    if (timelineSelector) {
        timelineSelector.addEventListener('click', (e) => {
            const pill = e.target.closest('.timeline-pill');
            if (!pill) return;
            // Deactivate all, activate clicked
            timelineSelector.querySelectorAll('.timeline-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    }

    /* ─────────────────────────────────────────────
       3. REGION DROPDOWN
    ───────────────────────────────────────────── */
    setupDropdown({
        wrapperId: 'region-wrapper',
        triggerId: 'region-trigger',
        menuId: 'region-menu',
        labelId: 'region-label',
    });

    /* ─────────────────────────────────────────────
       4. DATA SOURCES DROPDOWN
    ───────────────────────────────────────────── */
    setupDropdown({
        wrapperId: 'datasources-wrapper',
        triggerId: 'datasources-trigger',
        menuId: 'datasources-menu',
    });

    /* ─────────────────────────────────────────────
       5. PANELS DROPDOWN
    ───────────────────────────────────────────── */
    setupDropdown({
        wrapperId: 'panels-wrapper',
        triggerId: 'panels-trigger',
        menuId: 'panels-menu',
    });

    /**
     * Generic dropdown setup.
     * @param {{ wrapperId:string, triggerId:string, menuId:string, labelId?:string }} opts
     */
    function setupDropdown({ wrapperId, triggerId, menuId, labelId }) {
        const wrapper = document.getElementById(wrapperId);
        const trigger = document.getElementById(triggerId);
        const menu = document.getElementById(menuId);
        const label = labelId ? document.getElementById(labelId) : null;
        if (!wrapper || !trigger || !menu) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = wrapper.classList.toggle('open');
            trigger.setAttribute('aria-expanded', String(isOpen));
            closeOtherDropdowns(wrapperId);
        });

        menu.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (!item) return;
            // Update active item
            menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // Update trigger label if provided
            if (label) label.textContent = item.dataset.value || item.textContent.trim();
            closeDropdown(wrapper, trigger);
        });
    }

    function closeDropdown(wrapper, trigger) {
        wrapper.classList.remove('open');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }

    function closeOtherDropdowns(exceptId) {
        document.querySelectorAll('.dropdown-wrapper.open').forEach(w => {
            if (w.id !== exceptId) {
                w.classList.remove('open');
                const t = w.querySelector('.dropdown-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ─────────────────────────────────────────────
       6. SEARCH BAR
          Border turns #2F80ED on focus
    ───────────────────────────────────────────── */
    const searchInput = document.getElementById('search-input');
    const searchWrapper = document.querySelector('.search-bar-wrapper');
    const searchClear = document.getElementById('search-clear');

    if (searchInput && searchWrapper) {
        searchInput.addEventListener('focus', () => searchWrapper.classList.add('focused'));
        searchInput.addEventListener('blur', () => searchWrapper.classList.remove('focused'));
        searchInput.addEventListener('input', () => {
            if (searchClear) searchClear.style.opacity = searchInput.value ? '1' : '0.45';
        });
    }
    if (searchClear && searchInput) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            searchClear.style.opacity = '0.45';
        });
    }

    /* ─────────────────────────────────────────────
       7. ENERCON PILL
          Static green + clicking shows dropdown
    ───────────────────────────────────────────── */
    const enerconPill = document.getElementById('enercon-pill');
    const enerconDropdown = document.getElementById('enercon-dropdown');

    if (enerconPill && enerconDropdown) {
        enerconPill.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = enerconDropdown.hidden;
            enerconDropdown.hidden = !isHidden;
            enerconPill.setAttribute('aria-expanded', String(isHidden));
            closeAllPanels(enerconDropdown);
        });
    }

    /* ─────────────────────────────────────────────
       8. REFRESH / UPDATE BUTTON
          Spins on click
    ───────────────────────────────────────────── */
    const btnUpdate = document.getElementById('btn-update');
    const refreshIcon = document.getElementById('refresh-icon');

    if (btnUpdate && refreshIcon) {
        btnUpdate.addEventListener('click', () => {
            // Spin the icon
            refreshIcon.classList.add('spinning');

            // Stop spin after 1 cycle (700 ms)
            setTimeout(() => {
                refreshIcon.classList.remove('spinning');
            }, 700);
        });
    }

    /* ─────────────────────────────────────────────
       9. THEME TOGGLE
          Dark ↔ Light — swaps data-theme on <html>
    ───────────────────────────────────────────── */
    const btnLight = document.getElementById('btn-light');
    const btnDark = document.getElementById('btn-dark');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);

        if (btnLight) btnLight.classList.toggle('active', theme === 'light');
        if (btnDark) btnDark.classList.toggle('active', theme === 'dark');
    }

    if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
    if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));

    // Initialise to dark
    setTheme('dark');

    /* ─────────────────────────────────────────────
       10. ALERTS BELL
           Shows 2 hardcoded alerts in panel
    ───────────────────────────────────────────── */
    const alertsBtn = document.getElementById('alerts-btn');
    const alertsPanel = document.getElementById('alerts-panel');
    const alertBadge = document.getElementById('alert-badge');
    const dismissBtn = document.querySelector('.alerts-dismiss');

    if (alertsBtn && alertsPanel) {
        alertsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = alertsPanel.hidden;
            alertsPanel.hidden = !isHidden;
            alertsBtn.setAttribute('aria-expanded', String(isHidden));

            // Pulse the badge when opening
            if (isHidden && alertBadge) {
                alertBadge.classList.remove('pulse');
                void alertBadge.offsetWidth; // force reflow
                alertBadge.classList.add('pulse');
            }

            closeAllPanels(alertsPanel);
        });
    }

    if (dismissBtn && alertsPanel && alertBadge) {
        dismissBtn.addEventListener('click', () => {
            alertsPanel.hidden = true;
            alertBadge.textContent = '0';
            alertBadge.style.opacity = '0';
            if (alertsBtn) alertsBtn.setAttribute('aria-expanded', 'false');
        });
    }

    /* ─────────────────────────────────────────────
       GLOBAL CLICK → close all open panels
    ───────────────────────────────────────────── */
    document.addEventListener('click', () => {
        // Close dropdowns
        document.querySelectorAll('.dropdown-wrapper.open').forEach(w => {
            w.classList.remove('open');
            const t = w.querySelector('.dropdown-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
        // Close alerts panel
        if (alertsPanel && !alertsPanel.hidden) {
            alertsPanel.hidden = true;
            if (alertsBtn) alertsBtn.setAttribute('aria-expanded', 'false');
        }
        // Close enercon dropdown
        if (enerconDropdown && !enerconDropdown.hidden) {
            enerconDropdown.hidden = true;
            if (enerconPill) enerconPill.setAttribute('aria-expanded', 'false');
        }
    });

    /**
     * Close all other open panels except the provided one.
     */
    function closeAllPanels(exceptPanel) {
        const panels = [alertsPanel, enerconDropdown].filter(p => p && p !== exceptPanel);
        panels.forEach(p => { if (!p.hidden) p.hidden = true; });
    }

    // Prevent clicks inside panels from bubbling to the global handler
    [alertsPanel, enerconDropdown].forEach(p => {
        if (p) p.addEventListener('click', (e) => e.stopPropagation());
    });

    // Bottom strip scroll → map shrinks
    const bottomStrip = document.querySelector('.bottom-strip');
    const mapZone = document.querySelector('.map-zone');

    bottomStrip.addEventListener('scroll', () => {
        const scrolled = bottomStrip.scrollTop;
        const newHeight = Math.max(200, window.innerHeight * 0.6 - scrolled * 0.5);
        mapZone.style.height = newHeight + 'px';
    });

});
