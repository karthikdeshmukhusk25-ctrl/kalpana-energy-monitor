/* ═══════════════════════════════════════════════════
   KALPANA — WIDGET LOGIC
   scripts/widgets.js
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';
    try {

        /* ════════════════════════════════════════════════
           HELPERS
           ════════════════════════════════════════════════ */

        /**
         * Draw a mini sparkline on a canvas element.
         * @param {HTMLCanvasElement} canvas
         * @param {number[]} data
         * @param {object} opts
         */
        function drawSparkline(canvas, data, opts = {}) {
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.offsetWidth || canvas.width;
            const h = canvas.offsetHeight || canvas.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);

            const lineColor = opts.lineColor || '#2F80ED';
            const fillColor = opts.fillColor || 'rgba(47,128,237,0.1)';
            const strokeW = opts.strokeWidth || 1.5;

            const min = Math.min(...data);
            const max = Math.max(...data);
            const range = max - min || 1;
            const pad = 1;

            const pts = data.map((v, i) => ({
                x: pad + (i / (data.length - 1)) * (w - pad * 2),
                y: pad + (1 - (v - min) / range) * (h - pad * 2)
            }));

            ctx.clearRect(0, 0, w, h);

            // Fill
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
            ctx.lineTo(pts[pts.length - 1].x, h);
            ctx.lineTo(pts[0].x, h);
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();

            // Line
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = strokeW;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.stroke();
        }


        /* ════════════════════════════════════════════════
           WIDGET 1 — LIVE NEWS
           ════════════════════════════════════════════════ */

        const CHANNELS = {
            BLOOMBERG: 'UCnUYZLuoy1rq1aVMwx4aTzw',
            SKYNEWS: 'UCoMdktPbSTixAyNGwb-UYkQ',
            EURONEWS: 'UCg2VNjgO3IzPHJO5vWBaZEw',
            DW: 'UCknLrEdhRCp1aegoMqRaCZg',
            FRANCE24: 'UCQfwfsi5VrQ8yKZ-UWmAEFg',
            ALJAZEERA: 'UCNye-wNBqNL5ZzHSJdba7Xg',
            'REPUBLIC BHARAT': 'UCkG7a_Zn3NpnYuQgu1a8kjQ',
            ALARABIYA: 'UCpvgDd8gg6a40lEqJWk53HA'
        };

        function initLiveNews() {
            const pills = document.querySelectorAll('.channel-pill');
            const iframe = document.getElementById('news-iframe');
            const volBtn = document.getElementById('news-volume-btn');
            if (!iframe) return;

            let muted = true; // start muted

            pills.forEach(btn => {
                btn.addEventListener('click', function () {
                    pills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    const ch = this.dataset.channel;
                    const id = CHANNELS[ch];
                    if (id) {
                        iframe.src = `https://www.youtube.com/embed/live_stream?channel=${id}&autoplay=1&mute=${muted ? 1 : 0}`;
                    }
                });
            });

            if (volBtn) {
                volBtn.addEventListener('click', function () {
                    muted = !muted;
                    const icon = this.querySelector('i');
                    if (muted) {
                        icon.className = 'ti ti-volume-off';
                        // re-embed with mute=1
                        iframe.src = iframe.src.replace(/(&?mute=\d)/g, '') + '&mute=1';
                    } else {
                        icon.className = 'ti ti-volume';
                        iframe.src = iframe.src.replace(/(&?mute=\d)/g, '') + '&mute=0';
                    }
                });
            }

            // Set default channel
            const defaultPill = document.querySelector('.channel-pill[data-channel="BLOOMBERG"]');
            if (defaultPill) defaultPill.click();
        }


        /* ════════════════════════════════════════════════
           WIDGET 2 — POWER & GAS PRICES
           ════════════════════════════════════════════════ */

        const PRICE_SPARKLINE_DATA = {
            'dk1': [43.2, 44.8, 43.5, 44.1, 43.8, 44.5, 44.45],
            'ttf': [31.5, 32.0, 31.8, 32.2, 32.1, 32.4, 32.48],
            'carbon': [69.5, 70.1, 69.8, 70.3, 70.2, 70.5, 70.57],
            'de': [92.3, 91.8, 91.5, 91.2, 91.0, 91.3, 91.20],
        };

        function initPriceWidget() {
            const timePills = document.querySelectorAll('#widget-prices .time-pill');
            const priceRows = document.querySelectorAll('.price-row');
            let activeRow = null;

            // Time pill toggle
            timePills.forEach(pill => {
                pill.addEventListener('click', function () {
                    timePills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Row click → inline sparkline
            priceRows.forEach(row => {
                row.addEventListener('click', function () {
                    const key = this.dataset.key;
                    const nextEl = this.nextElementSibling;

                    if (activeRow === this) {
                        // collapse
                        if (nextEl && nextEl.classList.contains('price-sparkline-row')) {
                            nextEl.remove();
                        }
                        activeRow = null;
                        return;
                    }

                    // Remove previous sparkline if any
                    if (activeRow) {
                        const prev = activeRow.nextElementSibling;
                        if (prev && prev.classList.contains('price-sparkline-row')) {
                            prev.remove();
                        }
                    }

                    activeRow = this;

                    const sparkRow = document.createElement('div');
                    sparkRow.className = 'price-sparkline-row';
                    const canvas = document.createElement('canvas');
                    canvas.style.height = '60px';
                    sparkRow.appendChild(canvas);
                    this.after(sparkRow);

                    requestAnimationFrame(() => {
                        drawSparkline(canvas, PRICE_SPARKLINE_DATA[key] || [40, 42, 41, 43, 42, 44, 43], {
                            lineColor: '#2F80ED',
                            fillColor: 'rgba(47,128,237,0.1)',
                            strokeWidth: 2
                        });
                    });
                });
            });
        }


        /* ════════════════════════════════════════════════
           WIDGET 3 — ENERGY EQUITIES
           ════════════════════════════════════════════════ */

        const INDEX_CHART_DATA = [1012, 1008, 1015, 1003, 997, 993, 989];

        const STOCK_SPARK_DATA = {
            orsted: [153, 151, 149, 150, 151, 150.5, 150.85],
            vestas: [122, 126, 128, 129, 130, 131, 131.30],
            rwe: [35.1, 34.8, 34.5, 34.3, 34.2, 34.3, 34.20],
            enel: [7.38, 7.41, 7.42, 7.44, 7.43, 7.44, 7.45],
            equinor: [29.3, 29.1, 29.0, 28.9, 28.95, 28.9, 28.90],
        };

        const INDEX_OPTIONS = [
            { name: 'S&P Global Clean Energy', ticker: 'SPGTCLEN', selected: true },
            { name: 'MSCI World Energy', ticker: 'MSCI-ENE', selected: false },
            { name: 'NASDAQ Clean Edge', ticker: 'CELS', selected: false },
            { name: 'Solactive Renewable', ticker: 'SOLRENE', selected: false },
        ];

        function initEquitiesWidget() {
            // Tabs
            const tabBtns = document.querySelectorAll('#widget-equities .tab-btn:not(.tab-btn-add)');
            const addBtn = document.getElementById('eq-add-btn');

            function switchEqTab(tabId) {
                tabBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('#widget-equities .tab-pane').forEach(p => p.classList.remove('active'));
                const activeBtn = document.querySelector(`#widget-equities .tab-btn[data-tab="${tabId}"]`);
                const pane = document.getElementById(`eq-tab-${tabId}`);
                if (activeBtn) activeBtn.classList.add('active');
                if (pane) pane.classList.add('active');
            }

            tabBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    switchEqTab(this.dataset.tab);
                });
            });

            switchEqTab('index');

            // Draw index chart
            requestAnimationFrame(() => {
                const indexCanvas = document.getElementById('index-chart-canvas');
                if (indexCanvas) {
                    drawSparkline(indexCanvas, INDEX_CHART_DATA, {
                        lineColor: '#2F80ED',
                        fillColor: 'rgba(47,128,237,0.08)',
                        strokeWidth: 2
                    });
                }

                // Draw stock sparklines
                document.querySelectorAll('.stock-sparkline canvas').forEach(canvas => {
                    const key = canvas.dataset.key;
                    const data = STOCK_SPARK_DATA[key] || [1, 1.2, 1.1, 1.3, 1.2, 1.4, 1.3];
                    const isUp = data[data.length - 1] >= data[0];
                    drawSparkline(canvas, data, {
                        lineColor: isUp ? '#27AE60' : '#EB5757',
                        fillColor: isUp ? 'rgba(39,174,96,0.1)' : 'rgba(235,87,87,0.1)',
                        strokeWidth: 1.5
                    });
                });
            });

            // Index Change dropdown
            const indexChangeBtn = document.getElementById('index-change-btn');
            const indexDropdown = document.getElementById('index-change-dropdown');

            function closeIndexDropdown() {
                if (indexDropdown) indexDropdown.style.display = 'none';
            }

            if (indexChangeBtn && indexDropdown) {
                indexChangeBtn.classList.add('index-change-btn');

                // Move dropdown into the relative parent instead of keeping it as a sibling
                const parent = indexChangeBtn.parentElement;
                if (parent) {
                    parent.style.position = 'relative';
                    if (indexDropdown.parentElement !== parent) {
                        parent.appendChild(indexDropdown);
                    }
                }

                indexDropdown.className = 'index-dropdown'; // Apply requested CSS class
                indexDropdown.style.display = 'none'; // Default hidden

                indexChangeBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const isHidden = indexDropdown.style.display === 'none';
                    if (typeof closeAllEqPopups === 'function') closeAllEqPopups();
                    indexDropdown.style.display = isHidden ? 'block' : 'none';
                });

                function populateDropdown() {
                    indexDropdown.innerHTML = '';
                    INDEX_OPTIONS.forEach((opt, i) => {
                        const row = document.createElement('div');
                        row.className = 'index-dropdown-row';

                        const top = document.createElement('div');
                        top.className = 'index-dropdown-row-top';
                        const nameSpan = document.createElement('span');
                        nameSpan.textContent = opt.name;
                        top.appendChild(nameSpan);

                        if (opt.selected) {
                            const check = document.createElement('span');
                            check.className = 'index-dropdown-row-checkmark';
                            check.textContent = '✓';
                            top.appendChild(check);
                        }

                        const btm = document.createElement('div');
                        btm.className = 'index-dropdown-row-ticker';
                        btm.textContent = opt.ticker;

                        row.appendChild(top);
                        row.appendChild(btm);

                        row.addEventListener('click', function () {
                            INDEX_OPTIONS.forEach((o, j) => o.selected = (j === i));
                            const nameEl = document.getElementById('index-display-name');
                            if (nameEl) nameEl.textContent = opt.name.toUpperCase() + ' INDEX';
                            closeIndexDropdown();
                            populateDropdown();
                        });
                        indexDropdown.appendChild(row);
                    });

                    const footer = document.createElement('div');
                    footer.className = 'index-dropdown-footer';
                    footer.textContent = 'Switching updates chart and value above';
                    indexDropdown.appendChild(footer);
                }

                populateDropdown();

                document.addEventListener('click', function (e) {
                    if (!e.target.closest('.index-change-btn') && !e.target.closest('.index-dropdown')) {
                        closeIndexDropdown();
                    }
                });
            }

            // Watchlist add popup
            if (addBtn) {
                addBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const pop = document.getElementById('watchlist-add-popup');
                    if (!pop) return;
                    const isOpen = pop.classList.contains('open');
                    closeAllEqPopups();
                    if (!isOpen) pop.classList.add('open');
                });
            }

            // Close popup close buttons
            document.querySelectorAll('.eq-popup-close').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    closeAllEqPopups();
                });
            });

            // Close on outside click
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.eq-popup') && !e.target.closest('#eq-add-btn') && !e.target.closest('#index-change-btn')) {
                    closeAllEqPopups();
                }
            });

            // Radio selection in watchlist popup
            document.querySelectorAll('.eq-suggestion-row').forEach(row => {
                row.addEventListener('click', function () {
                    document.querySelectorAll('.eq-radio').forEach(r => r.classList.remove('selected'));
                    this.querySelector('.eq-radio').classList.add('selected');
                });
            });
        }

        function initEquitiesDropdown() {
            const indexDropdown = document.getElementById('index-change-dropdown');
            if (!indexDropdown) return;
            const rows = indexDropdown.querySelectorAll('.index-option-row');
            rows.forEach((row, i) => {
                const checkEl = row.querySelector('.index-option-check');
                if (checkEl) checkEl.textContent = INDEX_OPTIONS[i].selected ? '✓' : ' ';
            });
        }

        function closeAllEqPopups() {
            document.querySelectorAll('.eq-popup').forEach(p => p.classList.remove('open'));
        }


        /* ════════════════════════════════════════════════
           WIDGET 4 — NEWS & MEDIA
           ════════════════════════════════════════════════ */

        function initNewsFeed() {
            // Tab switch (News / Media)
            const tabBtns = document.querySelectorAll('#widget-news .tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    const tabId = this.dataset.tab;
                    document.querySelectorAll('#widget-news .tab-pane').forEach(p => p.classList.remove('active'));
                    const pane = document.getElementById(`news-tab-${tabId}`);
                    if (pane) pane.classList.add('active');
                });
            });

            // Filter pills
            const filterPills = document.querySelectorAll('.filter-pill');
            filterPills.forEach(pill => {
                pill.addEventListener('click', function () {
                    filterPills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    // In a real app we'd filter the news list here
                });
            });

            // News item click → open link in new tab
            document.querySelectorAll('.news-item').forEach(item => {
                item.addEventListener('click', function () {
                    // placeholder — open # 
                    window.open('#', '_blank');
                });
            });
        }




        /* ════════════════════════════════════════════════
           WIDGET 5 — AUCTIONS & TENDERS
           ════════════════════════════════════════════════ */
        function initAuctions() {
            // Filter pills logic
            const pills = document.querySelectorAll('#widget-auctions .filter-pill');
            pills.forEach(pill => {
                pill.addEventListener('click', function () {
                    pills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Click to show tooltip logic
            const rows = document.querySelectorAll('.auction-row');
            rows.forEach(row => {
                row.addEventListener('click', function (e) {
                    // If clicking inside the tooltip, do nothing
                    if (e.target.closest('.auction-tooltip')) return;

                    // Toggle open class
                    const isOpen = this.classList.contains('open');

                    // Close all others first
                    document.querySelectorAll('.auction-row').forEach(r => r.classList.remove('open'));

                    if (!isOpen) {
                        this.classList.add('open');
                    }
                });
            });

            // Hide tooltip on outside click
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.auction-row')) {
                    document.querySelectorAll('.auction-row').forEach(r => r.classList.remove('open'));
                }
            });
        }

        /* ════════════════════════════════════════════════
           WIDGET 8 — RISK & ALERTS
           ════════════════════════════════════════════════ */
        function initRisks() {
            const headers = document.querySelectorAll('.risk-item-header');
            headers.forEach(header => {
                header.addEventListener('click', function () {
                    const item = this.closest('.risk-item');
                    item.classList.toggle('open');
                });

                // Map hover placeholder
                header.addEventListener('mouseenter', function () {
                    const country = this.closest('.risk-item').dataset.country;
                    // console.log('Highlight map zone:', country);
                });
                header.addEventListener('mouseleave', function () {
                    const country = this.closest('.risk-item').dataset.country;
                    // console.log('Remove map highlight:', country);
                });
            });

            const filterBtns = document.querySelectorAll('.risk-filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    this.classList.toggle('active');
                    // Normally we would filter the list here based on data-type
                });
            });
        }


        /* ════════════════════════════════════════════════
           INIT ALL WIDGETS
           ════════════════════════════════════════════════ */

        function initAll() {
            initLiveNews();
            initPriceWidget();
            initEquitiesWidget();
            initNewsFeed();
            initAuctions();
            initRisks();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    } catch (e) {
        console.error('Widgets init failed:', e);
    }
})();
