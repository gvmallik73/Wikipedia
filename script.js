function search() {
    const searchInput = document.getElementById('searchInput').value;
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    // Wikipedia API endpoint
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&format=json&origin=*`;

    // Make AJAX call to fetch search results from Wikipedia API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;

            if (results.length === 0) {
                searchResults.innerHTML = "No results found.";
            } else {
                let resultHtml = "<ul>";
                results.forEach(result => {
                    resultHtml += `<li><a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">${result.title}</a></li>`;
                });
                resultHtml += "</ul>";
                searchResults.innerHTML = resultHtml;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            searchResults.innerHTML = "Error fetching data.";
        });
}
