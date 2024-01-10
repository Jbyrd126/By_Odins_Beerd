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

        }

    );
} else {
    // Browser doesn't support Geolocation
    handleLocationError();
};


function handleLocationError() {


    alert("Error: The Geolocation service failed.")

};
