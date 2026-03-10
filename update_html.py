import re

widget5_html = """
                    <div class="widget-card" id="widget-auctions">
                        <div class="widget-header">
                            <span class="widget-title">AUCTIONS & TENDERS</span>
                            <div class="widget-controls filter-pills">
                                <button class="filter-pill active">All</button>
                                <button class="filter-pill">Wind</button>
                                <button class="filter-pill">Solar</button>
                                <button class="filter-pill">Storage</button>
                            </div>
                        </div>
                        <div class="widget-body scrollable-body">
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇩🇰 Denmark</div>
                                    <div class="auction-name">Nearshore Wind CfD Round 4</div>
                                    <div class="auction-tech">Wind</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">15 Apr 2026</div>
                                    <div class="auction-status status-announced">Announced</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">Nearshore Wind CfD Round 4</div>
                                    <div class="auction-tt-meta">Capacity: 800 MW &middot; Price cap: DKK 900/MWh</div>
                                    <div class="auction-tt-note">Notes: "Fourth CfD round targeting nearshore sites"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇩🇪 Germany</div>
                                    <div class="auction-name">Onshore Wind BNetzA Round 3</div>
                                    <div class="auction-tech">Wind</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">01 May 2026</div>
                                    <div class="auction-status status-ongoing">Ongoing</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">Onshore Wind BNetzA Round 3</div>
                                    <div class="auction-tt-meta">Capacity: 2,100 MW &middot; No price cap</div>
                                    <div class="auction-tt-note">Notes: "Federal auction under EEG 2023 framework"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇬🇧 United Kingdom</div>
                                    <div class="auction-name">AR6 Offshore Wind CfD</div>
                                    <div class="auction-tech">Wind</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">20 May 2026</div>
                                    <div class="auction-status status-announced">Announced</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">AR6 Offshore Wind CfD</div>
                                    <div class="auction-tt-meta">Capacity: 5,000 MW &middot; Strike price TBD</div>
                                    <div class="auction-tt-note">Notes: "Sixth allocation round, offshore wind focus"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇳🇱 Netherlands</div>
                                    <div class="auction-name">SDE++ Solar Round 2026</div>
                                    <div class="auction-tech">Solar</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">30 Apr 2026</div>
                                    <div class="auction-status status-closing">Closing Soon</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">SDE++ Solar Round 2026</div>
                                    <div class="auction-tt-meta">Capacity: 3,000 MW &middot; Max €0.06/kWh</div>
                                    <div class="auction-tt-note">Notes: "Broad renewable support scheme, solar dominant"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇳🇴 Norway</div>
                                    <div class="auction-name">Utsira Nord Floating Offshore</div>
                                    <div class="auction-tech">Wind</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">10 Jun 2026</div>
                                    <div class="auction-status status-announced">Announced</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">Utsira Nord Floating Offshore</div>
                                    <div class="auction-tt-meta">Capacity: 1,500 MW &middot; Price TBD</div>
                                    <div class="auction-tt-note">Notes: "First floating offshore wind tender in Norway"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇫🇷 France</div>
                                    <div class="auction-name">AO CRE 6 Offshore Wind</div>
                                    <div class="auction-tech">Wind</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">25 May 2026</div>
                                    <div class="auction-status status-ongoing">Ongoing</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">AO CRE 6 Offshore Wind</div>
                                    <div class="auction-tt-meta">Capacity: 1,000 MW &middot; €120/MWh ceiling</div>
                                    <div class="auction-tt-note">Notes: "Sixth offshore tender under CRE framework"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇮🇳 India</div>
                                    <div class="auction-name">SECI Solar-Wind Hybrid</div>
                                    <div class="auction-tech">Solar</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">15 Jun 2026</div>
                                    <div class="auction-status status-announced">Announced</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">SECI Solar-Wind Hybrid</div>
                                    <div class="auction-tt-meta">Capacity: 2,500 MW &middot; INR 2.80/kWh ceiling</div>
                                    <div class="auction-tt-note">Notes: "SECI hybrid tender combining solar and wind"</div>
                                </div>
                            </div>
                            <div class="auction-row">
                                <div class="auction-left">
                                    <div class="auction-country">🇦🇺 Australia</div>
                                    <div class="auction-name">NSW Renewable Energy Zone</div>
                                    <div class="auction-tech">Storage</div>
                                </div>
                                <div class="auction-right">
                                    <div class="auction-date">20 Jun 2026</div>
                                    <div class="auction-status status-announced">Announced</div>
                                </div>
                                <div class="auction-tooltip">
                                    <div class="auction-tt-title">NSW Renewable Energy Zone</div>
                                    <div class="auction-tt-meta">Capacity: 1,000 MW storage &middot; AUD 120/MWh</div>
                                    <div class="auction-tt-note">Notes: "Battery storage component of NSW REZ program"</div>
                                </div>
                            </div>
                        </div>
                    </div>
"""

widget6_html = """
                    <div class="widget-card" id="widget-pipeline">
                        <div class="widget-header">
                            <span class="widget-title">PROJECT PIPELINE</span>
                            <div class="widget-controls dropdown-wrap">
                                <button class="dropdown-btn">Nordics ▾</button>
                            </div>
                        </div>
                        <div class="widget-body pipeline-body">
                            <!-- Top section — stage bars -->
                            <div class="stage-row" data-tooltip="1. Thor Offshore Wind (1000 MW) - RWE - DK&#10;2. Hesselø Offshore Wind (800-1200 MW) - TBD - DK&#10;3. Sørlige Nordsjø II (1500 MW) - Ventyr - NO">
                                <span class="stage-name">Development</span>
                                <div class="stage-bar-bg"><div class="stage-bar-fill" style="width: 35%"></div></div>
                                <span class="stage-meta">42 projects &middot; 28.4 GW</span>
                            </div>
                            <div class="stage-row" data-tooltip="1. Aflandshage (300 MW) - HOFOR - DK&#10;2. Storlandet (400 MW) - OX2 - SE&#10;3. Kemi Ajos (72 MW) - OX2 - FI">
                                <span class="stage-name">FID Reached</span>
                                <div class="stage-bar-bg"><div class="stage-bar-fill" style="width: 12%"></div></div>
                                <span class="stage-meta">8 projects &middot; 6.1 GW</span>
                            </div>
                            <div class="stage-row" data-tooltip="1. Dogger Bank C (1200 MW) - Equinor/SSE - UK/NO&#10;2. Vesterhav Syd (170 MW) - Vattenfall - DK&#10;3. Vesterhav Nord (176 MW) - Vattenfall - DK">
                                <span class="stage-name">Construction</span>
                                <div class="stage-bar-bg"><div class="stage-bar-fill" style="width: 8%"></div></div>
                                <span class="stage-meta">5 projects &middot; 3.8 GW</span>
                            </div>
                            <div class="stage-row" data-tooltip="1. Horns Rev 3 (407 MW) - Vattenfall - DK&#10;2. Kriegers Flak (605 MW) - Vattenfall - DK&#10;3. Markbygden 1101 (3400 MW) - Svevind - SE">
                                <span class="stage-name">Operational</span>
                                <div class="stage-bar-bg"><div class="stage-bar-fill" style="width: 55%"></div></div>
                                <span class="stage-meta">61 projects &middot; 41.2 GW</span>
                            </div>

                            <div class="pipeline-divider"></div>

                            <div class="pipeline-total-row">
                                <span class="total-label">TOTAL</span>
                                <span class="total-val">116 projects &middot; 79.5 GW</span>
                            </div>

                            <div class="pipeline-tech-breakdown">
                                <div class="tech-row">
                                    <span class="tech-label">Offshore Wind</span>
                                    <div class="tech-bar-bg"><div class="tech-bar-fill bg-blue-dark" style="width: 45%"></div></div>
                                    <span class="tech-pct">45%</span>
                                </div>
                                <div class="tech-row">
                                    <span class="tech-label">Onshore Wind</span>
                                    <div class="tech-bar-bg"><div class="tech-bar-fill bg-blue-light" style="width: 28%"></div></div>
                                    <span class="tech-pct">28%</span>
                                </div>
                                <div class="tech-row">
                                    <span class="tech-label">Solar PV</span>
                                    <div class="tech-bar-bg"><div class="tech-bar-fill bg-yellow" style="width: 18%"></div></div>
                                    <span class="tech-pct">18%</span>
                                </div>
                                <div class="tech-row">
                                    <span class="tech-label">Storage</span>
                                    <div class="tech-bar-bg"><div class="tech-bar-fill bg-teal" style="width: 9%"></div></div>
                                    <span class="tech-pct">9%</span>
                                </div>
                            </div>
                        </div>
                    </div>
"""

widget7_html = """
                    <div class="widget-card" id="widget-policy">
                        <div class="widget-header">
                            <span class="widget-title">POLICY & REGULATION</span>
                            <div class="widget-controls dropdown-wrap">
                                <button class="dropdown-btn">Europe ▾</button>
                            </div>
                        </div>
                        <div class="widget-body scrollable-body policy-body">
                            <div class="policy-item">
                                <div class="policy-tags"><span class="policy-tag">AUCTION</span><span class="policy-tag">WIND</span></div>
                                <div class="policy-headline">Denmark launches offshore wind CfD consultation for 2026 Nearshore Round 4</div>
                                <div class="policy-meta">🇩🇰 DK &middot; 1 day ago &middot; Danish Energy Agency</div>
                                <div class="policy-tooltip">
                                    <div class="policy-tt-title">WHY IT MATTERS</div>
                                    <div class="policy-tt-note">New auction design may lower strike prices, improving bankability for developers</div>
                                </div>
                            </div>
                            <div class="policy-item">
                                <div class="policy-tags"><span class="policy-tag">GRID</span><span class="policy-tag">PERMIT</span></div>
                                <div class="policy-headline">Germany accelerates grid expansion permits under new planning law — 6 months faster approval</div>
                                <div class="policy-meta">🇩🇪 DE &middot; 2 days ago &middot; Bundesnetzagentur</div>
                                <div class="policy-tooltip">
                                    <div class="policy-tt-title">WHY IT MATTERS</div>
                                    <div class="policy-tt-note">Faster grid connection reduces development risk for onshore wind and solar</div>
                                </div>
                            </div>
                            <div class="policy-item">
                                <div class="policy-tags"><span class="policy-tag">SUBSIDY</span><span class="policy-tag">SOLAR</span></div>
                                <div class="policy-headline">Netherlands extends SDE++ support scheme through 2028 with increased solar allocation</div>
                                <div class="policy-meta">🇳🇱 NL &middot; 3 days ago &middot; RVO</div>
                                <div class="policy-tooltip">
                                    <div class="policy-tt-title">WHY IT MATTERS</div>
                                    <div class="policy-tt-note">Extended subsidy runway improves revenue visibility for solar project finance</div>
                                </div>
                            </div>
                            <div class="policy-item">
                                <div class="policy-tags"><span class="policy-tag">TAX</span><span class="policy-tag">ESG</span></div>
                                <div class="policy-headline">EU Carbon Border Adjustment Mechanism enters full enforcement from January 2027</div>
                                <div class="policy-meta">🇪🇺 EU &middot; 4 days ago &middot; European Commission</div>
                                <div class="policy-tooltip">
                                    <div class="policy-tt-title">WHY IT MATTERS</div>
                                    <div class="policy-tt-note">Raises cost of carbon-intensive imports, improving competitiveness of EU clean energy</div>
                                </div>
                            </div>
                            <div class="policy-item">
                                <div class="policy-tags"><span class="policy-tag">AUCTION</span><span class="policy-tag">STORAGE</span></div>
                                <div class="policy-headline">UK Capacity Market T-4 auction clears at record £75/kW — storage dominates</div>
                                <div class="policy-meta">🇬🇧 UK &middot; 5 days ago &middot; National Grid ESO</div>
                                <div class="policy-tooltip">
                                    <div class="policy-tt-title">WHY IT MATTERS</div>
                                    <div class="policy-tt-note">Strong capacity market prices improve returns for battery storage investments</div>
                                </div>
                            </div>
                            <div class="policy-item">
                                <div class="policy-tags"><span class="policy-tag">PERMIT</span><span class="policy-tag">WIND</span></div>
                                <div class="policy-headline">Norway opens Utsira Nord licensing round for floating offshore wind — 3 areas available</div>
                                <div class="policy-meta">🇳🇴 NO &middot; 6 days ago &middot; Norwegian Energy Authority</div>
                                <div class="policy-tooltip">
                                    <div class="policy-tt-title">WHY IT MATTERS</div>
                                    <div class="policy-tt-note">First commercial floating wind market opens significant new investment opportunity</div>
                                </div>
                            </div>
                        </div>
                    </div>
"""

widget8_html = """
                    <div class="widget-card" id="widget-risk">
                        <div class="widget-header">
                            <span class="widget-title">RISK & ALERTS</span>
                            <div class="widget-controls risk-filters">
                                <button class="risk-filter-btn" data-type="conflict">🔴</button>
                                <button class="risk-filter-btn" data-type="policy">🟠</button>
                                <button class="risk-filter-btn" data-type="price">🟡</button>
                                <button class="risk-filter-btn" data-type="grid">🟣</button>
                                <button class="risk-filter-btn" data-type="weather">🌩</button>
                            </div>
                        </div>
                        <div class="widget-body scrollable-body risk-body">
                            <div class="risk-item" data-type="conflict" data-country="Middle East">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-red"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">Red Sea shipping disruptions affecting LNG tanker routes to Europe</div>
                                        <div class="risk-meta">Middle East &middot; 2h ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity high">High</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>LNG supply delays to EU terminals</li>
                                        <li>upward pressure on TTF gas prices</li>
                                        <li>potential impact on energy security margins</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="policy" data-country="Germany">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-orange"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">Germany delays offshore wind grid connection by 18 months — Bundesnetzagentur</div>
                                        <div class="risk-meta">DE &middot; 4h ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity high">High</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Developer timelines pushed back</li>
                                        <li>potential FID delays on 3 major projects</li>
                                        <li>financing risk increases</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="price" data-country="Europe">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-yellow"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">EU power prices spike 40% in 3 days due to cold snap across Central Europe</div>
                                        <div class="risk-meta">EU &middot; 6h ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity med">Med</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Short-term revenue boost for operational assets</li>
                                        <li>grid stress risk rising</li>
                                        <li>demand response mechanisms activated</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="grid" data-country="Denmark">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-purple"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">Denmark-Germany interconnector Kontek operating at reduced capacity — maintenance</div>
                                        <div class="risk-meta">DK/DE &middot; 8h ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity med">Med</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Power price spread between DK1 and DE widens</li>
                                        <li>curtailment risk for Danish wind assets increases</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="weather" data-country="Norway">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-weather"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">Storm Ingunn forecast for North Sea — offshore wind operations suspended</div>
                                        <div class="risk-meta">NO/UK &middot; 10h ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity med">Med</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Temporary generation loss for North Sea offshore assets</li>
                                        <li>monitoring required for asset damage</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="policy" data-country="UK">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-orange"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">UK CfD contract terms under review — indexation clause may be removed</div>
                                        <div class="risk-meta">UK &middot; 12h ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity low">Low</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Revenue certainty reduced for future UK offshore projects</li>
                                        <li>investor confidence monitoring required</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="conflict" data-country="Asia">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-red"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">Myanmar energy infrastructure targeted in ongoing conflict</div>
                                        <div class="risk-meta">Asia &middot; 1d ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity high">High</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Asset damage risk for regional energy infrastructure</li>
                                        <li>no direct EU portfolio exposure</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="risk-item" data-type="weather" data-country="Spain">
                                <div class="risk-item-header">
                                    <div class="risk-dot bg-weather"></div>
                                    <div class="risk-center">
                                        <div class="risk-title">Drought conditions in Iberian Peninsula reducing hydropower output by 35%</div>
                                        <div class="risk-meta">ES/PT &middot; 1d ago</div>
                                    </div>
                                    <div class="risk-right">
                                        <span class="risk-severity low">Low</span>
                                    </div>
                                </div>
                                <div class="risk-detail-panel">
                                    <div class="risk-impact-label">Impact:</div>
                                    <ul class="risk-impact-list">
                                        <li>Increased gas generation compensating</li>
                                        <li>upward pressure on Iberian power prices</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
"""

full_html = widget5_html + widget6_html + widget7_html + widget8_html

# We want to replace 4 instances of <div class="widget-card-placeholder">Widget coming soon</div>
# with the full_html in one go.

def process_file(path):
    with open(path, 'r') as f:
        content = f.read()

    # The 4 placeholders are typically on consecutive lines inside a .widget-grid
    # Let's find them with regex
    pattern = r'<div class="widget-card-placeholder">Widget coming soon</div>\s*<div class="widget-card-placeholder">Widget coming soon</div>\s*<div class="widget-card-placeholder">Widget coming soon</div>\s*<div class="widget-card-placeholder">Widget coming soon</div>'
    
    new_content = re.sub(pattern, full_html.strip(), content)
    
    with open(path, 'w') as f:
        f.write(new_content)
    
    print(f"Updated {path}")

process_file('/Users/deshmukh_03/Documents/Kalpana/index.html')
process_file('/Users/deshmukh_03/Documents/Kalpana/map.html')
