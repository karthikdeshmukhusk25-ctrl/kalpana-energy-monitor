import re

# 1. Update index.html
with open('/Users/deshmukh_03/Documents/Kalpana/index.html', 'r') as f:
    idx_content = f.read()

idx_content = re.sub(
    r'</div><!-- end \.widget-grid row 1 -->\s*<!-- ROW 2:[^\n]*-->\s*<div class="widget-grid">',
    r'<!-- widgets combined into single grid -->',
    idx_content
)
idx_content = idx_content.replace('</div><!-- end .widget-grid row 2 -->', '</div><!-- end .widget-grid -->')

with open('/Users/deshmukh_03/Documents/Kalpana/index.html', 'w') as f:
    f.write(idx_content)

# 2. Update map.html
with open('/Users/deshmukh_03/Documents/Kalpana/map.html', 'r') as f:
    map_html = f.read()

map_html = re.sub(
    r'</div><!-- end \.widget-grid row 1 -->\s*<!-- ROW 2:[^\n]*-->\s*<div class="widget-grid">',
    r'<!-- widgets combined into single grid -->',
    map_html
)
with open('/Users/deshmukh_03/Documents/Kalpana/map.html', 'w') as f:
    f.write(map_html)

# 3. Update styles/drawer.css for grid-auto-flow: dense
with open('/Users/deshmukh_03/Documents/Kalpana/styles/drawer.css', 'r') as f:
    drawer_css = f.read()

drawer_css = re.sub(
    r'(?P<pre>\.widget-grid\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\);)(?P<post>)',
    r'\g<pre>\n    grid-auto-flow: dense;\g<post>',
    drawer_css
)

with open('/Users/deshmukh_03/Documents/Kalpana/styles/drawer.css', 'w') as f:
    f.write(drawer_css)


# 4. Update styles/map.css for #map-zone and .leaflet-container
with open('/Users/deshmukh_03/Documents/Kalpana/styles/map.css', 'r') as f:
    map_css = f.read()

map_zone_add = """    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;"""

if 'display: block !important;' not in map_css:
    map_css = re.sub(
        r'(#map-zone\s*{[^}]*z-index:\s*1;)',
        r'\1\n' + map_zone_add,
        map_css
    )

leaflet_add = """

.leaflet-container {
    width: 100% !important;
    height: 100% !important;
}"""

if '.leaflet-container' not in map_css:
    map_css += leaflet_add

with open('/Users/deshmukh_03/Documents/Kalpana/styles/map.css', 'w') as f:
    f.write(map_css)

# 5. Update scripts/drawer.js
with open('/Users/deshmukh_03/Documents/Kalpana/scripts/drawer.js', 'r') as f:
    drawer_js = f.read()

drawer_js = re.sub(
    r'function syncMapZone\(bottomPx\)\s*{',
    r'function syncMapZone(bottomVal) {',
    drawer_js
)
drawer_js = re.sub(
    r'mapZone\.style\.bottom\s*=\s*bottomPx\s*\+\s*\'px\';',
    r'mapZone.style.bottom = bottomVal;',
    drawer_js
)

open_fn = """    function openDrawer() {
        isOpen = true;
        drawer.classList.add('open');
        syncMapZone('60vh');
    }"""
drawer_js = re.sub(r'function openDrawer\(\)\s*\{[\s\S]*?syncMapZone[^\n]*\n\s*\}', open_fn, drawer_js)

close_fn = """    function closeDrawer() {
        isOpen = false;
        drawer.classList.remove('open');
        syncMapZone('48px');
    }"""
drawer_js = re.sub(r'function closeDrawer\(\)\s*\{[\s\S]*?syncMapZone[^\n]*\n\s*\}', close_fn, drawer_js)

with open('/Users/deshmukh_03/Documents/Kalpana/scripts/drawer.js', 'w') as f:
    f.write(drawer_js)

