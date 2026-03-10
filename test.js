const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));

    await page.goto('http://localhost:8000/map.html', { waitUntil: 'networkidle0' });

    // evaluate DOM
    const result = await page.evaluate(() => {
        const tooltip = document.querySelector('.country-tooltip');
        const panel = document.querySelector('.country-panel');
        return {
            tooltipExists: !!tooltip,
            panelExists: !!panel,
            updateCountryTooltipExists: typeof window.updateCountryTooltip === 'function',
            openCountryPanelExists: typeof window.openCountryPanel === 'function',
            countriesLength: window.COUNTRIES_DATA ? Object.keys(window.COUNTRIES_DATA).length : 0
        };
    });

    console.log("DOM Validation:", result);

    // simulate hover over Germany
    // The canvas is what Leaflet renders, but SVGs/divs might overlay it

    await browser.close();
})();
