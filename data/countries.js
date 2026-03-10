const COUNTRIES_DATA = {
    "Denmark": {
        "name": "Denmark",
        "flag": "🇩🇰",
        "code": "DK",
        "installedRES": "9.8 GW",
        "renewablesShare": "88%",
        "topTech": "Offshore Wind",
        "enerconLevel": 5,
        "investmentGrade": "AA",
        "tags": [
            "Offshore Wind Leader",
            "OECD",
            "High Renewables",
            "Investment Grade"
        ],
        "ministry": "Danish Ministry of Climate",
        "minister": "Lars Aagaard",
        "analystNote": "Denmark is a global leader in offshore wind with 88% renewable electricity share. CIP and other major infrastructure funds are active here. Key investment drivers: strong CfD framework, high grid stability, and ambitious 2030 targets.",
        "technologies": [
            {
                "name": "Offshore Wind",
                "pct": 48
            },
            {
                "name": "Onshore Wind",
                "pct": 31
            },
            {
                "name": "Solar PV",
                "pct": 12
            },
            {
                "name": "Other",
                "pct": 9
            }
        ],
        "risks": {
            "supplySecuity": 15,
            "policyStability": 20,
            "gridReliability": 18,
            "climateRisk": 35,
            "geopolitical": 12
        },
        "weather": {
            "windSpeed": "8.4 m/s",
            "solarIrradiance": "3.2 kWh/m²",
            "temperature": "4°C",
            "waveHeight": "1.8 m"
        },
        "powerPrices": [
            {
                "zone": "DK1 West",
                "price": "44.45 €/MWh",
                "change": "-3.1%"
            },
            {
                "zone": "DK2 East",
                "price": "47.20 €/MWh",
                "change": "+1.2%"
            }
        ],
        "projects": [
            {
                "name": "Hesselø Offshore Wind",
                "developer": "Ørsted / Vattenfall",
                "mw": 1000,
                "status": "development",
                "cod": "2029"
            },
            {
                "name": "Bornholm Energy Island",
                "developer": "Energinet",
                "mw": 2000,
                "status": "development",
                "cod": "2033"
            }
        ],
        "potentials": [
            {
                "id": "DK-Z1",
                "name": "North Sea Energy Island",
                "region": "Dogger Bank East",
                "lat": 56.55,
                "lng": 6.25,
                "tech": "offshore-wind",
                "capacity": "3,000 MW",
                "confidence": "high",
                "summary": "This strategic node represents the future of European grid interconnectivity. Bypassing nearshore spatial constraints, the artificial island concept allows for massive multi-GW pooling of deepwater offshore wind, feeding directly into H2 electrolysis clusters or transmitting via HVDC to multiple markets simultaneously. Bidding frameworks offer significant revenue stacking potential.",
                "kpis": {
                    "capFactor": "54%",
                    "irradiance": "10.4 m/s average",
                    "capex": "€4.2B",
                    "gridDist": "80 km",
                    "lcoe": "€55/MWh"
                },
                "weather": {
                    "months_solar": [
                        1.2,
                        1.8,
                        2.8,
                        4.2,
                        5.8,
                        6.4,
                        6.2,
                        5.1,
                        3.4,
                        2.1,
                        1.1,
                        0.8
                    ],
                    "months_wind": [
                        11.2,
                        10.8,
                        10.1,
                        9.4,
                        8.8,
                        8.2,
                        8.9,
                        9.1,
                        9.8,
                        10.1,
                        10.6,
                        11.4
                    ],
                    "current": {
                        "irradiance": "3.2 kWh/m²",
                        "temp": "12°C",
                        "wind": "10.4 m/s",
                        "rain": "680 mm"
                    }
                },
                "grid": {
                    "substation": "Esbjerg HVDC Hub · 85km",
                    "headroom": "~3,000 MW headroom",
                    "queue": "Secured allocation",
                    "cost": "Included in Island CAPEX"
                },
                "scenarios": {
                    "small": {
                        "mw": "500 MW",
                        "capex": "€1.2B",
                        "opex": "€22.2M",
                        "irr": "6-8%",
                        "payback": "12-14 yrs"
                    },
                    "medium": {
                        "mw": "1,000 MW",
                        "capex": "€2.3B",
                        "opex": "€41.1M",
                        "irr": "7-10%",
                        "payback": "11-13 yrs"
                    },
                    "large": {
                        "mw": "3,000 MW",
                        "capex": "€6.5B",
                        "opex": "€118.8M",
                        "irr": "9-12%",
                        "payback": "10-12 yrs"
                    }
                }
            },
            {
                "id": "DK-Z2",
                "name": "Jutland Bio-Hub",
                "region": "Central Jutland",
                "lat": 56.162,
                "lng": 9.539,
                "tech": "biomass",
                "capacity": "150 MW",
                "confidence": "medium"
            }
        ]
    },
    "Germany": {
        "name": "Germany",
        "flag": "🇩🇪",
        "code": "DE",
        "installedRES": "148 GW",
        "renewablesShare": "52%",
        "topTech": "Onshore Wind",
        "enerconLevel": 4,
        "investmentGrade": "AAA",
        "tags": [
            "Energiewende",
            "Largest EU Market",
            "Phase-out Coal"
        ],
        "ministry": "Federal Ministry for Economic Affairs and Climate Action",
        "minister": "Robert Habeck",
        "analystNote": "Germany is accelerating deployment across wind and solar to meet 80% RES by 2030. Major grid bottlenecks remain a risk, but the new power plant strategy aims to secure firm capacity. Strong industrial off-taker market.",
        "technologies": [
            {
                "name": "Onshore Wind",
                "pct": 41
            },
            {
                "name": "Solar PV",
                "pct": 44
            },
            {
                "name": "Offshore Wind",
                "pct": 6
            },
            {
                "name": "Other",
                "pct": 9
            }
        ],
        "risks": {
            "supplySecuity": 45,
            "policyStability": 30,
            "gridReliability": 35,
            "climateRisk": 25,
            "geopolitical": 40
        },
        "weather": {
            "windSpeed": "6.2 m/s",
            "solarIrradiance": "3.0 kWh/m²",
            "temperature": "9°C",
            "waveHeight": "1.2 m"
        },
        "powerPrices": [
            {
                "zone": "DE/LU Day-Ahead",
                "price": "68.20 €/MWh",
                "change": "-1.5%"
            }
        ],
        "projects": [
            {
                "name": "He Dreiht Offshore",
                "developer": "EnBW",
                "mw": 900,
                "status": "construction",
                "cod": "2025"
            },
            {
                "name": "Witznitz Solar PV",
                "developer": "Signal Iduna",
                "mw": 605,
                "status": "operational",
                "cod": "2024"
            }
        ],
        "potentials": [
            {
                "id": "DE-Z1",
                "name": "Germany Strategic Solar Zone",
                "region": "Central District",
                "lat": 51.165,
                "lng": 10.451,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "DE-Z2",
                "name": "Germany Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 52.165,
                "lng": 11.451,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "United Kingdom": {
        "name": "United Kingdom",
        "flag": "🇬🇧",
        "code": "UK",
        "installedRES": "53 GW",
        "renewablesShare": "41%",
        "topTech": "Offshore Wind",
        "enerconLevel": 5,
        "investmentGrade": "AA",
        "tags": [
            "Offshore Wind Pioneer",
            "CfD Model",
            "Grid Constraints"
        ],
        "ministry": "Department for Energy Security and Net Zero",
        "minister": "Claire Coutinho",
        "analystNote": "The UK possesses the largest installed offshore wind capacity in Europe. While the planning framework is challenging, the CfD system provides long-term revenue certainty. There is a strong pipeline of battery storage projects.",
        "technologies": [
            {
                "name": "Offshore Wind",
                "pct": 28
            },
            {
                "name": "Onshore Wind",
                "pct": 27
            },
            {
                "name": "Solar PV",
                "pct": 29
            },
            {
                "name": "Other",
                "pct": 16
            }
        ],
        "risks": {
            "supplySecuity": 25,
            "policyStability": 35,
            "gridReliability": 55,
            "climateRisk": 30,
            "geopolitical": 15
        },
        "weather": {
            "windSpeed": "7.8 m/s",
            "solarIrradiance": "2.8 kWh/m²",
            "temperature": "10°C",
            "waveHeight": "2.1 m"
        },
        "powerPrices": [
            {
                "zone": "N2EX UK",
                "price": "72.40 £/MWh",
                "change": "+3.2%"
            }
        ],
        "projects": [
            {
                "name": "Dogger Bank Wind",
                "developer": "SSE/Equinor",
                "mw": 3600,
                "status": "construction",
                "cod": "2026"
            },
            {
                "name": "Hornsea 3",
                "developer": "Ørsted",
                "mw": 2852,
                "status": "development",
                "cod": "2027"
            }
        ],
        "potentials": [
            {
                "id": "UK-Z1",
                "name": "United Kingdom Strategic Solar Zone",
                "region": "Central District",
                "lat": 55.378,
                "lng": -3.435,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "UK-Z2",
                "name": "United Kingdom Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 56.378,
                "lng": -2.435,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "Netherlands": {
        "name": "Netherlands",
        "flag": "🇳🇱",
        "code": "NL",
        "installedRES": "33 GW",
        "renewablesShare": "48%",
        "topTech": "Solar PV",
        "enerconLevel": 4,
        "investmentGrade": "AAA",
        "tags": [
            "SDE++ Scheme",
            "North Sea Integration",
            "Grid Congestion"
        ],
        "ministry": "Ministry of Economic Affairs and Climate Policy",
        "minister": "Rob Jetten",
        "analystNote": "The Netherlands has experienced explosive growth in distributed solar and continues ambitious offshore wind auctions. Severe grid congestion is triggering massive investments in flexibility and interconnections.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 60
            },
            {
                "name": "Onshore Wind",
                "pct": 18
            },
            {
                "name": "Offshore Wind",
                "pct": 12
            },
            {
                "name": "Other",
                "pct": 10
            }
        ],
        "risks": {
            "supplySecuity": 20,
            "policyStability": 25,
            "gridReliability": 60,
            "climateRisk": 45,
            "geopolitical": 10
        },
        "weather": {
            "windSpeed": "7.1 m/s",
            "solarIrradiance": "3.1 kWh/m²",
            "temperature": "10°C",
            "waveHeight": "1.5 m"
        },
        "powerPrices": [
            {
                "zone": "EPEX NL",
                "price": "64.10 €/MWh",
                "change": "-4.1%"
            }
        ],
        "projects": [
            {
                "name": "Hollandse Kust Zuid",
                "developer": "Vattenfall",
                "mw": 1500,
                "status": "operational",
                "cod": "2023"
            },
            {
                "name": "Ijmuiden Ver Alpha",
                "developer": "SSE/APG",
                "mw": 2000,
                "status": "development",
                "cod": "2029"
            }
        ],
        "potentials": [
            {
                "id": "NL-Z1",
                "name": "Netherlands Strategic Solar Zone",
                "region": "Central District",
                "lat": 52.132,
                "lng": 5.291,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "NL-Z2",
                "name": "Netherlands Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 53.132,
                "lng": 6.291,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "Norway": {
        "name": "Norway",
        "flag": "🇳🇴",
        "code": "NO",
        "installedRES": "34 GW",
        "renewablesShare": "98%",
        "topTech": "Hydropower",
        "enerconLevel": 5,
        "investmentGrade": "AAA",
        "tags": [
            "Hydropower Giant",
            "Battery of Europe",
            "Emerging Offshore"
        ],
        "ministry": "Ministry of Energy",
        "minister": "Terje Aasland",
        "analystNote": "Norway’s deeply established hydropower portfolio provides exceptional dispatchable baseload. The country evaluates major floating offshore wind expansions in the Utsira Nord region, positioning itself as a net exporter.",
        "technologies": [
            {
                "name": "Hydropower",
                "pct": 88
            },
            {
                "name": "Onshore Wind",
                "pct": 10
            },
            {
                "name": "Solar PV",
                "pct": 1
            },
            {
                "name": "Other",
                "pct": 1
            }
        ],
        "risks": {
            "supplySecuity": 10,
            "policyStability": 15,
            "gridReliability": 10,
            "climateRisk": 20,
            "geopolitical": 5
        },
        "weather": {
            "windSpeed": "7.5 m/s",
            "solarIrradiance": "2.5 kWh/m²",
            "temperature": "2°C",
            "waveHeight": "2.5 m"
        },
        "powerPrices": [
            {
                "zone": "NO2 South",
                "price": "52.30 €/MWh",
                "change": "+1.1%"
            }
        ],
        "projects": [
            {
                "name": "Utsira Nord Floating",
                "developer": "Various",
                "mw": 1500,
                "status": "development",
                "cod": "2030"
            },
            {
                "name": "Fosen Vind",
                "developer": "Statkraft",
                "mw": 1057,
                "status": "operational",
                "cod": "2020"
            }
        ],
        "potentials": [
            {
                "id": "NO-Z1",
                "name": "Norway Strategic Solar Zone",
                "region": "Central District",
                "lat": 60.472,
                "lng": 8.468,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "NO-Z2",
                "name": "Norway Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 61.472,
                "lng": 9.468,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "France": {
        "name": "France",
        "flag": "🇫🇷",
        "code": "FR",
        "installedRES": "66 GW",
        "renewablesShare": "28%",
        "topTech": "Nuclear Base / Hydro",
        "enerconLevel": 3,
        "investmentGrade": "AA",
        "tags": [
            "Nuclear Dominant",
            "Growing RES",
            "Interconnection Hub"
        ],
        "ministry": "Ministry for the Energy Transition",
        "minister": "Agnès Pannier-Runacher",
        "analystNote": "While structurally reliant on its massive nuclear fleet, France accelerates renewables deployment, recently targeting significant expansions in offshore wind. Administrative delays remain a recurring challenge for developers.",
        "technologies": [
            {
                "name": "Hydropower",
                "pct": 39
            },
            {
                "name": "Onshore Wind",
                "pct": 32
            },
            {
                "name": "Solar PV",
                "pct": 24
            },
            {
                "name": "Other",
                "pct": 5
            }
        ],
        "risks": {
            "supplySecuity": 30,
            "policyStability": 40,
            "gridReliability": 20,
            "climateRisk": 30,
            "geopolitical": 15
        },
        "weather": {
            "windSpeed": "6.5 m/s",
            "solarIrradiance": "3.6 kWh/m²",
            "temperature": "12°C",
            "waveHeight": "1.8 m"
        },
        "potentials": [
            {
                "id": "FR-Z1",
                "name": "France Strategic Solar Zone",
                "region": "Central District",
                "lat": 0,
                "lng": 0,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "FR-Z2",
                "name": "France Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 0,
                "lng": 0,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "United States": {
        "name": "United States",
        "flag": "🇺🇸",
        "code": "US",
        "installedRES": "380 GW",
        "renewablesShare": "23%",
        "topTech": "Wind & Solar",
        "enerconLevel": 4,
        "investmentGrade": "AA+",
        "tags": [
            "IRA Subsidy Boom",
            "Grid Interconnection Queues",
            "State Mandates"
        ],
        "ministry": "Department of Energy",
        "minister": "Jennifer Granholm",
        "analystNote": "The IRA has supercharged project pipelines across solar, storage, and onshore wind. Federal tax credits offer incredibly lucrative economics, though local permitting, transmission hurdles, and supply chain constraints moderate total execution speed.",
        "technologies": [
            {
                "name": "Onshore Wind",
                "pct": 38
            },
            {
                "name": "Solar PV",
                "pct": 34
            },
            {
                "name": "Hydropower",
                "pct": 20
            },
            {
                "name": "Other",
                "pct": 8
            }
        ],
        "risks": {
            "supplySecuity": 20,
            "policyStability": 45,
            "gridReliability": 55,
            "climateRisk": 50,
            "geopolitical": 20
        },
        "weather": {
            "windSpeed": "6.8 m/s",
            "solarIrradiance": "4.5 kWh/m²",
            "temperature": "14°C",
            "waveHeight": "1.5 m"
        },
        "powerPrices": [
            {
                "zone": "ERCOT Houston",
                "price": "$45.20/MWh",
                "change": "+12.4%"
            },
            {
                "zone": "CAISO SP15",
                "price": "$32.10/MWh",
                "change": "-5.2%"
            }
        ],
        "projects": [
            {
                "name": "SunZia Wind & Transmission",
                "developer": "Pattern",
                "mw": 3500,
                "status": "construction",
                "cod": "2026"
            },
            {
                "name": "Coastal Virginia Offshore",
                "developer": "Dominion Energy",
                "mw": 2600,
                "status": "construction",
                "cod": "2026"
            }
        ],
        "potentials": [
            {
                "id": "US-Z1",
                "name": "United States Strategic Solar Zone",
                "region": "Central District",
                "lat": 37.09,
                "lng": -95.712,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "US-Z2",
                "name": "United States Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 38.09,
                "lng": -94.712,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "India": {
        "name": "India",
        "flag": "🇮🇳",
        "code": "IN",
        "installedRES": "203 GW",
        "renewablesShare": "44%",
        "topTech": "Solar PV",
        "enerconLevel": 3,
        "investmentGrade": "BBB-",
        "tags": [
            "Massive Growth Market",
            "Solar Mission",
            "Coal Phase-out Risks",
            "Emerging Market"
        ],
        "ministry": "Ministry of New & Renewable Energy",
        "minister": "Pralhad Joshi",
        "analystNote": "India represents one of the largest renewable energy growth markets globally with a 500 GW target by 2030. High solar irradiance and falling costs make utility-scale solar highly competitive. Key risks include grid integration challenges, land acquisition complexity, and currency exposure for foreign investors.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 41
            },
            {
                "name": "Hydropower",
                "pct": 26
            },
            {
                "name": "Onshore Wind",
                "pct": 24
            },
            {
                "name": "Other",
                "pct": 9
            }
        ],
        "powerPrices": [
            {
                "zone": "IEX Day-Ahead",
                "price": "4.82 INR/kWh",
                "change": "+2.1%"
            },
            {
                "zone": "Southern Region",
                "price": "4.61 INR/kWh",
                "change": "-0.8%"
            }
        ],
        "risks": {
            "supplySecuity": 60,
            "policyStability": 50,
            "gridReliability": 65,
            "climateRisk": 60,
            "geopolitical": 35
        },
        "weather": {
            "windSpeed": "5.5 m/s",
            "solarIrradiance": "5.5 kWh/m²",
            "temperature": "25°C",
            "waveHeight": "1.0 m"
        },
        "projects": [
            {
                "name": "Rajasthan Ultra Mega Solar",
                "developer": "SECI",
                "mw": 2000,
                "status": "construction",
                "cod": "2026"
            },
            {
                "name": "Gujarat Hybrid Wind-Solar",
                "developer": "Adani Green",
                "mw": 1440,
                "status": "operational",
                "cod": "2024"
            },
            {
                "name": "Tamil Nadu Offshore Wind",
                "developer": "NIWE / CPCL",
                "mw": 1000,
                "status": "development",
                "cod": "2030"
            }
        ],
        "potentials": [
            {
                "id": "IN-Z1",
                "name": "Rajasthan Desert Solar",
                "region": "Bikaner District",
                "lat": 28.0229,
                "lng": 73.3119,
                "tech": "solar",
                "capacity": "2,000 MW",
                "confidence": "high",
                "summary": "Rajasthan offers exceptional solar resources with 6.1 kWh/m²/day average irradiance — among the highest in Asia. The region's vast flat desert terrain minimises land acquisition complexity and construction costs. Pre-approved solar park zones at Fatehgarh and Bikaner offer ready grid connections, significantly reducing development risk and timeline. State policy offers 25-year PPAs and single-window clearance under the Solar Park Scheme.",
                "kpis": {
                    "capFactor": "23%",
                    "irradiance": "6.1 kWh/m²",
                    "capex": "€580M",
                    "gridDist": "45 km",
                    "lcoe": "€42/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        3.2,
                        3.8,
                        4.1,
                        4.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        3.8,
                        3.1,
                        3.6,
                        3.4
                    ],
                    "current": {
                        "irradiance": "6.1 kWh/m²",
                        "temp": "28°C",
                        "wind": "4.2 m/s",
                        "rain": "380 mm"
                    }
                },
                "grid": {
                    "substation": "Fatehgarh 765kV · 45km",
                    "headroom": "~800 MW headroom",
                    "queue": "12 projects ahead",
                    "cost": "€18-24M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "IN-Z2",
                "name": "Tamil Nadu Offshore",
                "region": "Gulf of Mannar",
                "lat": 8.892,
                "lng": 78.434,
                "tech": "offshore-wind",
                "capacity": "1,500 MW",
                "confidence": "medium",
                "summary": "The Gulf of Mannar presents India's most viable early-stage offshore wind frontier. Featuring consistent wind speeds of 8.2m/s and relatively shallow coastal shelves perfect for fixed-bottom foundations, this zone bypasses the severe land-acquisition bottlenecks faced by onshore projects in the densely populated southern state. The first seabed leasing rounds are anticipated in Q4 2026.",
                "kpis": {
                    "capFactor": "41%",
                    "irradiance": "8.2 m/s average",
                    "capex": "€1.2B",
                    "gridDist": "22 km",
                    "lcoe": "€88/MWh"
                },
                "weather": {
                    "months_solar": [
                        3.2,
                        4.1,
                        5,
                        5.8,
                        6.1,
                        5.9,
                        4.8,
                        4.9,
                        5.4,
                        4.8,
                        3.9,
                        3.1
                    ],
                    "months_wind": [
                        7.2,
                        7.8,
                        8.1,
                        8.4,
                        8.8,
                        8.2,
                        7.9,
                        8.1,
                        7.8,
                        8.1,
                        8.6,
                        8.4
                    ],
                    "current": {
                        "irradiance": "5.2 kWh/m²",
                        "temp": "26°C",
                        "wind": "8.4 m/s",
                        "rain": "920 mm"
                    }
                },
                "grid": {
                    "substation": "Tuticorin 400kV · 22km",
                    "headroom": "~1,200 MW headroom",
                    "queue": "0 projects ahead",
                    "cost": "€45-60M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€750M",
                        "opex": "€12.2M",
                        "irr": "7-9%",
                        "payback": "12-14 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€1.4B",
                        "opex": "€22.1M",
                        "irr": "8-11%",
                        "payback": "11-13 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€2.6B",
                        "opex": "€41.8M",
                        "irr": "9-13%",
                        "payback": "10-12 yrs"
                    }
                }
            },
            {
                "id": "IN-Z3",
                "name": "Gujarat Hybrid Park",
                "region": "Kutch District",
                "lat": 23.733,
                "lng": 69.859,
                "tech": "wind",
                "capacity": "800 MW",
                "confidence": "high"
            }
        ]
    },
    "China": {
        "name": "China",
        "flag": "🇨🇳",
        "code": "CN",
        "installedRES": "1,450 GW",
        "renewablesShare": "32%",
        "topTech": "Solar & Wind",
        "enerconLevel": 2,
        "investmentGrade": "A+",
        "tags": [
            "Scale Leader",
            "Supply Chain Monopoly",
            "Grid Curtailment"
        ],
        "ministry": "National Energy Administration",
        "minister": "Zhang Jianhua",
        "analystNote": "China adds more renewable capacity annually than the rest of the world combined. It utterly dominates global supply chains for PV modules and batteries. Internal grid constraints lead to occasional severe curtailment in remote provinces.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 42
            },
            {
                "name": "Hydropower",
                "pct": 29
            },
            {
                "name": "Onshore Wind",
                "pct": 25
            },
            {
                "name": "Other",
                "pct": 4
            }
        ],
        "risks": {
            "supplySecuity": 35,
            "policyStability": 30,
            "gridReliability": 45,
            "climateRisk": 40,
            "geopolitical": 75
        },
        "weather": {
            "windSpeed": "6.0 m/s",
            "solarIrradiance": "4.0 kWh/m²",
            "temperature": "12°C",
            "waveHeight": "1.4 m"
        },
        "powerPrices": [
            {
                "zone": "Inner Mongolia",
                "price": "280 CNY/MWh",
                "change": "0.0%"
            }
        ],
        "projects": [
            {
                "name": "Kubuqi Desert Solar",
                "developer": "CTG",
                "mw": 2000,
                "status": "construction",
                "cod": "2025"
            },
            {
                "name": "Jieyang Offshore Wind",
                "developer": "SPIC",
                "mw": 900,
                "status": "operational",
                "cod": "2024"
            }
        ],
        "potentials": [
            {
                "id": "CN-Z1",
                "name": "China Strategic Solar Zone",
                "region": "Central District",
                "lat": 35.861,
                "lng": 104.195,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "CN-Z2",
                "name": "China Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 36.861,
                "lng": 105.195,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "Australia": {
        "name": "Australia",
        "flag": "🇦🇺",
        "code": "AU",
        "installedRES": "38 GW",
        "renewablesShare": "35%",
        "topTech": "Solar PV",
        "enerconLevel": 4,
        "investmentGrade": "AAA",
        "tags": [
            "High Penetration",
            "Rooftop Solar Boom",
            "Grid Transition"
        ],
        "ministry": "Department of Climate Change, Energy, the Environment and Water",
        "minister": "Chris Bowen",
        "analystNote": "Australia boasts world-leading decentralized solar metrics but must rapidly upgrade its transmission backbone to support further utility-scale integration. The market sees dramatic price volatility during peak renewable supply hours.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 55
            },
            {
                "name": "Onshore Wind",
                "pct": 28
            },
            {
                "name": "Hydropower",
                "pct": 12
            },
            {
                "name": "Other",
                "pct": 5
            }
        ],
        "risks": {
            "supplySecuity": 20,
            "policyStability": 40,
            "gridReliability": 50,
            "climateRisk": 65,
            "geopolitical": 15
        },
        "weather": {
            "windSpeed": "7.0 m/s",
            "solarIrradiance": "6.0 kWh/m²",
            "temperature": "22°C",
            "waveHeight": "2.0 m"
        },
        "powerPrices": [
            {
                "zone": "NEM NSW",
                "price": "88.40 AUD/MWh",
                "change": "+5.1%"
            },
            {
                "zone": "NEM SA",
                "price": "42.10 AUD/MWh",
                "change": "-15.2%"
            }
        ],
        "projects": [
            {
                "name": "SunCable AAPowerLink",
                "developer": "SunCable",
                "mw": 12000,
                "status": "development",
                "cod": "2030"
            },
            {
                "name": "Golden Plains Wind",
                "developer": "TagEnergy",
                "mw": 1330,
                "status": "construction",
                "cod": "2025"
            }
        ],
        "potentials": [
            {
                "id": "AU-Z1",
                "name": "Australia Strategic Solar Zone",
                "region": "Central District",
                "lat": -25.274,
                "lng": 133.775,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "AU-Z2",
                "name": "Australia Nearshore Wind",
                "region": "Coastal Zone",
                "lat": -24.274,
                "lng": 134.775,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "Brazil": {
        "name": "Brazil",
        "flag": "🇧🇷",
        "code": "BR",
        "installedRES": "185 GW",
        "renewablesShare": "89%",
        "topTech": "Hydropower",
        "enerconLevel": 4,
        "investmentGrade": "BB",
        "tags": [
            "Renewable Powerhouse",
            "Hydropower Dependent",
            "Growing Solar"
        ],
        "ministry": "Ministry of Mines and Energy",
        "minister": "Alexandre Silveira",
        "analystNote": "The Brazilian matrix is exceptionally low carbon due to structural legacy hydropower. Recently, utility-scale wind and distributed solar have driven practically all capacity additions, aided by robust free-market PPAs.",
        "technologies": [
            {
                "name": "Hydropower",
                "pct": 56
            },
            {
                "name": "Solar PV",
                "pct": 18
            },
            {
                "name": "Onshore Wind",
                "pct": 15
            },
            {
                "name": "Biomass",
                "pct": 11
            }
        ],
        "risks": {
            "supplySecuity": 35,
            "policyStability": 40,
            "gridReliability": 40,
            "climateRisk": 55,
            "geopolitical": 20
        },
        "weather": {
            "windSpeed": "7.5 m/s",
            "solarIrradiance": "5.2 kWh/m²",
            "temperature": "25°C",
            "waveHeight": "1.6 m"
        },
        "powerPrices": [
            {
                "zone": "PLD Sudeste/Centro-Oeste",
                "price": "69.04 R$/MWh",
                "change": "0.0%"
            }
        ],
        "projects": [
            {
                "name": "Lagoa dos Ventos",
                "developer": "Enel Green",
                "mw": 1060,
                "status": "operational",
                "cod": "2023"
            },
            {
                "name": "Futura 1 Solar",
                "developer": "Eneva",
                "mw": 870,
                "status": "operational",
                "cod": "2023"
            }
        ],
        "potentials": [
            {
                "id": "BR-Z1",
                "name": "Brazil Strategic Solar Zone",
                "region": "Central District",
                "lat": -14.235,
                "lng": -51.925,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "BR-Z2",
                "name": "Brazil Nearshore Wind",
                "region": "Coastal Zone",
                "lat": -13.235,
                "lng": -50.925,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "Saudi Arabia": {
        "name": "Saudi Arabia",
        "flag": "🇸🇦",
        "code": "SA",
        "installedRES": "3 GW",
        "renewablesShare": "1%",
        "topTech": "Solar PV",
        "enerconLevel": 1,
        "investmentGrade": "A",
        "tags": [
            "Fossil Dominant",
            "Vision 2030 Pivot",
            "Mega Projects"
        ],
        "ministry": "Ministry of Energy",
        "minister": "Prince Abdulaziz bin Salman",
        "analystNote": "Historically an overwhelmingly fossil-powered grid. Under Vision 2030, sweeping GW-scale utility solar tenders aim to drastically shift domestic power generation, freeing up oil for export and initiating green hydrogen corridors.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 85
            },
            {
                "name": "Onshore Wind",
                "pct": 15
            },
            {
                "name": "Hydropower",
                "pct": 0
            },
            {
                "name": "Other",
                "pct": 0
            }
        ],
        "risks": {
            "supplySecuity": 75,
            "policyStability": 20,
            "gridReliability": 25,
            "climateRisk": 65,
            "geopolitical": 60
        },
        "weather": {
            "windSpeed": "6.0 m/s",
            "solarIrradiance": "6.8 kWh/m²",
            "temperature": "28°C",
            "waveHeight": "0.8 m"
        },
        "powerPrices": [
            {
                "zone": "SPPC Standard",
                "price": "0.0104 $/kWh",
                "change": "N/A"
            }
        ],
        "projects": [
            {
                "name": "Sudair Solar PV",
                "developer": "ACWA Power",
                "mw": 1500,
                "status": "construction",
                "cod": "2025"
            },
            {
                "name": "NEOM Green Hydrogen",
                "developer": "Air Products/ACWA",
                "mw": 4000,
                "status": "construction",
                "cod": "2026"
            }
        ],
        "potentials": [
            {
                "id": "SA-Z1",
                "name": "Saudi Arabia Strategic Solar Zone",
                "region": "Central District",
                "lat": 23.885,
                "lng": 45.079,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "SA-Z2",
                "name": "Saudi Arabia Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 24.885,
                "lng": 46.079,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "South Africa": {
        "name": "South Africa",
        "flag": "🇿🇦",
        "code": "ZA",
        "installedRES": "10 GW",
        "renewablesShare": "12%",
        "topTech": "Solar PV & Wind",
        "enerconLevel": 2,
        "investmentGrade": "BB-",
        "tags": [
            "Coal Transition",
            "Load Shedding",
            "REIPPPP Program"
        ],
        "ministry": "Department of Mineral Resources and Energy",
        "minister": "Gwede Mantashe",
        "analystNote": "Chronic power shortages and Eskom load shedding plague the nation. Successive REIPPPP auction windows attempt to crowd in private capital for wind and solar, constrained severely by an undersized legacy grid infrastructure.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 45
            },
            {
                "name": "Onshore Wind",
                "pct": 35
            },
            {
                "name": "Hydropower",
                "pct": 15
            },
            {
                "name": "Other",
                "pct": 5
            }
        ],
        "risks": {
            "supplySecuity": 85,
            "policyStability": 55,
            "gridReliability": 95,
            "climateRisk": 45,
            "geopolitical": 30
        },
        "weather": {
            "windSpeed": "6.5 m/s",
            "solarIrradiance": "5.8 kWh/m²",
            "temperature": "20°C",
            "waveHeight": "2.0 m"
        },
        "potentials": [
            {
                "id": "ZA-Z1",
                "name": "South Africa Strategic Solar Zone",
                "region": "Central District",
                "lat": 0,
                "lng": 0,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "ZA-Z2",
                "name": "South Africa Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 0,
                "lng": 0,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    },
    "Japan": {
        "name": "Japan",
        "flag": "🇯🇵",
        "code": "JP",
        "installedRES": "120 GW",
        "renewablesShare": "22%",
        "topTech": "Solar PV",
        "enerconLevel": 3,
        "investmentGrade": "A+",
        "tags": [
            "Land Constrained",
            "Offshore Mandates",
            "Hydrogen Pivot"
        ],
        "ministry": "Ministry of Economy, Trade and Industry (METI)",
        "minister": "Ken Saito",
        "analystNote": "Severely land-constrained, Japan heavily subsidised early solar. It is now aggressively pivoting towards offshore wind auctions (target 10GW by 2030) and actively subsidises hydrogen/ammonia co-firing networks to secure baseload.",
        "technologies": [
            {
                "name": "Solar PV",
                "pct": 65
            },
            {
                "name": "Hydropower",
                "pct": 25
            },
            {
                "name": "Onshore Wind",
                "pct": 6
            },
            {
                "name": "Other",
                "pct": 4
            }
        ],
        "risks": {
            "supplySecuity": 65,
            "policyStability": 25,
            "gridReliability": 20,
            "climateRisk": 55,
            "geopolitical": 20
        },
        "weather": {
            "windSpeed": "6.0 m/s",
            "solarIrradiance": "3.5 kWh/m²",
            "temperature": "15°C",
            "waveHeight": "1.5 m"
        },
        "potentials": [
            {
                "id": "JP-Z1",
                "name": "Japan Strategic Solar Zone",
                "region": "Central District",
                "lat": 0,
                "lng": 0,
                "tech": "solar",
                "capacity": "1,200 MW",
                "confidence": "high",
                "summary": "Generic investment zone data payload for demo purposes. Offers robust grid connectivity and strong regional backing.",
                "kpis": {
                    "capFactor": "22%",
                    "irradiance": "5.8 kWh/m²",
                    "capex": "€480M",
                    "gridDist": "35 km",
                    "lcoe": "€45/MWh"
                },
                "weather": {
                    "months_solar": [
                        4.2,
                        5.1,
                        6,
                        6.8,
                        7.1,
                        6.9,
                        5.8,
                        5.9,
                        6.4,
                        5.8,
                        4.9,
                        4.1
                    ],
                    "months_wind": [
                        5.2,
                        5.8,
                        6.1,
                        5.4,
                        4.8,
                        4.2,
                        3.9,
                        4.1,
                        4.8,
                        5.1,
                        5.6,
                        5.4
                    ],
                    "current": {
                        "irradiance": "5.8 kWh/m²",
                        "temp": "22°C",
                        "wind": "5.4 m/s",
                        "rain": "500 mm"
                    }
                },
                "grid": {
                    "substation": "Local 400kV Grid · 35km",
                    "headroom": "~500 MW headroom",
                    "queue": "2 projects ahead",
                    "cost": "€12-16M per 100MW"
                },
                "scenarios": {
                    "small": {
                        "mw": "250 MW",
                        "capex": "€175M",
                        "opex": "€3.2M",
                        "irr": "8-10%",
                        "payback": "9-11 yrs"
                    },
                    "medium": {
                        "mw": "500 MW",
                        "capex": "€340M",
                        "opex": "€6.1M",
                        "irr": "9-12%",
                        "payback": "8-10 yrs"
                    },
                    "large": {
                        "mw": "1,000 MW",
                        "capex": "€650M",
                        "opex": "€11.8M",
                        "irr": "10-14%",
                        "payback": "7-9 yrs"
                    }
                }
            },
            {
                "id": "JP-Z2",
                "name": "Japan Nearshore Wind",
                "region": "Coastal Zone",
                "lat": 0,
                "lng": 0,
                "tech": "wind",
                "capacity": "600 MW",
                "confidence": "low"
            }
        ]
    }
};

window.COUNTRIES_DATA = COUNTRIES_DATA;