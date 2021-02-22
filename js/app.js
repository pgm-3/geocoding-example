const MAPBOX_GEOCODING_API = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const MAPBOX_ACCESS_TOKEN = "";
const COORDINATES = [];

// 3.668619403615469,51.08737614776184.json?access_token=pk.eyJ1IjoiZi1yb2dlcnMiLCJhIjoiY2p2MHFiem1iMTJhODN5bzRvenMwOWc0NSJ9.hAcN6R50XcaUwh0NI98Ifw

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const getLocation = () => {
  // haal de huidige accurate positie op van de gebruiker
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getAddress([longitude, latitude]);

      var map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/f-rogers/cklgnxr1m0j1b17qo2ul24qi6", // style URL
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      var el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = 'url("./images/marker.png")';

      var marker = new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map);
    },
    (error) => {
      // oh boy oh boy another error -_-
      console.log(error);
    }
  );
};

const getAddress = async (coords) => {
  const API_URL = `${MAPBOX_GEOCODING_API}${coords.join(",")}.json?types=address&access_token=${MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  if (data.features[0]) {
    const address = data.features[0].place_name;
    document.querySelector("h1").innerText += " " + address;
  }
};

if (!navigator.geolocation) {
  alert("Jouw browser ondersteunt geolocation niet...");
} else {
  getLocation();
}
