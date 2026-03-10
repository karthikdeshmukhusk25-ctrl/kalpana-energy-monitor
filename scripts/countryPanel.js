// Remove old panel if it exists
const oldPanel = document.getElementById('country-panel');
if (oldPanel) oldPanel.remove();

const panel = document.createElement('div');
panel.id = 'country-panel';
panel.className = 'country-panel';

const tabs = ['summary', 'infra', 'policy', 'market', 'risk', 'pipeline', 'weather', 'intel', 'potentials'];
const tabLabels = ['Summary', 'Infrastructure', 'Policy & Gov', 'Market & Finance', 'Risk & Alerts', 'Pipeline', 'Weather', 'Intelligence', 'Potentials'];

// Utility to generate HTML for tabs and panes
let tabsHtml = '';
let panesHtml = '';
tabs.forEach((tab, i) => {
    tabsHtml += `<div class="cp-tab ${i === 0 ? 'active' : ''}" data-tab="${tab}">${tabLabels[i]}</div>`;
    panesHtml += `<div class="cp-pane ${i === 0 ? 'active' : ''}" id="cp-pane-${tab}"></div>`;
});

panel.innerHTML = `
  <div class="cp-header-section">
    <button class="cp-close-btn" id="cp-close-btn"><i class="ti ti-x"></i></button>
    <div class="cp-breadcrumb">COUNTRY PROFILES ›</div>
    <div class="cp-identity">
      <div class="cp-flag" id="cp-flag"></div>
      <div class="cp-name-group">
        <h2 class="cp-name" id="cp-name"></h2>
        <div class="cp-tags" id="cp-tags"></div>
      </div>
    </div>
    <div class="cp-enercon-strip">
      <span class="cp-enercon-label">ENERCON</span>
      <div class="cp-enercon-box" id="cp-e1">1</div>
      <div class="cp-enercon-box" id="cp-e2">2</div>
      <div class="cp-enercon-box" id="cp-e3">3</div>
      <div class="cp-enercon-box" id="cp-e4">4</div>
      <div class="cp-enercon-box" id="cp-e5">5</div>
    </div>
  </div>
  <div class="cp-tab-bar" id="cp-tabs">
    ${tabsHtml}
  </div>
  <div class="cp-content-area" id="cp-panes">
    ${panesHtml}
  </div>
`;

document.body.appendChild(panel);

// Tab switching logic
document.querySelectorAll('#cp-tabs .cp-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('#cp-tabs .cp-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#cp-panes .cp-pane').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('cp-pane-' + this.dataset.tab).classList.add('active');
    });
});

window.closeCountryPanel = function () {
    panel.classList.remove('open');
    if (window.map) {
        const mapZone = document.getElementById('map-zone') || document.getElementById('map');
        if (mapZone) {
            mapZone.style.paddingRight = '0px';
        }
        setTimeout(() => { map.invalidateSize(); }, 350);
    }
};

document.getElementById('cp-close-btn').addEventListener('click', window.closeCountryPanel);

function getCountryData(countryName) {
    if (!window.COUNTRIES_DATA) return null;
    const name = countryName.trim().toLowerCase();

    // COUNTRIES_DATA is an object, so we convert to values array to find
    const countriesDataArray = Object.values(window.COUNTRIES_DATA);
    return countriesDataArray.find(c =>
        c.name.trim().toLowerCase() === name
    ) || null;
}

window.openCountryPanel = function (countryName) {
    console.log("Opening panel for: " + countryName);
    window.lastOpenedCountryName = countryName;
    const data = getCountryData(countryName);

    document.getElementById('cp-flag').textContent = data ? data.flag : '🌐';
    document.getElementById('cp-name').textContent = data ? data.name : countryName;

    const tagsContainer = document.getElementById('cp-tags');
    tagsContainer.innerHTML = '';
    const tags = data && data.tags ? data.tags : ['Demo Tag'];
    tags.forEach(t => {
        tagsContainer.innerHTML += `<span class="cp-tag">${t}</span>`;
    });

    const level = data && data.enerconLevel ? data.enerconLevel : 3;
    [1, 2, 3, 4, 5].forEach(num => {
        const box = document.getElementById('cp-e' + num);
        box.className = 'cp-enercon-box' + (num === level ? ` active-${num}` : '');
    });

    // Populate Panes
    if (!data) {
        const emptyHtml = `
      <div style="padding: 20px; text-align: center;">
        <div style="color: #888888; font-size: 12px; font-style: italic; margin-bottom: 8px;">No data available for ${countryName}</div>
        <div style="color: #444444; font-size: 11px;">Data coming soon &middot; contribute at github.com/kalpana-energy</div>
      </div>
    `;
        tabs.forEach(tab => {
            document.getElementById(`cp-pane-${tab}`).innerHTML = emptyHtml;
        });
    } else {
        // TAB 1 - SUMMARY
        const res = data.installedRES || 'N/A';
        const share = data.renewablesShare || 'N/A';
        const grade = data.investmentGrade || 'N/A';

        let techHtml = '';
        const techs = data.technologies || [
            { name: 'Offshore Wind', pct: 48, color: '#2F80ED' },
            { name: 'Onshore Wind', pct: 31, color: 'rgba(47, 128, 237, 0.7)' },
            { name: 'Solar PV', pct: 12, color: '#F2994A' },
            { name: 'Other', pct: 9, color: '#888888' }
        ];
        techs.forEach(t => {
            let c = t.color || '#2F80ED';
            if (t.name === 'Solar PV') c = '#F2994A';
            if (t.name === 'Other') c = '#888888';
            techHtml += `
            <div class="cp-tech-row">
                <span class="cp-tech-label">${t.name}</span>
                <div class="cp-tech-bar-container"><div class="cp-tech-bar" style="width:${t.pct}%; background:${c};"></div></div>
                <span class="cp-tech-pct">${t.pct}%</span>
            </div>
        `;
        });

        const note = data.analystNote || "No analyst summary provided.";

        document.getElementById('cp-pane-summary').innerHTML = `
        <div class="cp-card">
            <div class="cp-kpi-grid">
                <div class="cp-kpi-box"><div class="cp-kpi-val">${res}</div><div class="cp-kpi-label">Installed RES</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val">${share}</div><div class="cp-kpi-label">RES Share</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val">2.1 GW</div><div class="cp-kpi-label">Pipeline</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val">${grade}</div><div class="cp-kpi-label">Inv. Grade</div></div>
            </div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Key Technologies</div>
            ${techHtml}
        </div>
        <div class="cp-card" style="padding:0; border:none; background:transparent;">
            <div class="cp-card-title">Analyst Note</div>
            <div class="cp-analyst-note">${note}</div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Active Investors in this Market</div>
            <div class="cp-investor-row"><span class="cp-investor-name">CIP</span><span class="cp-investor-tag">Offshore Wind</span></div>
            <div class="cp-investor-row"><span class="cp-investor-name">Ørsted</span><span class="cp-investor-tag">Developer</span></div>
            <div class="cp-investor-row"><span class="cp-investor-name">PensionDanmark</span><span class="cp-investor-tag">Infrastructure</span></div>
            <div class="cp-investor-row"><span class="cp-investor-name">European Investment Bank</span><span class="cp-investor-tag">Debt</span></div>
        </div>
    `;

        // TAB 2 - INFRASTRUCTURE
        let assetsHtml = '';
        let assetsCount = 0;
        if (window.assets) {
            const filtered = window.assets.filter(a => a.country === countryName || a.country === (data ? data.code : ''));
            assetsCount = filtered.length;
            filtered.slice(0, 8).forEach(a => {
                const st = (a.status || 'planned').toLowerCase();
                assetsHtml += `
                <tr>
                    <td class="name">${a.name}</td>
                    <td class="type">${a.type.replace(/-/g, ' ')}</td>
                    <td class="mw">${a.capacity_mw ? a.capacity_mw : '-'}</td>
                    <td><span class="cp-status ${st}">${a.status || 'Planned'}</span></td>
                </tr>
            `;
            });
        }

        let gradientParts = [];
        let cumulative = 0;
        techs.forEach(t => {
            let c = t.color || '#2F80ED';
            if (t.name === 'Solar PV') c = '#F2994A';
            if (t.name === 'Other') c = '#888888';
            gradientParts.push(`${c} ${cumulative}% ${cumulative + t.pct}%`);
            cumulative += t.pct;
        });
        const conic = `conic-gradient(${gradientParts.join(', ')})`;

        let donutLegend = '';
        techs.forEach(t => {
            let c = t.color || '#2F80ED';
            if (t.name === 'Solar PV') c = '#F2994A';
            if (t.name === 'Other') c = '#888888';
            donutLegend += `
            <div class="cp-donut-legend-row">
                <div class="cp-donut-legend-left">
                    <div class="cp-donut-dot" style="background:${c}"></div>
                    <span class="cp-donut-label">${t.name}</span>
                </div>
                <span class="cp-donut-stats">${(parseFloat(res) * t.pct / 100).toFixed(1)} GW · ${t.pct}%</span>
            </div>
        `;
        });

        document.getElementById('cp-pane-infra').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Assets in Database</div>
            <div class="cp-infra-sub">${assetsCount} assets found for ${countryName}</div>
            <div class="cp-filter-row">
                <div class="cp-filter-pill active">All</div>
                <div class="cp-filter-pill">Wind</div>
                <div class="cp-filter-pill">Solar</div>
                <div class="cp-filter-pill">Nuclear</div>
                <div class="cp-filter-pill">Oil & Gas</div>
                <div class="cp-filter-pill">Grid</div>
            </div>
            <table class="cp-assets-table">
                <thead><tr><th>NAME</th><th>TYPE</th><th>MW</th><th>STATUS</th></tr></thead>
                <tbody>${assetsHtml}</tbody>
            </table>
            <div class="cp-table-more">Show all ${assetsCount} assets</div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Installed Capacity By Type</div>
            <div class="cp-donut-container">
                <div class="cp-donut" style="background: ${conic};">
                    <div class="cp-donut-inner">
            <span class="cp-donut-title">Total</span>
            <span class="cp-donut-val">${res}</span>
          </div>
        </div>
      </div>
      <div>${donutLegend}</div>
    </div>
  `;

        // TAB 3 - POLICY & GOV
        const minName = data.ministry || 'Ministry of Climate & Energy';
        const minister = data.minister || 'Lars Aagaard';

        document.getElementById('cp-pane-policy').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Ministry & Regulator</div>
            <div class="cp-gov-row">
                <div class="cp-gov-left">
                    <i class="ti ti-building cp-gov-icon"></i>
                    <div class="cp-gov-text">
                        <span class="cp-gov-name">${minName}</span>
                        <span class="cp-gov-sub">Minister: ${minister}</span>
                    </div>
                </div>
                <i class="ti ti-external-link cp-gov-right"></i>
            </div>
            <div class="cp-gov-row">
                <div class="cp-gov-left">
                    <i class="ti ti-shield cp-gov-icon"></i>
                    <div class="cp-gov-text">
                        <span class="cp-gov-name">Danish Energy Agency (DEA)</span>
                        <span class="cp-gov-sub">Lead regulator</span>
                    </div>
                </div>
                <i class="ti ti-external-link cp-gov-right"></i>
            </div>
        </div >
        <div class="cp-card">
            <div class="cp-card-title">Support Schemes</div>
            <div class="cp-list-row">
                <div class="cp-list-left">
                    <span class="cp-list-name">CfD Offshore Wind</span>
                    <span class="cp-tag" style="width:fit-content">Auction</span>
                </div>
                <span class="cp-status operational">Active</span>
            </div>
            <div class="cp-list-row">
                <div class="cp-list-left">
                    <span class="cp-list-name">Net Metering Solar</span>
                    <span class="cp-tag" style="width:fit-content">FiT</span>
                </div>
                <span class="cp-status operational">Active</span>
            </div>
            <div class="cp-list-row">
                <div class="cp-list-left">
                    <span class="cp-list-name">Grid Premium Scheme</span>
                    <span class="cp-tag" style="width:fit-content">Grid</span>
                </div>
                <span class="cp-status operational">Active</span>
            </div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">National Targets</div>
            <div class="cp-target-row">
                <div class="cp-target-left">
                    <div class="cp-target-top"><span class="cp-target-name">100% Renewable Electricity</span><span class="cp-target-year">2030</span></div>
                    <div class="cp-target-bar-bg"><div class="cp-target-bar-fill" style="width:88%"></div></div>
                </div>
            </div>
            <div class="cp-target-row">
                 <div class="cp-target-left">
                    <div class="cp-target-top"><span class="cp-target-name">Carbon Neutral</span><span class="cp-target-year">2050</span></div>
                    <div class="cp-target-bar-bg"><div class="cp-target-bar-fill" style="width:35%"></div></div>
                </div>
            </div>
            <div class="cp-target-row">
                 <div class="cp-target-left">
                    <div class="cp-target-top"><span class="cp-target-name">6 GW Offshore Wind</span><span class="cp-target-year">2030</span></div>
                    <div class="cp-target-bar-bg"><div class="cp-target-bar-fill" style="width:72%"></div></div>
                </div>
            </div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Recent Policy Changes</div>
            <div class="cp-policy-change-row">
                <div class="cp-policy-date">12 Feb 2026</div>
                <div class="cp-policy-desc">New spatial planning framework approved for North Sea energy islands.</div>
            </div>
            <div class="cp-policy-change-row">
                <div class="cp-policy-date">04 Jan 2026</div>
                <div class="cp-policy-desc">Revised grid tariffs implemented for large-scale corporate PPA off-takers.</div>
            </div>
            <div class="cp-policy-change-row">
                <div class="cp-policy-date">18 Nov 2025</div>
                <div class="cp-policy-desc">Tender framework released for 3GW of floating offshore wind capacity.</div>
            </div>
        </div>
  `;

        // TAB 4 - MARKET & FINANCE
        document.getElementById('cp-pane-market').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Power Price Zones</div>
            <div class="cp-market-price-row">
                <span class="cp-market-zone">DK1 West</span>
                <div><span class="cp-market-price">44.45 €/MWh</span> <span class="cp-market-change down">▼ −3.1%</span></div>
            </div>
            <div class="cp-market-price-row">
                <span class="cp-market-zone">DK2 East</span>
                <div><span class="cp-market-price">47.20 €/MWh</span> <span class="cp-market-change up">▲ +1.2%</span></div>
            </div>
        </div >
        <div class="cp-card">
            <div class="cp-card-title">Investment Indicators</div>
            <div class="cp-kpi-grid">
                <div class="cp-kpi-box"><div class="cp-kpi-val">2.4%</div><div class="cp-kpi-label">Sov. Bond Yield</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val">Low</div><div class="cp-kpi-label">Risk Premium</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val">7-11%</div><div class="cp-kpi-label">Typical IRR</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val" style="font-size:16px">DKK/EUR</div><div class="cp-kpi-label">Currency (Pegged)</div></div>
            </div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Listed Energy Companies</div>
            <div class="cp-investor-row"><span class="cp-investor-name">Ørsted</span><span class="cp-investor-tag">ORSTED.CO</span></div>
            <div class="cp-investor-row"><span class="cp-investor-name">Vestas</span><span class="cp-investor-tag">VWS.CO</span></div>
            <div class="cp-investor-row"><span class="cp-investor-name">Elia</span><span class="cp-investor-tag">ELI.BR</span></div>
            <div class="cp-investor-row"><span class="cp-investor-name">Nordic Power</span><span class="cp-investor-tag">NDP.ST</span></div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Recent Transactions</div>
            <div class="cp-deal-row">
                <span class="cp-deal-name">Bornholm Offshore Wind Phase 2</span>
                <span class="cp-deal-meta">Equity · €2.1bn · Jan 2026</span>
            </div>
            <div class="cp-deal-row">
                <span class="cp-deal-name">Thor Offshore Wind Financing</span>
                <span class="cp-deal-meta">Project Finance · €3.8bn · Dec 2025</span>
            </div>
            <div class="cp-deal-row">
                <span class="cp-deal-name">Anholt Wind Farm Refinancing</span>
                <span class="cp-deal-meta">Debt · €890M · Nov 2025</span>
            </div>
        </div>
  `;

        // TAB 5 - RISK & ALERTS
        let riskHtml = '';
        const risksObj = data.risks || {
            supplySecuity: 15, policyStability: 18, gridReliability: 12, climateRisk: 32, geopolitical: 22
        };
        const riskLabels = {
            supplySecuity: "Supply Security", policyStability: "Policy Stability", gridReliability: "Grid Reliability", climateRisk: "Physical Climate", geopolitical: "Geopolitical"
        };
        for (const [k, v] of Object.entries(risksObj)) {
            let rc = '#27AE60';
            if (v > 35) rc = '#F2994A';
            if (v > 65) rc = '#EB5757';
            riskHtml += `
            <div class="cp-risk-row">
                <div class="cp-risk-top">
                    <span class="cp-risk-label">${riskLabels[k] || k}</span>
                    <span class="cp-risk-score">${v}</span>
                </div>
                <div class="cp-risk-bar-bg"><div class="cp-risk-bar-fill" style="width:${v}%; background:${rc}"></div></div>
            </div>
    `;
        }

        document.getElementById('cp-pane-risk').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Risk Factor Analysis</div>
            ${riskHtml}
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Active Alerts</div>
            <div class="cp-alert-row"><span class="cp-alert-title">Grid Congestion Warning: Jutland South</span><span class="cp-alert-meta">Red Alert · Transmission limits exceeded</span></div>
            <div class="cp-alert-row"><span class="cp-alert-title">Supply Chain Notice: Cable Shortage</span><span class="cp-alert-meta">Amber Alert · 6-9 month lead time extension</span></div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Known Investment Risks</div>
            <div class="cp-risk-bullet"><i class="ti ti-alert-circle"></i><span>Permitting delays for nearshore projects averaging 18 months</span></div>
            <div class="cp-risk-bullet"><i class="ti ti-alert-circle"></i><span>Grid congestion in Jutland limiting new onshore wind connections</span></div>
            <div class="cp-risk-bullet"><i class="ti ti-alert-circle"></i><span>Merchant price exposure post-CfD period</span></div>
        </div>
  `;

        // TAB 6 - PIPELINE
        let projHtml = '';
        const projs = data.projects || [
            { name: "Hesselø Offshore Wind", developer: "Ørsted / Vattenfall", mw: 1000, status: "development", cod: "2029" },
            { name: "Kriegers Flak 2", developer: "Vattenfall", mw: 600, status: "construction", cod: "2027" }
        ];
        projs.forEach(p => {
            const s = (p.status || 'development').toLowerCase();
            let color = '#242424';
            if (s === 'construction') color = '#F2994A';
            else if (s === 'operational') color = '#27AE60';
            else if (s === 'fid reached') color = '#27AE60';

            projHtml += `
        <div class="cp-proj-row">
            <div class="cp-proj-line1">${p.name}</div>
            <div class="cp-proj-line2">${p.developer} · ${p.mw} MW</div>
            <div class="cp-proj-line3"><span class="cp-proj-status" style="background: ${color};">${(p.status || 'Development')}</span><span class="cp-proj-cod">COD ${p.cod || 'N/A'}</span></div>
        </div>
        `;
        });

        document.getElementById('cp-pane-pipeline').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Project Pipeline</div>
            <div class="cp-pipe-stage">
                <span class="cp-pipe-stage-label">Development</span>
                <div class="cp-pipe-stage-bar-bg"><div class="cp-pipe-stage-bar" style="width:40%"></div></div>
                <span class="cp-pipe-stage-val">99 proj</span>
            </div>
            <div class="cp-pipe-stage">
                <span class="cp-pipe-stage-label">FID Reached</span>
                <div class="cp-pipe-stage-bar-bg"><div class="cp-pipe-stage-bar" style="width:15%"></div></div>
                <span class="cp-pipe-stage-val">12 proj</span>
            </div>
            <div class="cp-pipe-stage">
                <span class="cp-pipe-stage-label">Construction</span>
                <div class="cp-pipe-stage-bar-bg"><div class="cp-pipe-stage-bar" style="width:25%"></div></div>
                <span class="cp-pipe-stage-val">28 proj</span>
            </div>
            <div class="cp-pipe-stage">
                <span class="cp-pipe-stage-label">Operational</span>
                <div class="cp-pipe-stage-bar-bg"><div class="cp-pipe-stage-bar" style="width:85%"></div></div>
                <span class="cp-pipe-stage-val">542 proj</span>
            </div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Projects</div>
            <div class="cp-filter-row">
                <div class="cp-filter-pill active">All</div>
                <div class="cp-filter-pill">Wind</div>
                <div class="cp-filter-pill">Solar</div>
                <div class="cp-filter-pill">Storage</div>
                <div class="cp-filter-pill">FID</div>
            </div>
            ${projHtml}
        </div>
    `;

        // TAB 7 - WEATHER
        const wData = data.weather || { windSpeed: 'N/A', solarIrradiance: 'N/A', temperature: 'N/A', waveHeight: 'N/A' };

        const windHist = [9.2, 8.8, 8.1, 7.4, 6.9, 6.2, 6.8, 7.1, 7.8, 8.4, 9.0, 9.4];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let chartHtml = '';
        windHist.forEach((v, i) => {
            const heightPct = (v / 10) * 100;
            chartHtml += `
            <div class="cp-month-col">
                <div class="cp-month-bar" style="height:${heightPct}%"></div>
                <span class="cp-month-label">${months[i]}</span>
            </div>
    `;
        });

        document.getElementById('cp-pane-weather').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Current Conditions</div>
            <div class="cp-weather-sub">Demo data · live feed coming soon</div>
            <div class="cp-weather-grid">
                <div class="cp-kpi-box"><div class="cp-kpi-val" style="color:#2F80ED">${wData.windSpeed}</div><div class="cp-kpi-label">Wind Speed</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val" style="color:#2F80ED">${wData.solarIrradiance}</div><div class="cp-kpi-label">Solar Irradiance</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val" style="color:#2F80ED">${wData.temperature}</div><div class="cp-kpi-label">Temperature</div></div>
                <div class="cp-kpi-box"><div class="cp-kpi-val" style="color:#2F80ED">${wData.waveHeight}</div><div class="cp-kpi-label">Wave Height</div></div>
            </div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Monthly Wind Speed (avg m/s)</div>
            <div class="cp-weather-sub">Demo data</div>
            <div class="cp-month-chart">${chartHtml}</div>
        </div>
        <div class="cp-card">
            <div class="cp-card-title">Resource Assessment</div>
            <div class="cp-res-quality-row"><span class="cp-res-quality-label">Wind Resource</span><span class="cp-res-quality-chip">Excellent (Class 7)</span></div>
            <div class="cp-res-quality-row"><span class="cp-res-quality-label">Solar Resource</span><span class="cp-res-quality-chip" style="background:#F2C94C; color:black;">Moderate (Class 4)</span></div>
            <div class="cp-res-quality-row"><span class="cp-res-quality-label">Offshore Conditions</span><span class="cp-res-quality-chip" style="background:#2F80ED">Favourable</span></div>
        </div>
  `;

        // TAB 8 - INTELLIGENCE
        document.getElementById('cp-pane-intel').innerHTML = `
        <div class="cp-card">
            <div class="cp-card-title">Latest Intelligence Reports</div>
            <div class="cp-intel-row">
                <span class="cp-intel-title">Q1 2026 Grid Flexibility Assessment</span>
                <div class="cp-intel-desc">In-depth analysis of battery storage deployment vs transmission upgrade timelines...</div>
                <span class="cp-intel-meta">Kalpana Research · 02 Mar 2026</span>
            </div>
            <div class="cp-intel-row">
                <span class="cp-intel-title">Offshore Wind Auction Results</span>
                <div class="cp-intel-desc">Strategic review of successful bidding consortiums and strike price dynamics...</div>
                <span class="cp-intel-meta">Kalpana Research · 15 Feb 2026</span>
            </div>
        </div>
    `;

        // TAB 9 - POTENTIALS
        let pots = data.potentials || [];
        let potHtml = '';
        let totalMw = 0;
        let highCount = 0;

        pots.forEach(p => {
            let mwNum = parseInt((p.capacity || "0").replace(/,/g, ''), 10);
            if (!isNaN(mwNum)) totalMw += mwNum;
            if (p.confidence === 'high') highCount++;

            let confColor = '#EB5757';
            if (p.confidence === 'high') confColor = '#27AE60';
            else if (p.confidence === 'medium') confColor = '#F2994A';

            let iconStr = 'ti-sun';
            if (p.tech.includes('wind')) iconStr = p.tech.includes('offshore') ? 'ti-ripple' : 'ti-wind';
            else if (p.tech === 'biomass') iconStr = 'ti-leaf';
            else if (p.tech === 'hydro') iconStr = 'ti-droplet';
            else if (p.tech === 'storage') iconStr = 'ti-battery-charging';

            potHtml += `
            <div class="cp-zone-card" data-zoneid="${p.id}" data-lat="${p.lat}" data-lng="${p.lng}" style="border-left: 3px solid ${confColor};">
                <div class="cp-zone-left">
                    <div class="cp-zone-icon-box" style="color:${confColor}"><i class="ti ${iconStr}"></i></div>
                    <div class="cp-zone-text">
                        <div class="cp-zone-name">${p.name}</div>
                        <div class="cp-zone-meta">${p.region}</div>
                        <div class="cp-zone-mw">${p.capacity} estimate</div>
                    </div>
                </div>
                <div class="cp-zone-right">
                    <span class="cp-zone-conf-chip" style="background:${confColor}">${p.confidence.charAt(0).toUpperCase() + p.confidence.slice(1)}</span>
                    <i class="ti ti-chevron-right cp-zone-arrow"></i>
                </div>
            </div>
        `;
        });

        let potGw = (totalMw / 1000).toFixed(1);

        document.getElementById('cp-pane-potentials').innerHTML = `
        <div class="cp-card cp-potentials-header-card">
            <i class="ti ti-map-search cp-potentials-hero-icon"></i>
            <h3 class="cp-potentials-title">Investment Potential Zones</h3>
            <p class="cp-potentials-sub">AI-identified zones for renewable energy infrastructure investment across ${data ? data.name : countryName}. Zones are scored based on geography, solar irradiance, wind speed, grid proximity, population density, and policy alignment.</p>
            
            <div class="cp-zone-summary-strip">
                <div class="cp-zone-sum-box"><div class="cp-zone-sum-val">${pots.length}</div><div class="cp-zone-sum-label">ZONES IDENTIFIED</div></div>
                <div class="cp-zone-sum-box"><div class="cp-zone-sum-val">${potGw} GW</div><div class="cp-zone-sum-label">TOTAL POTENTIAL</div></div>
                <div class="cp-zone-sum-box"><div class="cp-zone-sum-val">${highCount}</div><div class="cp-zone-sum-label">HIGH CONFIDENCE</div></div>
            </div>

            <div class="cp-zone-filters">
                <span class="cp-zone-filter-label">Filter by technology:</span>
                <div class="cp-filter-row">
                    <div class="cp-filter-pill active">All</div>
                    <div class="cp-filter-pill">Solar</div>
                    <div class="cp-filter-pill">Wind</div>
                    <div class="cp-filter-pill">Offshore</div>
                    <div class="cp-filter-pill">Biomass</div>
                    <div class="cp-filter-pill">Hydro</div>
                    <div class="cp-filter-pill">Storage</div>
                </div>
            </div>
        </div>

        <div class="cp-card cp-potentials-list-card" style="padding:0; border:none; background:transparent;">
            <div class="cp-zone-list-title">IDENTIFIED ZONES</div>
            <div class="cp-zone-list">
                ${potHtml}
            </div>
            
            <button class="cp-potentials-explore-btn" id="btn-potentials">Explore Potential Zones on Map &rarr;</button>
        </div>
  `;
        // Add listener after injection
        setTimeout(() => {
            const btn = document.getElementById('btn-potentials');
            if (btn) {
                btn.addEventListener('click', () => {
                    console.log('Potentials mode opening for:', data ? data.name : countryName);
                    if (typeof window.activatePotentialsMode === 'function') {
                        window.activatePotentialsMode(data ? data.name : countryName, data);
                    }
                });
            }
        }, 50);

    } // End of else block

    panel.classList.add('open');
    if (window.map) {
        const mapZone = document.getElementById('map-zone') || document.getElementById('map');
        if (mapZone) {
            mapZone.style.paddingRight = '420px';
        }
        setTimeout(() => { map.invalidateSize(); }, 350);
    }
};
