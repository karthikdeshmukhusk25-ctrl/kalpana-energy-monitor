custom_css = """

/* ═══════════════════════════════════════════════════
   WIDGET 5 — AUCTIONS & TENDERS
   ═══════════════════════════════════════════════════ */
.filter-pills {
    display: flex;
    gap: 4px;
}
.filter-pill {
    background: #242424;
    color: #888;
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 10px;
    font-family: 'Ubuntu Mono', monospace;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
}
.filter-pill.active {
    background: #2F80ED;
    color: #fff;
}
.filter-pill:hover:not(.active) {
    background: #2A2A2A;
    color: #ccc;
}

.scrollable-body {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #333 #1A1A1A;
    flex: 1;
    display: flex;
    flex-direction: column;
}
.scrollable-body::-webkit-scrollbar {
    width: 4px;
}
.scrollable-body::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 2px;
}

.auction-row {
    height: 52px;
    min-height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 4px;
    border-bottom: 1px solid #2A2A2A;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
    flex-shrink: 0;
}
.auction-row:hover {
    background: #242424;
}

.auction-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.auction-country {
    color: #fff;
    font-size: 12px;
    font-weight: 600;
}
.auction-name {
    color: #888;
    font-size: 10px;
}
.auction-tech {
    display: inline-block;
    background: #2A2A2A;
    color: #888;
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 9px;
    width: max-content;
}

.auction-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
}
.auction-date {
    color: #fff;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
}
.auction-status {
    color: #fff;
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 9px;
    text-align: center;
}
.status-announced { background: #2F80ED; }
.status-ongoing { background: #27AE60; }
.status-closing { background: #F2994A; }

.auction-tooltip {
    display: none;
    position: absolute;
    bottom: calc(100% + 4px);
    left: 10px;
    background: #2A2A2A;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 12px;
    z-index: 9999;
    width: 220px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    flex-direction: column;
    gap: 4px;
    pointer-events: none;
}
.auction-row:hover .auction-tooltip {
    display: flex;
}
.auction-tt-title {
    font-size: 11px;
    font-weight: bold;
    color: #fff;
}
.auction-tt-meta {
    font-size: 10px;
    color: #ccc;
}
.auction-tt-note {
    font-size: 10px;
    color: #888;
    font-style: italic;
    line-height: 1.3;
}


/* ═══════════════════════════════════════════════════
   WIDGET 6 — PROJECT PIPELINE
   ═══════════════════════════════════════════════════ */
.dropdown-wrap {
    position: relative;
}
.dropdown-btn {
    background: transparent;
    color: #888;
    border: none;
    font-size: 11px;
    font-family: 'Ubuntu Mono', monospace;
    cursor: pointer;
}
.dropdown-btn:hover { color: #fff; }

.pipeline-body {
    display: flex;
    flex-direction: column;
}
.stage-row {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #2A2A2A;
    padding: 4px 0;
    position: relative;
    cursor: pointer;
}
.stage-row:hover {
    background: #242424;
}
.stage-name {
    color: #fff;
    font-size: 12px;
    width: 80px;
}
.stage-bar-bg {
    flex: 1;
    background: #242424;
    height: 6px;
    border-radius: 3px;
    margin: 0 10px;
    overflow: hidden;
}
.stage-bar-fill {
    height: 100%;
    background: #2F80ED;
    border-radius: 3px;
}
.stage-meta {
    color: #888;
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    text-align: right;
    width: 130px;
}

.stage-row[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    right: 0;
    background: #2A2A2A;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 8px;
    font-size: 10px;
    color: #ccc;
    white-space: pre-wrap;
    z-index: 9999;
    width: 200px;
    line-height: 1.4;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.pipeline-divider {
    height: 1px;
    background: #2A2A2A;
    margin: 8px 0;
}
.pipeline-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.total-label {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
}
.total-val {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    font-family: 'JetBrains Mono', monospace;
}

.pipeline-tech-breakdown {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.tech-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tech-label {
    color: #888;
    font-size: 10px;
    width: 80px;
}
.tech-bar-bg {
    width: 80px;
    background: #242424;
    height: 6px;
    border-radius: 3px;
    margin: 0 10px;
    overflow: hidden;
}
.tech-bar-fill {
    height: 100%;
    border-radius: 3px;
}
.bg-blue-dark { background: #2F80ED; }
.bg-blue-light { background: #56CCF2; }
.bg-yellow { background: #F2C94C; }
.bg-teal { background: #27AE60; }
.tech-pct {
    color: #888;
    font-size: 10px;
    width: 24px;
    text-align: right;
}


/* ═══════════════════════════════════════════════════
   WIDGET 7 — POLICY & REGULATION
   ═══════════════════════════════════════════════════ */
.policy-item {
    padding: 8px 4px;
    border-bottom: 1px solid #2A2A2A;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.policy-item:hover {
    background: #242424;
}
.policy-tags {
    display: flex;
    gap: 4px;
}
.policy-tag {
    background: #2A2A2A;
    color: #888;
    border-radius: 6px;
    padding: 2px 6px;
    font-size: 9px;
}
.policy-headline {
    color: #fff;
    font-size: 12px;
    line-height: 1.4;
}
.policy-meta {
    color: #888;
    font-size: 10px;
}

.policy-tooltip {
    display: none;
    position: absolute;
    bottom: calc(100% + 4px);
    left: 10px;
    background: #2A2A2A;
    border: 1px solid #2F80ED;
    border-radius: 8px;
    padding: 10px;
    z-index: 9999;
    max-width: 220px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    flex-direction: column;
    gap: 4px;
    pointer-events: none;
}
.policy-item:hover .policy-tooltip {
    display: flex;
}
.policy-tt-title {
    font-size: 10px;
    font-weight: bold;
    color: #666;
}
.policy-tt-note {
    font-size: 11px;
    color: #fff;
    font-style: italic;
    line-height: 1.4;
}


/* ═══════════════════════════════════════════════════
   WIDGET 8 — RISK & ALERTS
   ═══════════════════════════════════════════════════ */
.risk-filters {
    display: flex;
    gap: 4px;
}
.risk-filter-btn {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: none;
    background: #242424;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    transition: all 0.15s;
}
.risk-filter-btn.active[data-type="conflict"] { background: rgba(235, 87, 87, 0.3); }
.risk-filter-btn.active[data-type="policy"] { background: rgba(242, 153, 74, 0.3); }
.risk-filter-btn.active[data-type="price"] { background: rgba(242, 201, 76, 0.3); }
.risk-filter-btn.active[data-type="grid"] { background: rgba(155, 81, 224, 0.3); }
.risk-filter-btn.active[data-type="weather"] { background: rgba(86, 204, 242, 0.3); }

.risk-item {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #2A2A2A;
}
.risk-item-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 4px;
    cursor: pointer;
    transition: background 0.15s;
}
.risk-item-header:hover {
    background: #242424;
}
.risk-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
}
.bg-red { background: #EB5757; }
.bg-orange { background: #F2994A; }
.bg-yellow { background: #F2C94C; }
.bg-purple { background: #9B51E0; }
.bg-weather { background: #56CCF2; }

.risk-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.risk-title {
    color: #fff;
    font-size: 12px;
    line-height: 1.3;
}
.risk-meta {
    color: #888;
    font-size: 10px;
}
.risk-right {
    flex-shrink: 0;
    margin-top: 2px;
}
.risk-severity {
    color: #fff;
    border-radius: 20px;
    padding: 2px 6px;
    font-size: 9px;
    font-family: 'Ubuntu Mono', monospace;
}
.risk-severity.high { background: #EB5757; }
.risk-severity.med { background: #F2994A; }
.risk-severity.low { background: #27AE60; }

.risk-detail-panel {
    display: none;
    background: #242424;
    border-radius: 8px;
    padding: 10px;
    margin: 0 4px 8px 4px;
}
.risk-item.open .risk-detail-panel {
    display: block;
}
.risk-impact-label {
    color: #ccc;
    font-size: 10px;
    margin-bottom: 4px;
    font-weight: bold;
}
.risk-impact-list {
    margin: 0;
    padding-left: 16px;
    color: #888;
    font-size: 10px;
    line-height: 1.4;
}
.risk-impact-list li {
    margin-bottom: 2px;
}

"""

with open('/Users/deshmukh_03/Documents/Kalpana/styles/drawer.css', 'a') as f:
    f.write(custom_css)
