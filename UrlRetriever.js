javascript:(function() {
    const regex = /(?<=["'`])(\/[a-zA-Z0-9_?&=\/\-\#\.]*|https?:\/\/[^\s"']+)(?=["'`])/g;
    const results = new Set();

    function processScriptContent(content) {
        const matches = content.matchAll(regex);
        for (const match of matches) {
            results.add(match[0]);
        }
    }

    async function fetchAndProcessScript(url) {
        try {
            const response = await fetch(url);
            const content = await response.text();
            processScriptContent(content);
        } catch (error) {
            console.error("Error fetching script:", url, error);
        }
    }

    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].src;
        if (src) {
            fetchAndProcessScript(src);
        }
    }

    const pageContent = document.documentElement.outerHTML;
    processScriptContent(pageContent);

    function writeResults() {
        results.forEach(result => {
            document.write(result + "<br>");
        });
    }
    
    setTimeout(writeResults, 3000);
})();
