


// loadMapScript();

let map;

// locate you.
//google maps functionality
function initMap(latitude, longitude) {
    console.log(latitude, longitude);
    map = new google.maps.Map(document.getElementById("map"), {

        center: { lat: latitude, lng: longitude },
        zoom: 10,
    });
    //adding home marker
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
       //icon: hiker, //If you add a custom icon you can add that here
        title: "Tron",
      });
}

//get position of user from the browser and pass it to google maps
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {

            let lat = parseFloat(position.coords.latitude);
            let lng = parseFloat(position.coords.longitude);

            //pass position to the map
            initMap(lat, lng)
            makeApiRequest(lat, lng);

        }

    );
} else {
    // Browser doesn't support Geolocation
    handleLocationError();
};


function handleLocationError() {


    alert("Error: The Geolocation service failed.")

};
function makeApiRequest(lat, lng) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${lng}&per_page=8`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

const fetchButton = document.querySelector('#choice');

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

