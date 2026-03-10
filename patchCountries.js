const fs = require('fs');

const raw = fs.readFileSync('data/countries.js', 'utf8');
// remove the "const COUNTRIES_DATA =" and "window.COUNTRIES_DATA = COUNTRIES_DATA;" parts to parse json
let jsonStr = raw.replace('const COUNTRIES_DATA = ', '').replace('window.COUNTRIES_DATA = COUNTRIES_DATA;', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

// eval since keys might not be quoted
let COUNTRIES_DATA;
eval('COUNTRIES_DATA = ' + jsonStr);

// 1. Overwrite India
COUNTRIES_DATA["India"] = {
    name: "India",
    flag: "🇮🇳",
    code: "IN",
    installedRES: "203 GW",
    renewablesShare: "44%",
    topTech: "Solar PV",
    enerconLevel: 3,
    investmentGrade: "BBB-",
    tags: ["Massive Growth Market", "Solar Mission", "Coal Phase-out Risks", "Emerging Market"],
    ministry: "Ministry of New & Renewable Energy",
    minister: "Pralhad Joshi",
    analystNote: "India represents one of the largest renewable energy growth markets globally with a 500 GW target by 2030. High solar irradiance and falling costs make utility-scale solar highly competitive. Key risks include grid integration challenges, land acquisition complexity, and currency exposure for foreign investors.",
    technologies: [
        { name: "Solar PV", pct: 41 },
        { name: "Hydropower", pct: 26 },
        { name: "Onshore Wind", pct: 24 },
        { name: "Other", pct: 9 }
    ],
    powerPrices: [
        { zone: "IEX Day-Ahead", price: "4.82 INR/kWh", change: "+2.1%" },
        { zone: "Southern Region", price: "4.61 INR/kWh", change: "-0.8%" }
    ],
    risks: {
        supplySecuity: 60,
        policyStability: 50,
        gridReliability: 65,
        climateRisk: 60,
        geopolitical: 35
    },
    weather: {
        windSpeed: "5.5 m/s",
        solarIrradiance: "5.5 kWh/m²",
        temperature: "25°C",
        waveHeight: "1.0 m"
    },
    projects: [
        { name: "Rajasthan Ultra Mega Solar", developer: "SECI", mw: 2000, status: "construction", cod: "2026" },
        { name: "Gujarat Hybrid Wind-Solar", developer: "Adani Green", mw: 1440, status: "operational", cod: "2024" },
        { name: "Tamil Nadu Offshore Wind", developer: "NIWE / CPCL", mw: 1000, status: "development", cod: "2030" }
    ]
};

// Add unique projects and prices to other specific countries
const uniqueAdditions = {
    "Germany": {
        powerPrices: [{ zone: "DE/LU Day-Ahead", price: "68.20 €/MWh", change: "-1.5%" }],
        projects: [{ name: "He Dreiht Offshore", developer: "EnBW", mw: 900, status: "construction", cod: "2025" }, { name: "Witznitz Solar PV", developer: "Signal Iduna", mw: 605, status: "operational", cod: "2024" }]
    },
    "United Kingdom": {
        powerPrices: [{ zone: "N2EX UK", price: "72.40 £/MWh", change: "+3.2%" }],
        projects: [{ name: "Dogger Bank Wind", developer: "SSE/Equinor", mw: 3600, status: "construction", cod: "2026" }, { name: "Hornsea 3", developer: "Ørsted", mw: 2852, status: "development", cod: "2027" }]
    },
    "Netherlands": {
        powerPrices: [{ zone: "EPEX NL", price: "64.10 €/MWh", change: "-4.1%" }],
        projects: [{ name: "Hollandse Kust Zuid", developer: "Vattenfall", mw: 1500, status: "operational", cod: "2023" }, { name: "Ijmuiden Ver Alpha", developer: "SSE/APG", mw: 2000, status: "development", cod: "2029" }]
    },
    "Norway": {
        powerPrices: [{ zone: "NO2 South", price: "52.30 €/MWh", change: "+1.1%" }],
        projects: [{ name: "Utsira Nord Floating", developer: "Various", mw: 1500, status: "development", cod: "2030" }, { name: "Fosen Vind", developer: "Statkraft", mw: 1057, status: "operational", cod: "2020" }]
    },
    "United States": {
        powerPrices: [{ zone: "ERCOT Houston", price: "$45.20/MWh", change: "+12.4%" }, { zone: "CAISO SP15", price: "$32.10/MWh", change: "-5.2%" }],
        projects: [{ name: "SunZia Wind & Transmission", developer: "Pattern", mw: 3500, status: "construction", cod: "2026" }, { name: "Coastal Virginia Offshore", developer: "Dominion Energy", mw: 2600, status: "construction", cod: "2026" }]
    },
    "China": {
        powerPrices: [{ zone: "Inner Mongolia", price: "280 CNY/MWh", change: "0.0%" }],
        projects: [{ name: "Kubuqi Desert Solar", developer: "CTG", mw: 2000, status: "construction", cod: "2025" }, { name: "Jieyang Offshore Wind", developer: "SPIC", mw: 900, status: "operational", cod: "2024" }]
    },
    "Australia": {
        powerPrices: [{ zone: "NEM NSW", price: "88.40 AUD/MWh", change: "+5.1%" }, { zone: "NEM SA", price: "42.10 AUD/MWh", change: "-15.2%" }],
        projects: [{ name: "SunCable AAPowerLink", developer: "SunCable", mw: 12000, status: "development", cod: "2030" }, { name: "Golden Plains Wind", developer: "TagEnergy", mw: 1330, status: "construction", cod: "2025" }]
    },
    "Brazil": {
        powerPrices: [{ zone: "PLD Sudeste/Centro-Oeste", price: "69.04 R$/MWh", change: "0.0%" }],
        projects: [{ name: "Lagoa dos Ventos", developer: "Enel Green", mw: 1060, status: "operational", cod: "2023" }, { name: "Futura 1 Solar", developer: "Eneva", mw: 870, status: "operational", cod: "2023" }]
    },
    "Saudi Arabia": {
        powerPrices: [{ zone: "SPPC Standard", price: "0.0104 $/kWh", change: "N/A" }],
        projects: [{ name: "Sudair Solar PV", developer: "ACWA Power", mw: 1500, status: "construction", cod: "2025" }, { name: "NEOM Green Hydrogen", developer: "Air Products/ACWA", mw: 4000, status: "construction", cod: "2026" }]
    },
    "Denmark": {
        powerPrices: [{ zone: "DK1 West", price: "44.45 €/MWh", change: "-3.1%" }, { zone: "DK2 East", price: "47.20 €/MWh", change: "+1.2%" }],
        projects: [{ name: "Hesselø Offshore Wind", developer: "Ørsted / Vattenfall", mw: 1000, status: "development", cod: "2029" }, { name: "Bornholm Energy Island", developer: "Energinet", mw: 2000, status: "development", cod: "2033" }]
    }
};

for (const [country, additions] of Object.entries(uniqueAdditions)) {
    if (COUNTRIES_DATA[country]) {
        Object.assign(COUNTRIES_DATA[country], additions);
    }
}

// Convert back to string and save
const output = `const COUNTRIES_DATA = ${JSON.stringify(COUNTRIES_DATA, null, 4)};\n\nwindow.COUNTRIES_DATA = COUNTRIES_DATA;`;
fs.writeFileSync('data/countries.js', output, 'utf8');
console.log("data/countries.js updated successfully");
