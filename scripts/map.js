/* ═══════════════════════════════════════════════
   KALPANA MAP — scripts/map.js
   Vanilla JavaScript · Leaflet.js · MarkerCluster
   ═══════════════════════════════════════════════ */
'use strict';

/* ─── COLOUR CONFIG ─── */
const SEGMENT_COLOURS = {
    'offshore-wind': '#2F80ED',
    'onshore-wind': '#2F80ED',
    'utility-solar': '#2F80ED',
    'hydro': '#2F80ED',
    'nuclear': '#F2C94C',
    'biomass': '#27AE60',
    'oil-refinery': '#F2994A',
    'lng-terminal': '#F2994A',
    'gas-processing': '#F2994A',
    'pipeline': '#F2994A',
    'battery-storage': '#00B8A9',
    'substation': '#00B8A9',
    'interconnector': '#00B8A9',
    'ministry': '#9B51E0',
    'regulator': '#9B51E0',
    'state-utility': '#9B51E0',
    'developer-hq': '#F2C94C',
    'fund-office': '#F2C94C'
};

/* Custom SVG icon file mapping — data/icons/m-*.svg */
const MARKER_ICON_FILES = {
    'offshore-wind': 'data/icons/m-wind.svg',
    'onshore-wind': 'data/icons/m-wind.svg',
    'utility-solar': 'data/icons/m-solar.svg',
    'hydro': 'data/icons/m-bolt-power.svg',
    'nuclear': 'data/icons/m-nuke.svg',
    'biomass': 'data/icons/m-biomass.svg',
    'oil-refinery': 'data/icons/m-flame.svg',
    'lng-terminal': 'data/icons/m-flame.svg',
    'gas-processing': 'data/icons/m-flame.svg',
    'pipeline': 'data/icons/m-flame.svg',
    'battery-storage': 'data/icons/m-bolt-grid.svg',
    'substation': 'data/icons/m-bolt-grid.svg',
    'interconnector': 'data/icons/m-bolt-grid.svg',
    'ministry': 'data/icons/m-book.svg',
    'regulator': 'data/icons/m-book.svg',
    'state-utility': 'data/icons/m-book.svg',
    'developer-hq': 'data/icons/m-briefcase.svg',
    'fund-office': 'data/icons/m-briefcase.svg'
};

/* Sidebar section header Tabler icon classes */
const SIDEBAR_TABLER_ICONS = {
    'power': 'ti-bolt',
    'oil-gas': 'ti-flame',
    'grid': 'ti-bolt',
    'policy': 'ti-book',
    'corporate': 'ti-briefcase'
};


/* ─── LAYER DEFINITIONS ─── */
const LAYER_GROUPS = [
    {
        id: 'power',
        label: 'Power & Generation',
        colour: '#2F80ED',
        defaultOn: true,
        layers: [
            { type: 'offshore-wind', label: 'Offshore Wind Farms' },
            { type: 'onshore-wind', label: 'Onshore Wind Farms' },
            { type: 'utility-solar', label: 'Utility Solar (PV)' },
            { type: 'hydro', label: 'Hydropower Plants' },
            { type: 'nuclear', label: 'Nuclear Plants' },
            { type: 'biomass', label: 'Biomass / Waste Energy' }
        ]
    },
    {
        id: 'oil-gas',
        label: 'Oil & Gas',
        colour: '#F2994A',
        defaultOn: false,
        layers: [
            { type: 'oil-refinery', label: 'Oil Refineries' },
            { type: 'lng-terminal', label: 'LNG Terminals' },
            { type: 'gas-processing', label: 'Gas Processing Plants' },
            { type: 'pipeline', label: 'Pipelines' }
        ]
    },
    {
        id: 'grid',
        label: 'Grid & Storage',
        colour: '#00B8A9',
        defaultOn: false,
        layers: [
            { type: 'battery-storage', label: 'Battery Storage Sites' },
            { type: 'substation', label: 'Major Substations' },
            { type: 'interconnector', label: 'Cross-border Interconnectors' }
        ]
    },
    {
        id: 'policy',
        label: 'Policy & Governance',
        colour: '#9B51E0',
        defaultOn: false,
        layers: [
            { type: 'ministry', label: 'Ministry of Energy HQs' },
            { type: 'regulator', label: 'National Regulators' },
            { type: 'state-utility', label: 'State-owned Utility HQs' }
        ]
    },
    {
        id: 'corporate',
        label: 'Corporate & Finance',
        colour: '#F2C94C',
        defaultOn: false,
        layers: [
            { type: 'developer-hq', label: 'Developer HQs' },
            { type: 'fund-office', label: 'Infrastructure Fund Offices' }
        ]
    }
];

/* ─── OVERLAY POLYGONS ─── */
const OVERLAYS = {
    conflict: {
        colour: '#F2994A',
        cssClass: 'conflict-overlay',
        countries: [
            // Yemen
            [[15.0, 43.0], [12.5, 45.0], [13.0, 48.0], [15.5, 50.0], [18.0, 51.0], [19.0, 49.0], [18.5, 46.0], [16.5, 43.5], [15.0, 43.0]],
            // Sudan
            [[21.8, 25.0], [22.0, 30.0], [21.0, 33.5], [18.0, 34.0], [14.0, 35.5], [12.0, 33.0], [11.0, 28.0], [14.0, 24.0], [18.0, 23.5], [21.8, 25.0]],
            // Somalia
            [[11.5, 41.5], [11.8, 44.0], [10.5, 47.0], [7.0, 49.5], [1.5, 42.0], [1.5, 41.0], [4.5, 42.0], [8.0, 41.0], [11.5, 41.5]],
            // Myanmar
            [[28.0, 97.5], [25.0, 98.0], [22.0, 96.0], [18.0, 94.0], [15.5, 98.0], [17.0, 101.0], [20.0, 100.0], [23.0, 98.5], [28.0, 97.5]]
        ]
    },
    stress: {
        colour: '#F2C94C',
        cssClass: 'stress-overlay',
        countries: [
            // Germany (approx bbox polygon)
            [[55.0, 6.0], [55.0, 15.0], [47.3, 15.0], [47.3, 6.0], [55.0, 6.0]],
            // UK
            [[61.0, -8.0], [61.0, 2.0], [50.0, 2.0], [50.0, -6.0], [54.0, -8.0], [61.0, -8.0]],
            // France
            [[51.0, -5.0], [51.0, 8.0], [43.0, 8.0], [42.0, 3.0], [43.5, -2.0], [47.0, -5.0], [51.0, -5.0]]
        ]
    },
    alert: {
        colour: '#E2B93B',
        cssClass: 'alert-overlay',
        countries: []
    }
};

/* ─── GLOBAL STATE ─── */
let map, clusterGroup, assets = [];
let layerStates = {};         // type → boolean
let overlayLayers = {};       // 'conflict'|'stress'|'alert' → L.layerGroup
let activeMarkers = {};       // type → L.marker[]
let widgetPage = 0;
let countriesGeoLayer = null;
let activeCountryLayer = null;
let activeCountryPopup = null;

/* ═══════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    try { initMap(); } catch (e) { console.error('Map init failed:', e); }
    try { loadCountriesLayer(); } catch (e) { console.error('Countries layer load failed:', e); }
    try { buildSidebar(); } catch (e) { console.error('Sidebar build failed:', e); }
    try { buildLegend(); } catch (e) { console.error('Legend build failed:', e); }
    try { buildEnergyWidget(); } catch (e) { console.error('Energy Widget build failed:', e); }
    try { buildMapControls(); } catch (e) { console.error('Map controls failed:', e); }

    const tooltip = document.getElementById('country-tooltip');
    console.log('Tooltip element found:', tooltip);

    try {
        if (typeof fetchLiveData === 'function') {
            fetchLiveData();
            setInterval(fetchLiveData, 24 * 60 * 60 * 1000);
        } else {
            loadAssets();
        }
    } catch (e) { console.error('Data fetch init failed:', e); }

    try { initSidebarToggle(); } catch (e) { console.error('Sidebar toggle init failed:', e); }
    try { initHeaderScript(); } catch (e) { console.error('Header script start failed:', e); }
});

/* ═══════════════════════════════════════════════
   LEAFLET MAP
   ═══════════════════════════════════════════════ */
function initMap() {
    map = L.map('map', {
        center: [20, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 12,
        zoomControl: false,
        attributionControl: false
    });

    L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; CartoDB &copy; OpenStreetMap contributors'
    }).addTo(map);

    L.control.attribution({ prefix: false, position: 'bottomright' }).addTo(map);

    clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 60,
        iconCreateFunction: createClusterIcon,
        chunkedLoading: true
    });
    map.addLayer(clusterGroup);

    console.log('Map ready:', map);

    map.on('move', positionCountryPopup);
    map.on('click', closeCountryPopup);

    window.leafletMap = map;
}

function loadCountriesLayer() {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(res => res.json())
        .then(data => {
            console.log('GeoJSON loaded, features count:', data.features.length);
            console.log('GeoJSON property keys:', Object.keys(data.features[0].properties));
            countriesGeoLayer = L.geoJSON(data, {
                style: {
                    fillColor: '#484848',
                    fillOpacity: 0.6,
                    color: '#333333',
                    weight: 1
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        mouseover: function (e) {
                            console.log('Hovered country:', getCountryName(e.target.feature));
                            highlightCountry(e);
                        },
                        mouseout: resetCountry,
                        click: handleCountryClick
                    });
                }
            }).addTo(map);

            // Ensure countries layer is behind markers
            if (clusterGroup) {
                countriesGeoLayer.bringToBack();
            }
        })
        .catch(err => {
            console.error('GeoJSON failed to load:', err);
        });
}

function highlightCountry(e) {
    const layer = e.target;
    layer.setStyle({
        fillColor: '#1E1E1E',
        fillOpacity: 0.7
    });
}

function resetCountry(e) {
    const layer = e.target;
    if (layer === activeCountryLayer) return;

    layer.setStyle({
        fillColor: '#484848',
        fillOpacity: 0.6
    });
}

function handleCountryClick(e) {
    L.DomEvent.stopPropagation(e);
    const layer = e.target;
    const countryName = getCountryName(layer.feature);

    closeCountryPopup();

    activeCountryLayer = layer;
    activeCountryLayer.setStyle({ fillColor: '#1E1E1E', fillOpacity: 0.7 });

    createCountryPopup(countryName, layer);
}

function createCountryPopup(countryName, layer) {
    let data = window.COUNTRIES_DATA ? window.COUNTRIES_DATA[countryName] : null;
    let res = 'N/A';
    let share = 'N/A';
    let enerconColor = '#888888';
    let enerconText = 'N/A';
    let flagEmoji = '🌐';

    if (data) {
        res = data.kpis && data.kpis.installedRes ? data.kpis.installedRes : 'N/A';
        share = data.kpis && data.kpis.resShare ? data.kpis.resShare + '%' : 'N/A';
        const eLevel = data.enercon || 0;
        enerconText = eLevel || 'N/A';
        if (eLevel === 1) enerconColor = '#27AE60';
        else if (eLevel === 2) enerconColor = '#F2C94C';
        else if (eLevel === 3) enerconColor = '#F2994A';
        else if (eLevel === 4) enerconColor = '#EB5757';
        else if (eLevel === 5) enerconColor = '#C0392B';
        if (data.flag) flagEmoji = data.flag;
    }

    const popupHtml = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 24px; line-height: 1;">${flagEmoji}</span>
        <span style="color: white; font-weight: bold; font-size: 16px;">${countryName}</span>
        <button id="cpp-close" style="position: absolute; top: 10px; right: 10px; color: #888888; background: transparent; border: none; cursor: pointer; font-size: 16px;"><i class="ti ti-x"></i></button>
      </div>
      <div style="height: 1px; background: #2A2A2A; margin: 10px 0;"></div>
      <div style="display: flex; justify-content: space-between; padding: 4px 0;">
        <span style="color: #888888; font-size: 11px;">Installed RES</span>
        <span style="color: white; font-size: 12px; font-family: 'JetBrains Mono', monospace;">${res}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 4px 0;">
        <span style="color: #888888; font-size: 11px;">Renewables Share</span>
        <span style="color: white; font-size: 12px; font-family: 'JetBrains Mono', monospace;">${share}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 4px 0; align-items: center;">
        <span style="color: #888888; font-size: 11px;">ENERCON</span>
        <span style="background: ${enerconColor}; color: white; border-radius: 4px; padding: 2px 6px; font-size: 10px; font-weight: 700;">${enerconText}</span>
      </div>
      <div style="height: 1px; background: #2A2A2A; margin: 10px 0;"></div>
      <button id="cpp-open" style="width: 100%; background: #2F80ED; color: white; border: none; border-radius: 8px; padding: 10px; font-size: 13px; font-weight: 600; cursor: pointer;">Open Country Profile &rarr;</button>
    `;

    activeCountryPopup = document.createElement('div');
    activeCountryPopup.id = 'country-fixed-popup';
    activeCountryPopup.style.position = 'fixed';
    activeCountryPopup.style.background = '#1A1A1A';
    activeCountryPopup.style.border = '1px solid #2A2A2A';
    activeCountryPopup.style.borderRadius = '12px';
    activeCountryPopup.style.padding = '16px';
    activeCountryPopup.style.width = '240px';
    activeCountryPopup.style.boxShadow = '0 8px 32px rgba(0,0,0,0.8)';
    activeCountryPopup.style.zIndex = '9000';
    activeCountryPopup.style.fontFamily = 'Inter, sans-serif';
    activeCountryPopup.style.transform = 'translate(-50%, -50%)';
    activeCountryPopup.innerHTML = popupHtml;

    document.body.appendChild(activeCountryPopup);

    document.getElementById('cpp-close').addEventListener('click', (e) => {
        e.stopPropagation();
        closeCountryPopup();
    });

    document.getElementById('cpp-open').addEventListener('click', (e) => {
        e.stopPropagation();
        closeCountryPopup();
        if (window.openCountryPanel) {
            window.openCountryPanel(countryName);
        }
    });

    activeCountryPopup.addEventListener('click', (e) => e.stopPropagation());

    positionCountryPopup();
}

function positionCountryPopup() {
    if (!activeCountryPopup || !activeCountryLayer) return;

    const center = activeCountryLayer.getBounds().getCenter();
    const containerPoint = map.latLngToContainerPoint(center);

    const mapZone = document.getElementById('map');
    const mapRect = mapZone.getBoundingClientRect();

    const left = mapRect.left + containerPoint.x;
    const top = mapRect.top + containerPoint.y - 120;

    activeCountryPopup.style.left = left + 'px';
    activeCountryPopup.style.top = top + 'px';
}

function closeCountryPopup() {
    if (activeCountryPopup) {
        activeCountryPopup.remove();
        activeCountryPopup = null;
    }
    if (activeCountryLayer) {
        activeCountryLayer.setStyle({ fillColor: '#484848', fillOpacity: 0.6 });
        activeCountryLayer = null;
    }
}

function getCountryName(feature) {
    return feature.properties.ADMIN ||
        feature.properties.NAME ||
        feature.properties.name ||
        feature.properties.NAME_EN ||
        feature.properties.COUNTRY ||
        'Unknown';
}

function createClusterIcon(cluster) {
    const count = cluster.getChildCount();
    const size = count < 10 ? 32 : count < 100 ? 40 : 48;
    return L.divIcon({
        html: `<div class="marker-cluster-custom" style="width:${size}px;height:${size}px;font-size:${size > 38 ? 13 : 11}px;">${count}</div>`,
        className: '',
        iconSize: L.point(size, size)
    });
}

/* ═══════════════════════════════════════════════
   LOAD ASSETS
   ═══════════════════════════════════════════════ */
async function loadAssets() {
    try {
        const resp = await fetch('./data/assets.json');
        assets = await resp.json();
        renderAllMarkers();
        updateLayerCounts();
    } catch (e) {
        console.warn('Could not load assets.json — check that you are serving via HTTP.', e);
    }
}

function renderAllMarkers() {
    clusterGroup.clearLayers();
    activeMarkers = {};

    assets.forEach(asset => {
        if (!layerStates[asset.type]) return;

        const iconFile = MARKER_ICON_FILES[asset.type] || 'data/icons/m-bolt-power.svg';
        const typeSlug = asset.type.replace(/[^a-z0-9]/g, '-');

        // The m-* SVGs already contain their coloured rounded-square background.
        // Scale to 32×32 full-bleed; box-shadow added via CSS on .marker-icon.
        const icon = L.divIcon({
            html: `<div class="marker-icon marker-${typeSlug}"><img src="${iconFile}" width="32" height="32" alt="" /></div>`,
            className: '',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -20]
        });

        const marker = L.marker([asset.lat, asset.lng], { icon });
        marker.bindPopup(buildPopup(asset), {
            maxWidth: 240,
            className: 'kalpana-popup'
        });

        if (!activeMarkers[asset.type]) activeMarkers[asset.type] = [];
        activeMarkers[asset.type].push(marker);
        clusterGroup.addLayer(marker);
    });
}

function buildPopup(a) {
    const statusClass = a.status === 'operational' ? 'operational' : a.status === 'construction' ? 'construction' : 'planned';
    const typeLabel = a.type.replace(/-/g, ' ');
    return `
    <div>
      <div class="popup-name">${a.name}</div>
      <div class="popup-row"><span class="popup-type-tag">${typeLabel}</span></div>
      <div class="popup-row"><span class="popup-label">Operator</span><span class="popup-val">${a.operator}</span></div>
      <div class="popup-row"><span class="popup-label">Capacity</span><span class="popup-val">${a.capacity}</span></div>
      <div class="popup-row"><span class="popup-label">Country</span><span class="popup-val">${a.country}</span></div>
      <div class="popup-row"><span class="popup-label">Status</span><span class="popup-chip ${statusClass}">${a.status}</span></div>
    </div>`;
}

/* ═══════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════ */
function buildSidebar() {
    const body = document.getElementById('sidebar-body');
    if (!body) return;

    LAYER_GROUPS.forEach(group => {
        // Init all layer states
        group.layers.forEach(l => { layerStates[l.type] = group.defaultOn; });

        const groupEl = document.createElement('div');
        groupEl.className = 'layer-group';
        groupEl.dataset.groupId = group.id;

        const header = document.createElement('div');
        header.className = 'layer-group-header';

        // Tabler icon in a coloured pill badge
        const tablerIcon = SIDEBAR_TABLER_ICONS[group.id] || 'ti-bolt';
        header.innerHTML = `
      <span class="layer-group-icon-wrap" style="background:${group.colour}18;border:1px solid ${group.colour}44;">
        <i class="ti ${tablerIcon}" style="color:${group.colour};font-size:12px;"></i>
      </span>
      <span class="layer-group-name" style="color:${group.colour};">${group.label}</span>
      <span class="layer-group-arrow"><i class="ti ti-chevron-up"></i></span>
    `;

        // Group toggle on header click
        header.addEventListener('click', () => {
            groupEl.classList.toggle('collapsed');
        });

        const items = document.createElement('div');
        items.className = 'layer-items';

        group.layers.forEach(layer => {
            const item = createLayerItem(layer, group.colour, group.defaultOn);
            items.appendChild(item);
        });

        groupEl.appendChild(header);
        groupEl.appendChild(items);
        body.appendChild(groupEl);
    });
}

function createLayerItem(layer, colour, defaultOn) {
    const item = document.createElement('div');
    item.className = 'layer-item';
    item.dataset.type = layer.type;

    const dot = document.createElement('span');
    dot.className = 'layer-dot';
    dot.style.background = colour;

    const name = document.createElement('span');
    name.className = 'layer-name';
    name.textContent = layer.label;

    const count = document.createElement('span');
    count.className = 'layer-count';
    count.id = `count-${layer.type}`;
    count.textContent = '0';

    // Custom SVG checkbox: square-2 = unchecked, square-3 = checked
    let checked = defaultOn;
    const cbImg = document.createElement('img');
    cbImg.className = 'layer-checkbox-svg';
    cbImg.width = 16;
    cbImg.height = 16;
    cbImg.alt = '';
    cbImg.title = layer.label;
    cbImg.setAttribute('role', 'checkbox');
    cbImg.setAttribute('aria-checked', String(checked));
    cbImg.src = checked ? 'data/icons/square 3.svg' : 'data/icons/square 2.svg';

    function toggleCheck() {
        checked = !checked;
        cbImg.src = checked ? 'data/icons/square 3.svg' : 'data/icons/square 2.svg';
        cbImg.setAttribute('aria-checked', String(checked));
        layerStates[layer.type] = checked;
        renderAllMarkers();
    }

    // Click on the img itself
    cbImg.addEventListener('click', (e) => { e.stopPropagation(); toggleCheck(); });
    // Click anywhere on the row also toggles (except the img itself which is handled above)
    item.addEventListener('click', (e) => { if (e.target !== cbImg) toggleCheck(); });

    item.appendChild(dot);
    item.appendChild(name);
    item.appendChild(count);
    item.appendChild(cbImg);
    return item;
}

function updateLayerCounts() {
    document.querySelectorAll('.layer-item').forEach(item => {
        const type = item.dataset.type;
        const count = assets.filter(a => a.type === type).length;
        const span = document.getElementById(`count-${type}`);
        if (span) {
            span.innerHTML = count;
        }
    });
}

/* ─── Sidebar collapse tab ─── */
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const tab = document.getElementById('sidebar-toggle-tab');
    if (!sidebar || !tab) return;

    tab.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        tab.style.left = sidebar.classList.contains('collapsed') ? '0' : '210px';
        tab.textContent = sidebar.classList.contains('collapsed') ? '›' : '‹';
        setTimeout(() => map.invalidateSize(), 300);
    });
}

/* ═══════════════════════════════════════════════
   LEGEND STRIP
   ═══════════════════════════════════════════════ */
function buildLegend() {
    const strip = document.getElementById('legend-strip');
    if (!strip) return;

    const chips = [
        { key: 'conflict', label: 'Conflict', icon: 'ti-alert-circle', dot: '#F2994A' },
        { key: 'stress', label: 'Stress', icon: 'ti-alert-triangle', dot: '#F2C94C' },
        { key: 'alert', label: 'Infrastructure Alert', icon: 'ti-tool', dot: '#E2B93B' }
    ];

    chips.forEach(chip => {
        const el = document.createElement('div');
        el.className = 'legend-chip';
        el.dataset.key = chip.key;
        el.innerHTML = `<i class="ti ${chip.icon}" style="color:${chip.dot};font-size:13px;flex-shrink:0;"></i>${chip.label}`;
        el.addEventListener('click', () => toggleOverlay(chip.key, el));
        strip.appendChild(el);
    });
}

function toggleOverlay(key, el) {
    el.classList.toggle('active');
    const isActive = el.classList.contains('active');

    if (isActive) {
        showOverlay(key);
    } else {
        removeOverlay(key);
    }
}

function showOverlay(key) {
    removeOverlay(key); // Remove existing first
    const cfg = OVERLAYS[key];
    if (!cfg) return;

    const layers = cfg.countries.map(coords =>
        L.polygon(coords, {
            color: cfg.colour,
            fillColor: cfg.colour,
            fillOpacity: 0.22,
            weight: 1.5,
            dashArray: '4 4'
        })
    );
    overlayLayers[key] = L.layerGroup(layers).addTo(map);
}

function removeOverlay(key) {
    if (overlayLayers[key]) {
        map.removeLayer(overlayLayers[key]);
        delete overlayLayers[key];
    }
}

/* ═══════════════════════════════════════════════
   ENERGY MIX WIDGET
   ═══════════════════════════════════════════════ */
const WIDGET_VIEWS = [
    {
        title: '⚡ Energy Mix',
        render: () => `
      <div class="widget-view active" id="view-mix">
        <div class="widget-header"><span>TYPE</span><span>%</span></div>
        ${widgetRow('Wind', 34, '#2F80ED')}
        ${widgetRow('Solar', 22, '#F2C94C')}
        ${widgetRow('Gas', 21, '#F2994A')}
        ${widgetRow('Nuclear', 12, '#9B51E0')}
        ${widgetRow('Hydro', 8, '#00B8A9')}
        ${widgetRow('Other', 3, '#555')}
        <div class="widget-total">Total Installed: 1,240 GW</div>
      </div>`
    },
    {
        title: '💹 Power Prices',
        render: () => `
      <div class="widget-view active" id="view-prices">
        <div class="widget-header"><span>MARKET</span><span>€/MWh</span></div>
        ${priceRow('DK1 Spot', '44.45', 'down')}
        ${priceRow('TTF Gas', '38.10', 'up')}
        ${priceRow('EU ETS', '66.20', 'up')}
        <div class="widget-total" style="margin-top:8px">Live · 06 Mar 00:00</div>
      </div>`
    },
    {
        title: '📋 Pipeline',
        render: () => `
      <div class="widget-view active" id="view-pipeline">
        <div class="widget-header"><span>STAGE</span><span></span></div>
        ${pipeRow('Permitted', '14 GW', '#27AE60')}
        ${pipeRow('Approved', '31 GW', '#2F80ED')}
        ${pipeRow('In Review', '58 GW', '#F2C94C')}
        ${pipeRow('Proposed', '93 GW', '#888')}
        <div class="widget-total" style="margin-top:8px">Total Pipeline: 196 GW</div>
      </div>`
    }
];

function widgetRow(name, pct, colour) {
    return `<div class="widget-row">
    <span class="widget-name">${name}</span>
    <div class="widget-bar-wrap"><div class="widget-bar" style="width:${pct}%;background:${colour};"></div></div>
    <span class="widget-pct">${pct}%</span>
  </div>`;
}

function priceRow(name, val, dir) {
    const cls = dir === 'up' ? 'price-change-up' : 'price-change-down';
    const sign = dir === 'up' ? '▲' : '▼';
    return `<div class="price-row">
    <span class="price-name">${name}</span>
    <span class="price-val">${val}</span>
    <span class="${cls}">${sign}</span>
  </div>`;
}

function pipeRow(name, val, colour) {
    return `<div class="pipe-row">
    <span class="pipe-name">${name}</span>
    <span class="pipe-tag" style="color:${colour};border-color:${colour}33;">${val}</span>
  </div>`;
}

function buildEnergyWidget() {
    const widget = document.getElementById('energy-widget');
    if (!widget) return;
    renderWidgetView();

    document.getElementById('widget-prev').addEventListener('click', () => {
        widgetPage = (widgetPage - 1 + WIDGET_VIEWS.length) % WIDGET_VIEWS.length;
        renderWidgetView();
    });
    document.getElementById('widget-next').addEventListener('click', () => {
        widgetPage = (widgetPage + 1) % WIDGET_VIEWS.length;
        renderWidgetView();
    });
}

function renderWidgetView() {
    const content = document.getElementById('widget-content');
    const navTitle = document.getElementById('widget-nav-title');
    const view = WIDGET_VIEWS[widgetPage];
    if (content) content.innerHTML = view.render();
    if (navTitle) navTitle.textContent = view.title;
}

/* ═══════════════════════════════════════════════
   MAP CONTROLS (+, −, reset, pin)
   ═══════════════════════════════════════════════ */
function buildMapControls() {
    const z_in = document.getElementById('ctrl-zoom-in');
    const z_out = document.getElementById('ctrl-zoom-out');
    const z_reset = document.getElementById('ctrl-reset');

    if (z_in) z_in.addEventListener('click', () => map.zoomIn());
    if (z_out) z_out.addEventListener('click', () => map.zoomOut());
    if (z_reset) z_reset.addEventListener('click', () => map.setView([20, 10], 2));
}

/* ═══════════════════════════════════════════════
   SCROLL TO SHRINK
   Header 52px, bottom strip 280px full height.
   When bottom strip scrolls down, map-zone shrinks.
   ═══════════════════════════════════════════════ */
function initScrollShrink() {
    const strip = document.getElementById('bottom-strip');
    const mapZone = document.getElementById('map-zone');
    if (!strip || !mapZone) return;

    const headerH = 52;
    const stripH = 280;
    const fullH = () => window.innerHeight - headerH - stripH;
    const minH = 180;

    // Set initial height explicitly
    mapZone.style.height = fullH() + 'px';

    strip.addEventListener('scroll', () => {
        const scrolled = strip.scrollTop;
        const current = fullH();
        const newH = Math.max(minH, current - scrolled * 0.5);
        mapZone.style.height = newH + 'px';
        map.invalidateSize();
    });

    window.addEventListener('resize', () => {
        mapZone.style.height = fullH() + 'px';
        map.invalidateSize();
    });
}

/* ═══════════════════════════════════════════════
   RE-USE HEADER SCRIPT FROM script.js
   (header.js functionality is already in script.js,
    but map.html loads this file standalone)
   ═══════════════════════════════════════════════ */
function initHeaderScript() {
    // Timeline pills
    const timelineSel = document.getElementById('timeline-selector');
    if (timelineSel) {
        timelineSel.addEventListener('click', e => {
            const pill = e.target.closest('.timeline-pill');
            if (!pill) return;
            timelineSel.querySelectorAll('.timeline-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    }

    // Segment pills
    const segPills = document.getElementById('segment-pills');
    if (segPills) {
        segPills.addEventListener('click', e => {
            const pill = e.target.closest('.segment-pill');
            if (!pill) return;
            segPills.querySelectorAll('.segment-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    }

    // Region / Data sources / Panels dropdowns
    ['region-wrapper', 'datasources-wrapper', 'panels-wrapper'].forEach(id => {
        setupDropdown(id, id.replace('-wrapper', '-trigger'), id.replace('-wrapper', '-menu'), id === 'region-wrapper' ? 'region-label' : null);
    });

    // Search bar
    const si = document.getElementById('search-input');
    const sw = document.querySelector('.search-bar-wrapper');
    const sc = document.getElementById('search-clear');
    if (si && sw) {
        si.addEventListener('focus', () => sw.classList.add('focused'));
        si.addEventListener('blur', () => sw.classList.remove('focused'));
    }
    if (sc && si) sc.addEventListener('click', () => { si.value = ''; si.focus(); });

    // Theme toggle
    const btnLight = document.getElementById('btn-light');
    const btnDark = document.getElementById('btn-dark');
    if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
    if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
    setTheme('dark');

    // Refresh button
    const btnUpdate = document.getElementById('btn-update');
    const refreshIcon = document.getElementById('refresh-icon');
    const versionInfo = document.getElementById('version-info');
    if (btnUpdate) {
        btnUpdate.addEventListener('click', () => {
            refreshIcon && refreshIcon.classList.add('spinning');
            versionInfo && versionInfo.classList.add('visible');
            setTimeout(() => refreshIcon && refreshIcon.classList.remove('spinning'), 700);
        });
    }

    // Alerts bell
    const alertsBtn = document.getElementById('alerts-btn');
    const alertsPanel = document.getElementById('alerts-panel');
    if (alertsBtn && alertsPanel) {
        alertsBtn.addEventListener('click', e => {
            e.stopPropagation();
            alertsPanel.hidden = !alertsPanel.hidden;
        });
    }

    // Enercon pill
    const enercon = document.getElementById('enercon-pill');
    const enerDrop = document.getElementById('enercon-dropdown');
    if (enercon && enerDrop) {
        enercon.addEventListener('click', e => {
            e.stopPropagation();
            enerDrop.hidden = !enerDrop.hidden;
        });
    }

    // Global click close
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-wrapper.open').forEach(w => {
            w.classList.remove('open');
            const t = w.querySelector('.dropdown-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (alertsPanel && !alertsPanel.hidden) alertsPanel.hidden = true;
        if (enerDrop && !enerDrop.hidden) enerDrop.hidden = true;
    });
    if (alertsPanel) alertsPanel.addEventListener('click', e => e.stopPropagation());
    if (enerDrop) enerDrop.addEventListener('click', e => e.stopPropagation());
}

function setupDropdown(wrapperId, triggerId, menuId, labelId) {
    const wrapper = document.getElementById(wrapperId);
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    const label = labelId ? document.getElementById(labelId) : null;
    if (!wrapper || !trigger || !menu) return;

    trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = wrapper.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
        document.querySelectorAll('.dropdown-wrapper.open').forEach(w => {
            if (w !== wrapper) { w.classList.remove('open'); }
        });
    });

    menu.addEventListener('click', e => {
        const item = e.target.closest('.dropdown-item');
        if (!item) return;
        menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (label) label.textContent = item.dataset.value || item.textContent.trim();
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    const bl = document.getElementById('btn-light');
    const bd = document.getElementById('btn-dark');
    if (bl) bl.classList.toggle('active', theme === 'light');
    if (bd) bd.classList.toggle('active', theme === 'dark');
}
