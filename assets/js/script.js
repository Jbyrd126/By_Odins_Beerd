let map;
let lat;
let lng;
let markers = [];
// function removeMarkers() {
//   for (let index = 0; index < markers.length; index++) {
//     markers[index].setMap(null);
//   }
//   console.log(markers);
// }
// locate you.
//google maps functionality
function initMap(latitude, longitude, breweries = null) {
    console.log(latitude, longitude);
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 7,
    });
    //adding home marker
    if (breweries) {
        console.log(`breweries ${breweries}`);
        breweries.forEach((brewery) => {
            // Extract latitude and longitude coordinates
            const { latitude, longitude } = brewery;

            // Create a new marker for each brewery location
            new google.maps.Marker({
                position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                map: map, // Add the marker to the map
                title: brewery.name, // Set the marker title
            });
        });
    } else {
        new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            //icon: hiker, //If you add a custom icon you can add that here
            title: "Tron",
        });
    }
}

//get position of user from the browser and pass it to google maps
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = parseFloat(position.coords.latitude);
        lng = parseFloat(position.coords.longitude);

        //pass position to the map
        initMap(lat, lng);
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError();
}

function handleLocationError() {
    alert("Error: The Geolocation service failed.");
}
function makeApiRequest(lat, lng) {
    fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${lng}&per_page=8`
    )
        .then((response) => response.json())
        //.then(data => console.log(data))
        .then((data) => {
            // Loop through the breweries data
            data.forEach((brewery) => {
                // Extract latitude and longitude coordinates
                const { latitude, longitude } = brewery;

                // Create a new marker for each brewery location
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                    map: map, // Add the marker to the map
                    title: brewery.name, // Set the marker title
                });
            });
            console.log(data);
        })

        .catch((error) => console.error(error));
}

const fetchChoice = document.querySelector("#choice");
const fetchChoice1 = document.querySelector("#choice1");
const fetchChoice2 = document.querySelector("#choice2");
const fetchChoice3 = document.querySelector("#choice3");
const fetchChoice4 = document.querySelector("#choice4");

fetchChoice.addEventListener("click", async () => {
    const name = "brewpub";
    console.log(name);
    fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_type=brewpub&by_dist=${lat},${lng}&per_page=8`
    )
        .then((response) => response.json())

        .then((data) => {
            console.log(data);

            //removes images
            const images = document.querySelectorAll("#image");
            images.forEach((image) => {
                image.remove();
            });

            // Select all the p tags inside the div with id "list"
            const pTags = document.querySelectorAll("#list p");

            // Remove each p tag
            pTags.forEach((pTag) => {
                pTag.remove();
            });

            initMap(lat, lng, data);

            // Loop through the breweries data
            data.forEach((brewery) => {
                // Create a new div element for each brewery
                const breweryItem = document.createElement("div");
                breweryItem.style.borderRadius = "10px";

                // Create a new p tag inside the div for the name
                const breweryName = document.createElement("p");
                breweryName.textContent = brewery.name;
                breweryItem.appendChild(breweryName);

                // Create a new p tag inside for the city
                const breweryCity = document.createElement("p");
                breweryCity.innerHTML = `${brewery.city}<br>`;
                breweryItem.appendChild(breweryCity);

                // Create a new p tag for the addy
                const breweryAddress = document.createElement("p");
                breweryAddress.innerHTML = `${brewery.street}<br>`;
                breweryItem.appendChild(breweryAddress);

                // Create a new p tag for the phone number
                const breweryPhone = document.createElement("p");
                breweryPhone.innerHTML = `${brewery.phone}<br>`;
                breweryItem.appendChild(breweryPhone);
                //styling for all the items being created and appended
                breweryItem.classList.add("brewery-info", "custom-style");

                // Append the brewery info to the list div
                list.appendChild(breweryItem);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

fetchChoice1.addEventListener("click", async () => {
    const name = "micro";
    console.log(name);
    fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_type=micro&by_dist=${lat},${lng}&per_page=8`
    )
        .then((response) => response.json())
        .then((data) => {
            //removes images
            const images = document.querySelectorAll("#image");
            images.forEach((image) => {
                image.remove();
            });

            // Select all the p tags inside the div with id "list"
            const pTags = document.querySelectorAll("#list p");

            // Remove each p tag
            pTags.forEach((pTag) => {
                pTag.remove();
            });

            initMap(lat, lng, data);

            // Loop through the breweries data
            data.forEach((brewery) => {

                // Create a new div element for each brewery
                const breweryItem = document.createElement("div");
                breweryItem.style.borderRadius = "10px";

                // Create a new p tag inside the div for the name
                const breweryName = document.createElement("p");
                breweryName.textContent = brewery.name;
                breweryItem.appendChild(breweryName);

                // Create a new p tag inside for the city
                const breweryCity = document.createElement("p");
                breweryCity.innerHTML = `${brewery.city}<br>`;
                breweryItem.appendChild(breweryCity);

                // Create a new p tag for the addy
                const breweryAddress = document.createElement("p");
                breweryAddress.innerHTML = `${brewery.street}<br>`;
                breweryItem.appendChild(breweryAddress);

                // Create a new p tag for the phone number
                const breweryPhone = document.createElement("p");
                breweryPhone.innerHTML = `${brewery.phone}<br>`;
                breweryItem.appendChild(breweryPhone);
                //styling for all the items being created and appended
                breweryItem.classList.add("brewery-info", "custom-style");

                // Append the brewery info to the list div
                list.appendChild(breweryItem);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

fetchChoice2.addEventListener("click", async () => {
    const name = "regional";
    console.log(name);
    fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_type=regional&by_dist=${lat},${lng}&per_page=8`
    )
        .then((response) => response.json())
        .then((data) => {
            // Select all the p tags inside the div with id "list"
            const pTags = document.querySelectorAll("#list p");

            //removes images
            const images = document.querySelectorAll("#image");
            images.forEach((image) => {
                image.remove();
            });

            // Remove each p tag
            pTags.forEach((pTag) => {
                pTag.remove();
            });

            initMap(lat, lng, data);

            // Loop through the breweries data
            data.forEach((brewery) => {
                // Create a new paragraph element
                // Create a new div element for each brewery
                const breweryItem = document.createElement("div");
                breweryItem.style.borderRadius = "10px";

                // Create a new p tag inside the div for the name
                const breweryName = document.createElement("p");
                breweryName.textContent = brewery.name;
                breweryItem.appendChild(breweryName);

                // Create a new p tag inside for the city
                const breweryCity = document.createElement("p");
                breweryCity.innerHTML = `${brewery.city}<br>`;
                breweryItem.appendChild(breweryCity);

                // Create a new p tag for the addy
                const breweryAddress = document.createElement("p");
                breweryAddress.innerHTML = `${brewery.street}<br>`;
                breweryItem.appendChild(breweryAddress);

                // Create a new p tag for the phone number
                const breweryPhone = document.createElement("p");
                breweryPhone.innerHTML = `${brewery.phone}<br>`;
                breweryItem.appendChild(breweryPhone);
                //styling for all the items being created and appended
                breweryItem.classList.add("brewery-info", "custom-style");

                // Append the brewery info to the list div
                list.appendChild(breweryItem);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

fetchChoice3.addEventListener("click", async () => {
    const name = "corporate";
    console.log(name);
    fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_type=large&by_dist=${lat},${lng}&per_page=8`
    )
        .then((response) => response.json())
        .then((data) => {
            //removes images
            const images = document.querySelectorAll("#image");
            images.forEach((image) => {
                image.remove();
            });

            // Select all the p tags inside the div with id "list"
            const pTags = document.querySelectorAll("#list p");

            // Remove each p tag
            pTags.forEach((pTag) => {
                pTag.remove();
            });

            initMap(lat, lng, data);

            // Loop through the breweries data
            data.forEach((brewery) => {
                // Create a new paragraph element
                // Create a new div element for each brewery
                const breweryItem = document.createElement("div");
                breweryItem.style.borderRadius = "10px";

                // Create a new p tag inside the div for the name
                const breweryName = document.createElement("p");
                breweryName.textContent = brewery.name;
                breweryItem.appendChild(breweryName);

                // Create a new p tag inside for the city
                const breweryCity = document.createElement("p");
                breweryCity.innerHTML = `${brewery.city}<br>`;
                breweryItem.appendChild(breweryCity);

                // Create a new p tag for the addy
                const breweryAddress = document.createElement("p");
                breweryAddress.innerHTML = `${brewery.street}<br>`;
                breweryItem.appendChild(breweryAddress);

                // Create a new p tag for the phone number
                const breweryPhone = document.createElement("p");
                breweryPhone.innerHTML = `${brewery.phone}<br>`;
                breweryItem.appendChild(breweryPhone);
                //styling for all the items being created and appended
                breweryItem.classList.add("brewery-info", "custom-style");

                // Append the brewery info to the list div
                list.appendChild(breweryItem);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

fetchChoice4.addEventListener("click", async () => {
    const name = "contract";
    console.log(name);
    fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_type=contract&by_dist=${lat},${lng}&per_page=8`
    )
        .then((response) => response.json())
        .then((data) => {
            const pTags = document.querySelectorAll("#list p");

            //removes images
            const images = document.querySelectorAll("#image");
            images.forEach((image) => {
                image.remove();
            });

            // Remove each p tag
            pTags.forEach((pTag) => {
                pTag.remove();
            });
            initMap(lat, lng, data);

            // Loop through the breweries data
            data.forEach((brewery) => {
                // Create a new div element for each brewery
                const breweryItem = document.createElement("div");
                breweryItem.style.borderRadius = "10px";

                // Create a new p tag inside the div for the name
                const breweryName = document.createElement("p");
                breweryName.textContent = brewery.name;
                breweryItem.appendChild(breweryName);

                // Create a new p tag inside for the city
                const breweryCity = document.createElement("p");
                breweryCity.innerHTML = `${brewery.city}<br>`;
                breweryItem.appendChild(breweryCity);

                // Create a new p tag for the addy
                const breweryAddress = document.createElement("p");
                breweryAddress.innerHTML = `${brewery.street}<br>`;
                breweryItem.appendChild(breweryAddress);

                // Create a new p tag for the phone number
                const breweryPhone = document.createElement("p");
                breweryPhone.innerHTML = `${brewery.phone}<br>`;
                breweryItem.appendChild(breweryPhone);
                //styling for all the items being created and appended
                breweryItem.classList.add("brewery-info", "custom-style");

                // Append the brewery info to the list div
                list.appendChild(breweryItem);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

//makeApiRequest(lat, lng);
