function activatePotentialsMode(countryName, countryData) {
    if (!window.map || !countryData || !countryData.potentials) return;

    // 1. Map Transformation
    // Find the country feature in the geojson layer
    let targetLayer = null;
    if (window.countryLayer) {
        window.countryLayer.eachLayer(layer => {
            const name = (layer.feature.properties.ADMIN || layer.feature.properties.NAME || layer.feature.properties.name || layer.feature.properties.NAME_EN || layer.feature.properties.COUNTRY || '').trim().toLowerCase();
            if (name === countryName.toLowerCase()) {
                targetLayer = layer;
            }
        });
    }

    if (targetLayer) {
        // Fit bounds
        window.map.fitBounds(targetLayer.getBounds(), { padding: [40, 40], maxZoom: 6 });

        // Restrict movement
        window.map.setMaxBounds(targetLayer.getBounds().pad(0.1));
        window.map.setMinZoom(4);
        window.map.setMaxZoom(10);

        // Dim other countries
        window.countryLayer.eachLayer(layer => {
            if (layer === targetLayer) {
                layer.setStyle({
                    fillColor: '#2A2A2A',
                    fillOpacity: 0.4,
                    color: '#27AE60',
                    weight: 2
                });
                // Bring to front
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            } else {
                layer.setStyle({
                    fillColor: '#1A1A1A',
                    fillOpacity: 0.85,
                    color: '#333333',
                    weight: 1
                });
            }
        });
    }

    // 2. Collapse Country Panel to 60px strip
    const cPanel = document.getElementById('country-panel');
    if (cPanel) {
        cPanel.classList.add('potentials-collapsed');
        cPanel.innerHTML = `<div class="cp-collapsed-strip" onclick="exitPotentialsMode()"><div class="cp-collapsed-flag">${countryData.flag || '📍'}</div></div>`;
    }

    // 3. Inject Floating Map Status Bar
    const mapZone = document.getElementById('map-zone') || document.getElementById('map');
    if (mapZone) {
        let statusBar = document.createElement('div');
        statusBar.id = 'potentials-status-bars';
        statusBar.className = 'potentials-status-bar';
        statusBar.innerHTML = `
            <div class="pots-status-left">
                <span class="pots-status-name">${countryData.flag || ''} ${countryData.name}</span>
                <span class="pots-status-dot">·</span>
                <span class="pots-status-count">${countryData.potentials.length} potential zones</span>
            </div>
            <span class="pots-status-dot">·</span>
            <div class="pots-status-filters">
                <div class="pots-filter-pill active">All</div>
                <div class="pots-filter-pill">Solar</div>
                <div class="pots-filter-pill">Wind</div>
                <div class="pots-filter-pill">Offshore</div>
                <div class="pots-filter-pill">Biomass</div>
                <div class="pots-filter-pill">Hydro</div>
                <div class="pots-filter-pill">Storage</div>
            </div>
            <button class="pots-exit-btn" onclick="exitPotentialsMode()">← Exit Potentials</button>
        `;
        mapZone.appendChild(statusBar);
    }

    // 4. Render Zone Markers
    window.potentialsMarkers = [];
    countryData.potentials.forEach(zone => {
        if (!zone.lat || !zone.lng) return;

        let confClass = '';
        if (zone.confidence === 'high') confClass = 'conf-high';
        else if (zone.confidence === 'medium') confClass = 'conf-medium';
        else if (zone.confidence === 'low') confClass = 'conf-low';

        let iconStr = 'ti-sun';
        let bgCol = '#F2994A'; // Solar

        if (zone.tech.includes('wind')) {
            iconStr = zone.tech.includes('offshore') ? 'ti-ripple' : 'ti-wind';
            bgCol = zone.tech.includes('offshore') ? '#2F80ED' : 'rgba(47, 128, 237, 0.7)';
        } else if (zone.tech === 'biomass') {
            iconStr = 'ti-leaf';
            bgCol = '#27AE60';
        } else if (zone.tech === 'hydro') {
            iconStr = 'ti-droplet';
            bgCol = '#56CCF2';
        } else if (zone.tech === 'storage') {
            iconStr = 'ti-battery-charging';
            bgCol = '#9B51E0';
        } else if (zone.tech === 'nuclear') {
            iconStr = 'ti-atom';
            bgCol = '#EB5757';
        }

        const htmlStr = `
            <div class="pot-marker-container">
                <div class="pot-marker-ring ${confClass}"></div>
                <div class="pot-marker-inner" style="background: ${bgCol};">
                    <i class="ti ${iconStr}"></i>
                </div>
            </div>
        `;

        const icon = L.divIcon({
            html: htmlStr,
            className: 'potentials-custom-icon',
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const marker = L.marker([zone.lat, zone.lng], { icon: icon }).addTo(window.map);
        marker.on('click', () => {
            console.log("Zone detail click for:", zone.name);
            if (typeof window.openZoneDetails === 'function') {
                window.openZoneDetails(zone);
            }
        });
        window.potentialsMarkers.push(marker);
    });

    // 5. Adjust padding
    if (mapZone && window.map) {
        mapZone.style.paddingRight = '60px'; // Account for collapsed panel
        setTimeout(() => { window.map.invalidateSize(); }, 350);
    }
}

function exitPotentialsMode() {
    // 1. Reset Map Constraints
    if (window.map) {
        window.map.setMaxBounds(null);
        window.map.setMinZoom(2);
        window.map.setMaxZoom(12);
        window.map.setView([20, 10], 2);
    }

    // 2. Erase Markers
    if (window.potentialsMarkers) {
        window.potentialsMarkers.forEach(m => window.map.removeLayer(m));
        window.potentialsMarkers = [];
    }

    // 3. Reset Country Polygons
    if (window.countryLayer) {
        window.countryLayer.eachLayer(layer => {
            layer.setStyle({
                fillColor: '#484848',
                fillOpacity: 0.6,
                color: '#333333',
                weight: 1
            });
        });
    }

    // 4. Remove UI Bar
    const statusBar = document.getElementById('potentials-status-bars');
    if (statusBar) statusBar.remove();

    // 5. Expand Country Panel
    const cPanel = document.getElementById('country-panel');
    if (cPanel) {
        cPanel.classList.remove('potentials-collapsed');
        // Retrieve last open country to re-render
        if (window.lastOpenedCountryName) {
            // Need to expose openCountryPanel from countryPanel.js to global, or trigger a custom event.
            // Assuming openCountryPanel sits on window (we will patch countryPanel.js to attach it).
            if (typeof window.openCountryPanel === 'function') {
                window.openCountryPanel(window.lastOpenedCountryName);
            }
        }
    }
}

// Attach to window for global calls
window.activatePotentialsMode = activatePotentialsMode;
window.exitPotentialsMode = exitPotentialsMode;

// ══════════════════════════════════════════════════
// ZONE DETAILS DRAWER LOGIC
// ══════════════════════════════════════════════════

window.openZoneDetails = function (zone) {
    console.log("Opening Zone Panel for:", zone.name);
    const zPanel = document.getElementById('zone-panel');
    if (!zPanel) return;

    // 1. Populate Header
    document.getElementById('zp-name').textContent = zone.name;
    document.getElementById('zp-region').textContent = zone.region + (zone.status === 'Priority' ? ' · Priority Zone' : '');

    // Clear & populate tags
    const tagsContainer = document.getElementById('zp-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        const capTag = document.createElement('span');
        capTag.className = 'zp-tag';
        capTag.textContent = zone.capacity;

        const confTag = document.createElement('span');
        confTag.className = 'zp-tag conf';
        confTag.textContent = zone.confidence.toUpperCase() + ' CONFIDENCE';

        tagsContainer.appendChild(capTag);
        tagsContainer.appendChild(confTag);
    }

    // Set icon based on primary tech
    const iconBox = document.getElementById('zp-icon-box');
    if (iconBox) {
        let iconStr = 'ti-sun';
        let bgCol = '#F2994A'; // Solar

        if (zone.tech.includes('wind')) {
            iconStr = zone.tech.includes('offshore') ? 'ti-ripple' : 'ti-wind';
            bgCol = zone.tech.includes('offshore') ? '#2F80ED' : 'rgba(47, 128, 237, 0.7)';
        } else if (zone.tech === 'biomass') {
            iconStr = 'ti-leaf';
            bgCol = '#27AE60';
        }

        iconBox.innerHTML = `<i class="ti ${iconStr}"></i>`;
        iconBox.style.color = bgCol;
        iconBox.style.borderColor = bgCol;
    }

    // TAB 2: SITE CONDITIONS
    const paneSite = document.getElementById('zp-pane-site');
    if (paneSite) {
        const windAvg = zone.site.windSpeed || '7.2 m/s';
        const solarAvg = zone.site.ghi || '1,450 kWh/m²';

        // Build month chart
        const isWind = zone.tech.includes('wind');
        const moData = isWind ?
            [8.2, 8.5, 7.8, 6.5, 5.8, 5.4, 5.2, 5.5, 6.8, 7.9, 8.4, 8.6] : // Wind m/s mock
            [45, 65, 110, 150, 180, 195, 190, 165, 120, 85, 50, 40]; // Solar kWh mock

        const maxVal = Math.max(...moData);
        const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
        let barHtml = '';

        moData.forEach((val, i) => {
            const hPct = (val / maxVal) * 100;
            barHtml += `
                <div class="zp-month-col">
                    <div class="zp-month-bar-container">
                        <div class="zp-month-bar" style="height:${hPct}%; background:${isWind ? '#2F80ED' : '#F2994A'};"></div>
                    </div>
                    <div class="zp-month-lbl">${months[i]}</div>
                </div>
            `;
        });

        paneSite.innerHTML = `
            <div class="zp-card">
                <div class="zp-card-title"><i class="ti ti-cloud"></i> Resource Yield</div>
                
                <div class="zp-weather-kpis">
                    <div class="zp-wkpi">
                        <div class="zp-wkpi-lbl">Avg. Wind (100m)</div>
                        <div class="zp-wkpi-val">${windAvg}</div>
                    </div>
                    <div class="zp-wkpi">
                        <div class="zp-wkpi-lbl">GHI (Annual)</div>
                        <div class="zp-wkpi-val">${solarAvg}</div>
                    </div>
                </div>

                <div class="zp-chart-title">Estimated Monthly Yield Profile</div>
                <div class="zp-month-chart">
                    ${barHtml}
                </div>
            </div>

            <div class="zp-card">
                <div class="zp-card-title"><i class="ti ti-mountain"></i> Terrain & Infrastructure</div>
                
                <div class="zp-list-row">
                    <span class="zp-lr-lbl">Topography</span>
                    <span class="zp-lr-val">${zone.site.terrain}</span>
                </div>
                <div class="zp-list-row">
                    <span class="zp-lr-lbl">Land Cover</span>
                    <span class="zp-lr-val">${zone.site.landCover}</span>
                </div>
                <div class="zp-list-row">
                    <span class="zp-lr-lbl">Grid Substation</span>
                    <span class="zp-lr-val">${zone.site.substation}</span>
                </div>
            </div>
        `;
    }

    // TAB 3: ECONOMICS
    const paneEcon = document.getElementById('zp-pane-econ');
    if (paneEcon) {
        paneEcon.innerHTML = `
                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-coin"></i> Investment Scenarios</div>
                    
                    <div class="zp-scenario-tabs">
                        <div class="zp-scen-tab active">500 MW</div>
                        <div class="zp-scen-tab">1 GW</div>
                        <div class="zp-scen-tab">1.5 GW</div>
                    </div>

                    <div class="zp-scen-kpi-row">
                        <div class="zp-sk-box">
                            <div class="zp-sk-lbl">Total CAPEX</div>
                            <div class="zp-sk-val">€ 650M</div>
                        </div>
                        <div class="zp-sk-box">
                            <div class="zp-sk-lbl">Est. IRR</div>
                            <div class="zp-sk-val highlight">8.4%</div>
                        </div>
                        <div class="zp-sk-box">
                            <div class="zp-sk-lbl">Payback</div>
                            <div class="zp-sk-val">12 Yrs</div>
                        </div>
                    </div>

                    <div class="zp-chart-title" style="margin-top:20px;">CAPEX Breakdown</div>
                    
                    <!-- Stacked CSS Bar -->
                    <div class="zp-stacked-bar">
                        <div class="zp-sb-seg" style="width: 55%; background: #2F80ED;" title="Turbines/Panels 55%"></div>
                        <div class="zp-sb-seg" style="width: 20%; background: #F2994A;" title="BoP 20%"></div>
                        <div class="zp-sb-seg" style="width: 15%; background: #27AE60;" title="Grid Conn 15%"></div>
                        <div class="zp-sb-seg" style="width: 10%; background: #888888;" title="Dev/Eng 10%"></div>
                    </div>

                    <div class="zp-legend-grid">
                        <div class="zp-leg-item"><span class="zp-leg-dot" style="background:#2F80ED;"></span> Equip. (55%)</div>
                        <div class="zp-leg-item"><span class="zp-leg-dot" style="background:#F2994A;"></span> BoP (20%)</div>
                        <div class="zp-leg-item"><span class="zp-leg-dot" style="background:#27AE60;"></span> Grid (15%)</div>
                        <div class="zp-leg-item"><span class="zp-leg-dot" style="background:#888888;"></span> Dev. (10%)</div>
                    </div>
                </div>

                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-bolt"></i> Power Price Context</div>
                    
                    <div class="zp-list-row">
                        <span class="zp-lr-lbl">LCOE vs Spot</span>
                        <span class="zp-lr-val" style="color:#27AE60;">-14% (Favorable)</span>
                    </div>
                    <div class="zp-list-row">
                        <span class="zp-lr-lbl">Capture Rate</span>
                        <span class="zp-lr-val">88%</span>
                    </div>
                    <div class="zp-list-row">
                        <span class="zp-lr-lbl">PPA Benchmark</span>
                        <span class="zp-lr-val">42 - 46 €/MWh</span>
                    </div>
                </div>

                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-users"></i> Offtake Options</div>
                    
                    <div class="zp-offtake-tag green">Corporate PPA High Demand</div>
                    <div class="zp-offtake-tag blue">State Merchant Auction Eligible</div>
                </div>
            `;
    }

    // TAB 4: POLICY & PERMITS
    const panePolicy = document.getElementById('zp-pane-policy');
    if (panePolicy) {
        panePolicy.innerHTML = `
                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-building-bank"></i> Support Schemes</div>
                    <div style="font-size:13px; color:white; margin-bottom: 6px;">National CfD Auction Eligible</div>
                    <div style="font-size:12px; color:#888;">Expected strike price range: 45 - 55 €/MWh based on recent clearing prices in this region.</div>
                </div>

                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-clock"></i> Est. Permitting Timeline</div>
                    
                    <div class="zp-timeline">
                        <div class="zp-tl-item done">
                            <div class="zp-tl-dot"><i class="ti ti-check"></i></div>
                            <div class="zp-tl-content">
                                <div class="zp-tl-title">Zoning Approval</div>
                                <div class="zp-tl-desc">Pre-approved under RED III Go-To areas.</div>
                            </div>
                        </div>
                        <div class="zp-tl-item active">
                            <div class="zp-tl-dot"></div>
                            <div class="zp-tl-content">
                                <div class="zp-tl-title">Grid Connection Request</div>
                                <div class="zp-tl-desc">Queue position: 14. Est wait: 8 months.</div>
                            </div>
                        </div>
                        <div class="zp-tl-item">
                            <div class="zp-tl-dot"></div>
                            <div class="zp-tl-content">
                                <div class="zp-tl-title">Environmental Impact Assessment</div>
                                <div class="zp-tl-desc">Fast-tracked due to zone designation.</div>
                            </div>
                        </div>
                        <div class="zp-tl-item">
                            <div class="zp-tl-dot"></div>
                            <div class="zp-tl-content">
                                <div class="zp-tl-title">Building Permit</div>
                                <div class="zp-tl-desc">Local municipality review.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-alert-triangle"></i> Risk Register</div>
                    
                    <div class="zp-risk-tags">
                        <span class="zp-rtag med">Moderate Radar Interference</span>
                        <span class="zp-rtag low">Low Avian Conflict</span>
                        <span class="zp-rtag low">Low Community Opposition</span>
                    </div>
                </div>
            `;
    }

    // TAB 5: ONTOLOGY
    const paneOntology = document.getElementById('zp-pane-ontology');
    if (paneOntology) {
        paneOntology.innerHTML = `
                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-sitemap"></i> Project Components</div>
                    <div style="font-size:13px; color:#888; margin-bottom: 16px;">
                        Standardized BOM requirements based on Kalpana generic configuration algorithms.
                    </div>

                    <!-- Toggle Row -->
                    <div class="zp-ont-row toggle-active">
                        <div class="zp-ont-header">
                            <i class="ti ti-chevron-down"></i>
                            <span>Generation Assets</span>
                            <span class="zp-ont-count">3 Vendors</span>
                        </div>
                        <div class="zp-ont-body">
                            <div class="zp-vendor-item">
                                <div class="zp-ven-name">Vestas V150-4.2 MW</div>
                                <div class="zp-ven-price">€ 950 / kW</div>
                            </div>
                            <div class="zp-vendor-item">
                                <div class="zp-ven-name">Siemens Gamesa SG 4.5-145</div>
                                <div class="zp-ven-price">€ 920 / kW</div>
                            </div>
                            <div class="zp-vendor-item">
                                <div class="zp-ven-name">Enercon E-138 EP3</div>
                                <div class="zp-ven-price">€ 980 / kW</div>
                            </div>
                        </div>
                    </div>

                    <!-- Toggle Row -->
                    <div class="zp-ont-row">
                        <div class="zp-ont-header">
                            <i class="ti ti-chevron-right"></i>
                            <span>Balance of Plant (Civil)</span>
                            <span class="zp-ont-count">12 Vendors</span>
                        </div>
                    </div>

                    <!-- Toggle Row -->
                    <div class="zp-ont-row">
                        <div class="zp-ont-header">
                            <i class="ti ti-chevron-right"></i>
                            <span>Grid Integration</span>
                            <span class="zp-ont-count">4 Vendors</span>
                        </div>
                    </div>
                </div>
            `;
    }

    // TAB 6: INTELLIGENCE
    const paneIntel = document.getElementById('zp-pane-intel');
    if (paneIntel) {
        paneIntel.innerHTML = `
                <div class="zp-card" style="border-color:#2F80ED; background: rgba(47, 128, 237, 0.05);">
                    <div class="zp-card-title" style="color:#2F80ED;"><i class="ti ti-brain"></i> AI Assessment</div>
                    <div style="font-size:13px; color:white; line-height: 1.6; margin-bottom: 16px;">
                        Kalpana considers this zone highly viable for near-term development. The overlapping parameters of excellent resource yield and pre-cleared zoning significantly outweigh the moderate radar constraints.
                    </div>
                    
                    <div class="zp-action-btn">
                        <i class="ti ti-download"></i> Export Feasibility Report
                    </div>
                </div>

                <div class="zp-card">
                    <div class="zp-card-title"><i class="ti ti-news"></i> Correlated Signals</div>
                    
                    <div class="zp-news-signal">
                        <div class="zp-ns-dot"></div>
                        <div class="zp-ns-title">Regional TSO announces €5B grid expansion prioritizing Northern corridor.</div>
                        <div class="zp-ns-meta">Reuters · 2 days ago</div>
                    </div>
                    <div class="zp-news-signal">
                        <div class="zp-ns-dot"></div>
                        <div class="zp-ns-title">Ministry of Environment streamlines approvals for brownfield hybrid sites.</div>
                        <div class="zp-ns-meta">Local Press · 1 week ago</div>
                    </div>
                </div>
            `;
    }


    // 3. Attach Interactions

    // Ontology Toggles
    const ontHeaders = paneOntology ? paneOntology.querySelectorAll('.zp-ont-header') : [];
    ontHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const row = this.closest('.zp-ont-row');
            if (row.classList.contains('toggle-active')) {
                row.classList.remove('toggle-active');
                this.querySelector('i').className = 'ti ti-chevron-right';
            } else {
                row.classList.add('toggle-active');
                this.querySelector('i').className = 'ti ti-chevron-down';
            }
        });
    });

    // 4. Open Panel
    zPanel.classList.add('open');
};

window.closeZoneDetails = function () {
    const zPanel = document.getElementById('zone-panel');
    if (zPanel) {
        zPanel.classList.remove('open');
    }
};

// Setup Tab Switching Logic for Zone Panel
document.addEventListener('DOMContentLoaded', () => {
    const zoneTabs = document.querySelectorAll('#zp-tabs .zp-tab');
    if (zoneTabs.length > 0) {
        zoneTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active from all tabs & panes
                document.querySelectorAll('#zp-tabs .zp-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('#zp-panes .zp-pane').forEach(p => p.classList.remove('active'));

                // Add active to clicked system
                this.classList.add('active');
                const targetPane = document.getElementById('zp-pane-' + this.dataset.tab);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }
});
