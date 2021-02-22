const MAPBOX_GEOCODING_API = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const MAPBOX_ACCESS_TOKEN = ""; // fill in your personal mapbox acces token here
const COORDINATES = [];

// 3.668619403615469,51.08737614776184.json?access_token=pk.eyJ1IjoiZi1yb2dlcnMiLCJhIjoiY2p2MHFiem1iMTJhODN5bzRvenMwOWc0NSJ9.hAcN6R50XcaUwh0NI98Ifw

const getLocation = () => {
  // haal de huidige accurate positie op van de gebruiker
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // adres uit de geocoding api halen
      getAddress([longitude, latitude]);
      // great succes
      let url = `https://www.bing.com/maps/embed?h=800&w=800&cp=${latitude}~${longitude}&lvl=16&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;
      const iframe = `
        <iframe src="${url}" title="Bing Maps" width="800" height="800"></iframe> 
        `;
      document.body.querySelector("#wrapper").innerHTML = iframe;
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
