import re

def modify_css(filepath):
    with open(filepath, 'r') as f:
        css = f.read()

    # FIX 1 — GRID LAYOUT
    css = re.sub(r'grid-template-columns: repeat\(4, 1fr\);', r'grid-template-columns: repeat(3, 1fr);', css)
    css = re.sub(r'gap: 12px;\n\s*width: 100%;', r'gap: 16px;\n    width: 100%;\n    padding: 0 20px;', css) # grid

    # FIX 2 — WIDGET CARD SIZE
    css = re.sub(r'\.widget-card\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 280px;', 'height: 380px;').replace('border-radius: 12px;', 'border-radius: 14px;').replace('padding: 16px;', 'padding: 20px;'), css)
    css = re.sub(r'\.widget-card-placeholder\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 280px;', 'height: 380px;').replace('border-radius: 12px;', 'border-radius: 14px;'), css)

    # FIX 4 — WIDGET HEADER ROW
    css = re.sub(r'\.widget-header\s*\{[^}]*\}', lambda m: m.group(0).replace('padding-bottom: 8px;', 'padding-bottom: 12px;').replace('margin-bottom: 4px;', 'margin-bottom: 12px;\n    height: 44px;'), css)

    # FIX 3 — TYPOGRAPHY SCALE UP
    css = re.sub(r'\.widget-title\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 14px;').replace('letter-spacing: 0.05em;', 'letter-spacing: 0.06em;'), css)
    
    # Section labels: .stocks-label, .eq-suggestions-label
    css = re.sub(r'\.stocks-label\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 11px;'), css)
    css = re.sub(r'\.eq-suggestions-label\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 11px;'), css)

    # Primary Body: .stock-name, .price-row-name, .news-headline, .auction-country, .stage-name, .policy-headline, .risk-title, .total-label, .total-val
    css = re.sub(r'\.stock-name\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.price-row-name\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.news-headline\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.auction-country\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.stage-name\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 14px;').replace('width: 80px;', 'width: 100px;'), css)
    css = re.sub(r'\.policy-headline\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.risk-title\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.total-label\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 14px;'), css)
    css = re.sub(r'\.total-val\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 14px;'), css)

    # Secondary Body: .widget-meta, .stock-ticker, .price-change, .stock-change, .news-outlet, .auction-name, .auction-date, .stage-meta, .policy-meta, .risk-meta
    css = re.sub(r'\.widget-meta\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.stock-ticker\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.price-change\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.stock-change\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.news-outlet\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.auction-name\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.auction-date\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.stage-meta\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;').replace('width: 130px;', 'width: 150px;'), css)
    css = re.sub(r'\.policy-meta\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.risk-meta\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 10px;', 'font-size: 12px;'), css)
    
    # Price Values: .price-value, .stock-price
    css = re.sub(r'\.price-value\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 12px;', 'font-size: 15px;'), css)
    css = re.sub(r'\.stock-price\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 15px;'), css)

    # Index Points
    css = re.sub(r'\.index-value\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 16px;', 'font-size: 24px;'), css)

    # Tag/Sector pills: .stock-sector, .news-chip, .auction-tech, .policy-tag
    css = re.sub(r'\.stock-sector\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 11px;').replace('padding: 1px 4px;', 'padding: 3px 10px;'), css)
    css = re.sub(r'\.news-chip\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 11px;').replace('padding: 1px 5px;', 'padding: 3px 10px;'), css)
    css = re.sub(r'\.auction-tech\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 11px;').replace('padding: 2px 8px;', 'padding: 3px 10px;'), css)
    css = re.sub(r'\.policy-tag\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 11px;').replace('padding: 2px 6px;', 'padding: 3px 10px;'), css)

    # Status chips: .price-tag, .auction-status, .risk-severity, .index-badge
    css = re.sub(r'\.price-tag\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 10px;').replace('padding: 1px 6px;', 'padding: 3px 10px;').replace('height: 16px;', 'height: 18px;'), css)
    css = re.sub(r'\.auction-status\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 10px;').replace('padding: 2px 8px;', 'padding: 3px 10px;'), css)
    css = re.sub(r'\.risk-severity\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 10px;').replace('padding: 2px 6px;', 'padding: 3px 10px;'), css)
    css = re.sub(r'\.index-badge\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 10px;').replace('padding: 2px 5px;', 'padding: 3px 10px;'), css)

    # Tab/Filter pills: .tab-btn, .filter-pill
    css = re.sub(r'\.tab-btn\{[^}]*\}', lambda m: m.group(0).replace('padding: 3px 10px;', 'padding: 6px 14px;').replace('font-size: 10px;', 'font-size: 12px;'), css)
    css = re.sub(r'\.filter-pill\s*\{[^}]*\}', lambda m: m.group(0).replace('padding: 2px 8px;', 'padding: 5px 12px;').replace('padding: 3px 10px;', 'padding: 5px 12px;').replace('font-size: 10px;', 'font-size: 11px;'), css)

    # FIX 5 — ROW HEIGHTS INSIDE WIDGETS
    css = re.sub(r'\.price-row\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 52px;', 'height: 64px;').replace('min-height: 52px;', 'min-height: 64px;'), css)
    css = re.sub(r'\.stock-row\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 44px;', 'height: 56px;'), css)
    css = re.sub(r'\.auction-row\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 52px;', 'height: 64px;').replace('min-height: 52px;', 'min-height: 64px;'), css)
    css = re.sub(r'\.stage-row\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 40px;', 'height: 52px;'), css)
    css = re.sub(r'\.news-item\s*\{[^}]*\}', lambda m: m.group(0).replace('padding: 8px 4px;', 'padding: 12px 4px;'), css)
    css = re.sub(r'\.risk-item-header\s*\{[^}]*\}', lambda m: m.group(0).replace('padding: 8px 4px;', 'padding: 10px 4px;'), css)
    css = re.sub(r'\.policy-item\s*\{[^}]*\}', lambda m: m.group(0).replace('padding: 8px 4px;', 'padding: 10px 4px;'), css)

    # FIX 6 — ICONS AND DOTS
    css = re.sub(r'\.risk-dot\s*\{[^}]*\}', lambda m: m.group(0).replace('width: 8px;', 'width: 10px;').replace('height: 8px;', 'height: 10px;'), css)

    # FIX 7 — SPARKLINES
    css = re.sub(r'\.price-sparkline-row canvas\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 60px;', 'height: 40px;'), css) # user says height 40px
    css = re.sub(r'\.stock-sparkline canvas\s*\{[^}]*\}', lambda m: m.group(0).replace('width: 40px !important;', 'width: 60px !important;').replace('height: 20px !important;', 'height: 40px !important;'), css)
    css = re.sub(r'\.index-chart-area\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 60px;', 'height: 70px;'), css)
    css = re.sub(r'\.index-chart-area canvas\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 60px;', 'height: 70px;'), css)

    # FIX 8 — LIVE NEWS WIDGET
    css = re.sub(r'\.channel-pill\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 9px;', 'font-size: 12px;').replace('padding: 3px 10px;', 'padding: 6px 14px;'), css)

    # FIX 9 — DRAWER HANDLE STRIP
    css = re.sub(r'#drawer-handle\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 48px;', 'height: 52px;'), css)
    css = re.sub(r'#analytics-drawer\s*\{[^}]*\}', lambda m: m.group(0).replace('height: 48px;', 'height: 52px;'), css) # matched to drawer handle height natively
    css = re.sub(r'\.drawer-handle-label\s*\{[^}]*\}', lambda m: m.group(0).replace('font-size: 11px;', 'font-size: 13px;').replace('letter-spacing: 0.1em;', 'letter-spacing: 0.12em;'), css)

    with open(filepath, 'w') as f:
        f.write(css)

modify_css('/Users/deshmukh_03/Documents/Kalpana/styles/drawer.css')
