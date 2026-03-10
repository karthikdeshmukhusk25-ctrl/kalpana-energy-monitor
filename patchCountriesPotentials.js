const fs = require('fs');

const raw = fs.readFileSync('data/countries.js', 'utf8');
let jsonStr = raw.replace('const COUNTRIES_DATA = ', '').replace('window.COUNTRIES_DATA = COUNTRIES_DATA;', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

let COUNTRIES_DATA;
eval('COUNTRIES_DATA = ' + jsonStr);

// Shared Potential Data blocks
const indiaPotentials = [
    {
        id: "IN-Z1",
        name: "Rajasthan Desert Solar",
        region: "Bikaner District",
        lat: 28.0229,
        lng: 73.3119,
        tech: "solar",
        capacity: "2,000 MW",
        confidence: "high",
        summary: "Rajasthan offers exceptional solar resources with 6.1 kWh/m²/day average irradiance — among the highest in Asia. The region's vast flat desert terrain minimises land acquisition complexity and construction costs. Pre-approved solar park zones at Fatehgarh and Bikaner offer ready grid connections, significantly reducing development risk and timeline. State policy offers 25-year PPAs and single-window clearance under the Solar Park Scheme.",
        kpis: {
            capFactor: "23%",
            irradiance: "6.1 kWh/m²",
            capex: "€580M",
            gridDist: "45 km",
            lcoe: "€42/MWh"
        },
        weather: {
            months_solar: [4.2, 5.1, 6.0, 6.8, 7.1, 6.9, 5.8, 5.9, 6.4, 5.8, 4.9, 4.1],
            months_wind: [3.2, 3.8, 4.1, 4.4, 4.8, 4.2, 3.9, 4.1, 3.8, 3.1, 3.6, 3.4],
            current: { irradiance: "6.1 kWh/m²", temp: "28°C", wind: "4.2 m/s", rain: "380 mm" }
        },
        grid: {
            substation: "Fatehgarh 765kV · 45km",
            headroom: "~800 MW headroom",
            queue: "12 projects ahead",
            cost: "€18-24M per 100MW"
        },
        scenarios: {
            small: { mw: "250 MW", capex: "€175M", opex: "€3.2M", irr: "8-10%", payback: "9-11 yrs" },
            medium: { mw: "500 MW", capex: "€340M", opex: "€6.1M", irr: "9-12%", payback: "8-10 yrs" },
            large: { mw: "1,000 MW", capex: "€650M", opex: "€11.8M", irr: "10-14%", payback: "7-9 yrs" }
        }
    },
    {
        id: "IN-Z2",
        name: "Tamil Nadu Offshore",
        region: "Gulf of Mannar",
        lat: 8.892,
        lng: 78.434,
        tech: "offshore-wind",
        capacity: "1,500 MW",
        confidence: "medium",
        summary: "The Gulf of Mannar presents India's most viable early-stage offshore wind frontier. Featuring consistent wind speeds of 8.2m/s and relatively shallow coastal shelves perfect for fixed-bottom foundations, this zone bypasses the severe land-acquisition bottlenecks faced by onshore projects in the densely populated southern state. The first seabed leasing rounds are anticipated in Q4 2026.",
        kpis: {
            capFactor: "41%",
            irradiance: "8.2 m/s average",
            capex: "€1.2B",
            gridDist: "22 km",
            lcoe: "€88/MWh"
        },
        weather: {
            months_solar: [3.2, 4.1, 5.0, 5.8, 6.1, 5.9, 4.8, 4.9, 5.4, 4.8, 3.9, 3.1],
            months_wind: [7.2, 7.8, 8.1, 8.4, 8.8, 8.2, 7.9, 8.1, 7.8, 8.1, 8.6, 8.4],
            current: { irradiance: "5.2 kWh/m²", temp: "26°C", wind: "8.4 m/s", rain: "920 mm" }
        },
        grid: {
            substation: "Tuticorin 400kV · 22km",
            headroom: "~1,200 MW headroom",
            queue: "0 projects ahead",
            cost: "€45-60M per 100MW"
        },
        scenarios: {
            small: { mw: "250 MW", capex: "€750M", opex: "€12.2M", irr: "7-9%", payback: "12-14 yrs" },
            medium: { mw: "500 MW", capex: "€1.4B", opex: "€22.1M", irr: "8-11%", payback: "11-13 yrs" },
            large: { mw: "1,000 MW", capex: "€2.6B", opex: "€41.8M", irr: "9-13%", payback: "10-12 yrs" }
        }
    },
    {
        id: "IN-Z3",
        name: "Gujarat Hybrid Park",
        region: "Kutch District",
        lat: 23.733,
        lng: 69.859,
        tech: "wind",
        capacity: "800 MW",
        confidence: "high"
    }
];

const denmarkPotentials = [
    {
        id: "DK-Z1",
        name: "North Sea Energy Island",
        region: "Dogger Bank East",
        lat: 56.55,
        lng: 6.25,
        tech: "offshore-wind",
        capacity: "3,000 MW",
        confidence: "high",
        summary: "This strategic node represents the future of European grid interconnectivity. Bypassing nearshore spatial constraints, the artificial island concept allows for massive multi-GW pooling of deepwater offshore wind, feeding directly into H2 electrolysis clusters or transmitting via HVDC to multiple markets simultaneously. Bidding frameworks offer significant revenue stacking potential.",
        kpis: {
            capFactor: "54%",
            irradiance: "10.4 m/s average",
            capex: "€4.2B",
            gridDist: "80 km",
            lcoe: "€55/MWh"
        },
        weather: {
            months_solar: [1.2, 1.8, 2.8, 4.2, 5.8, 6.4, 6.2, 5.1, 3.4, 2.1, 1.1, 0.8],
            months_wind: [11.2, 10.8, 10.1, 9.4, 8.8, 8.2, 8.9, 9.1, 9.8, 10.1, 10.6, 11.4],
            current: { irradiance: "3.2 kWh/m²", temp: "12°C", wind: "10.4 m/s", rain: "680 mm" }
        },
        grid: {
            substation: "Esbjerg HVDC Hub · 85km",
            headroom: "~3,000 MW headroom",
            queue: "Secured allocation",
            cost: "Included in Island CAPEX"
        },
        scenarios: {
            small: { mw: "500 MW", capex: "€1.2B", opex: "€22.2M", irr: "6-8%", payback: "12-14 yrs" },
            medium: { mw: "1,000 MW", capex: "€2.3B", opex: "€41.1M", irr: "7-10%", payback: "11-13 yrs" },
            large: { mw: "3,000 MW", capex: "€6.5B", opex: "€118.8M", irr: "9-12%", payback: "10-12 yrs" }
        }
    },
    {
        id: "DK-Z2",
        name: "Jutland Bio-Hub",
        region: "Central Jutland",
        lat: 56.162,
        lng: 9.539,
        tech: "biomass",
        capacity: "150 MW",
        confidence: "medium"
    }
];

// Append specific mocks, generic otherwise
for (const country of Object.keys(COUNTRIES_DATA)) {
    if (country === "India") {
        COUNTRIES_DATA[country].potentials = indiaPotentials;
    } else if (country === "Denmark") {
        COUNTRIES_DATA[country].potentials = denmarkPotentials;
    } else {
        // Generic Mock for all others
        COUNTRIES_DATA[country].potentials = [
            {
                id: COUNTRIES_DATA[country].code + "-Z1",
                name: country + " Strategic Solar Zone",
                region: "Central District",
                lat: 0, // Placeholder
                lng: 0,
                tech: "solar",
                capacity: "1,200 MW",
                confidence: "high",
                summary: "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                kpis: {
                    capFactor: "22%",
                    irradiance: "5.8 kWh/m²",
                    capex: "€480M",
                    gridDist: "35 km",
                    lcoe: "€45/MWh"
                },
                weather: {
                    months_solar: [4.2, 5.1, 6.0, 6.8, 7.1, 6.9, 5.8, 5.9, 6.4, 5.8, 4.9, 4.1],
                    months_wind: [5.2, 5.8, 6.1, 5.4, 4.8, 4.2, 3.9, 4.1, 4.8, 5.1, 5.6, 5.4],
                    current: { irradiance: "5.8 kWh/m²", temp: "22°C", wind: "5.4 m/s", rain: "500 mm" }
                },
                grid: {
                    substation: "Local 400kV Grid · 35km",
                    headroom: "~500 MW headroom",
                    queue: "2 projects ahead",
                    cost: "€12-16M per 100MW"
                },
                scenarios: {
                    small: { mw: "250 MW", capex: "€175M", opex: "€3.2M", irr: "8-10%", payback: "9-11 yrs" },
                    medium: { mw: "500 MW", capex: "€340M", opex: "€6.1M", irr: "9-12%", payback: "8-10 yrs" },
                    large: { mw: "1,000 MW", capex: "€650M", opex: "€11.8M", irr: "10-14%", payback: "7-9 yrs" }
                }
            },
            {
                id: COUNTRIES_DATA[country].code + "-Z2",
                name: country + " Nearshore Wind",
                region: "Coastal Zone",
                lat: 0,
                lng: 0,
                tech: "wind",
                capacity: "600 MW",
                confidence: "low"
            }
        ];
    }
}

// Fix Coordinates for Generic Map Spawns based on Capital approximate
const coords = {
    "Germany": [51.165, 10.451],
    "United Kingdom": [55.378, -3.435],
    "Netherlands": [52.132, 5.291],
    "Norway": [60.472, 8.468],
    "United States": [37.090, -95.712],
    "China": [35.861, 104.195],
    "Australia": [-25.274, 133.775],
    "Brazil": [-14.235, -51.925],
    "Saudi Arabia": [23.885, 45.079]
};

for (const [c, cg] of Object.entries(coords)) {
    if (COUNTRIES_DATA[c] && COUNTRIES_DATA[c].potentials) {
        COUNTRIES_DATA[c].potentials[0].lat = cg[0];
        COUNTRIES_DATA[c].potentials[0].lng = cg[1];
        COUNTRIES_DATA[c].potentials[1].lat = cg[0] + 1;
        COUNTRIES_DATA[c].potentials[1].lng = cg[1] + 1;
    }
}

const output = `const COUNTRIES_DATA = ${JSON.stringify(COUNTRIES_DATA, null, 4)};\n\nwindow.COUNTRIES_DATA = COUNTRIES_DATA;`;
fs.writeFileSync('data/countries.js', output, 'utf8');
console.log("Potentials data injected successfully");
