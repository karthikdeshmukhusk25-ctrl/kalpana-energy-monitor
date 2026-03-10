/* ═══════════════════════════════════════════════
   KALPANA — DATA FETCHING LAYER
   scripts/dataFetch.js
   ═══════════════════════════════════════════════ */

async function fetchLiveData() {
    console.log('Using static data from assets.json');
    loadStaticData();
}

function loadStaticData() {
    fetch('data/assets.json')
        .then(r => r.json())
        .then(data => {
            window.assetsData = data;
            // Let the original map.js logic run
            if (typeof loadAssets === 'function') {
                loadAssets();
            }
            // Update UI
            updateLiveIndicator(false);
            console.log('Static data loaded:', data.length, 'assets');
        })
        .catch(err => {
            console.error('assets.json failed:', err);
        });
}

function updateLiveIndicator(isLive) {
    let indicator = document.getElementById('data-source-indicator');
    if (!indicator) {
        const title = document.querySelector('.sidebar-title');
        if (title) {
            indicator = document.createElement('div');
            indicator.id = 'data-source-indicator';
            indicator.style.fontSize = '10px';
            indicator.style.marginTop = '4px';
            indicator.style.fontWeight = 'normal';
            indicator.style.color = '#888';
            title.insertAdjacentElement('afterend', indicator);
        }
    }

    if (indicator) {
        if (isLive) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            indicator.innerHTML = `<span style="color:#27AE60;">● Live data</span> <span style="color:#888;">· Updated ${time}</span>`;
        } else {
            indicator.innerHTML = `● Static data · assets.json`;
        }
    }
}
