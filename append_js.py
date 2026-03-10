js_code = """

    /* ════════════════════════════════════════════════
       WIDGET 5 — AUCTIONS & TENDERS
       ════════════════════════════════════════════════ */
    function initAuctions() {
        // Filter pills logic
        const pills = document.querySelectorAll('#widget-auctions .filter-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', function() {
                pills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Click to show tooltip logic
        const rows = document.querySelectorAll('.auction-row');
        rows.forEach(row => {
            row.addEventListener('click', function(e) {
                // If clicking inside the tooltip, do nothing
                if (e.target.closest('.auction-tooltip')) return;
                
                // Toggle open class
                const isOpen = this.classList.contains('open');
                
                // Close all others first
                document.querySelectorAll('.auction-row').forEach(r => r.classList.remove('open'));
                
                if (!isOpen) {
                    this.classList.add('open');
                }
            });
        });
        
        // Hide tooltip on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.auction-row')) {
                document.querySelectorAll('.auction-row').forEach(r => r.classList.remove('open'));
            }
        });
    }

    /* ════════════════════════════════════════════════
       WIDGET 8 — RISK & ALERTS
       ════════════════════════════════════════════════ */
    function initRisks() {
        const headers = document.querySelectorAll('.risk-item-header');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.closest('.risk-item');
                item.classList.toggle('open');
            });
            
            // Map hover placeholder
            header.addEventListener('mouseenter', function() {
                const country = this.closest('.risk-item').dataset.country;
                // console.log('Highlight map zone:', country);
            });
            header.addEventListener('mouseleave', function() {
                const country = this.closest('.risk-item').dataset.country;
                // console.log('Remove map highlight:', country);
            });
        });

        const filterBtns = document.querySelectorAll('.risk-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                // Normally we would filter the list here based on data-type
            });
        });
    }

"""

import re

# Read widgets.js
with open('/Users/deshmukh_03/Documents/Kalpana/scripts/widgets.js', 'r') as f:
    content = f.read()

# I need to insert initAuctions() and initRisks() before initAll(),
# and call them inside initAll().

# Find the end to insert definitions before initAll
pattern = r'(/\* ════════════════════════════════════════════════\n\s*INIT ALL WIDGETS\n\s*════════════════════════════════════════════════ \*/)'
content = re.sub(pattern, lambda m: js_code + '\n    ' + m.group(1), content)

# Modify initAll to call new functions
init_all_pattern = r'(function initAll\(\) \{)(.*?)(    \})'
def replacer(m):
    return m.group(1) + m.group(2) + '        initAuctions();\n        initRisks();\n' + m.group(3)

content = re.sub(init_all_pattern, replacer, content, flags=re.DOTALL)

with open('/Users/deshmukh_03/Documents/Kalpana/scripts/widgets.js', 'w') as f:
    f.write(content)
