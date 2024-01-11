
function makeApiRequest() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=florida&by_postal=32502&per_page=20')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

const fetchButton = document.querySelector('.micro');

fetchButton.addEventListener('click', async () => {
    const name = 'micros';
    console.log(name);

    const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?q&per_page=20`
    );

    const data = await response.json();

    // Pull out the names of the breweries
    const breweryNames = data.map((brewery) => brewery.name);

    // Log the brewery names in the console
    console.log(breweryNames);
});


loadMapScript();
makeApiRequest();