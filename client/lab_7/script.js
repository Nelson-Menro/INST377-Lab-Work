/* eslint-disable no-template-curly-in-string */
// link where I will fetch data
async function windowsAction() {
  const endPoint = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const cities = await endPoint.json();
  const submitButton = document.querySelector('#submitButton');

  // eslint-disable-next-line no-shadow
  function searchMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function placeMarkers() {
    console.log('test!');
  }

  submitButton.addEventListener('click', (evt) => {
    placeMarkers();
  });

  function mapInit() {
    mymap = L.map('mapid').setView([38.989, -76.93], 12);
    const ACCESSTOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
  }

  mapInit();

  const suggestions = document.querySelector('.suggestions');

  function displayMatches(event) {
    const matchedArray = searchMatches(event.target.value, cities);
    const shortList = matchedArray.slice(0, 5);
    // eslint-disable-next-line arrow-body-style
    const html = shortList.map((place) => {
      return `<li><span>${place.name}<br>${place.category}<br><i>${place.address_line_1}</i><br><i>${place.city}</i><br><i>${place.zip}</i><br></span></li><br>`;
    }).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('#search');

  searchInput.addEventListener('input', (evt) => {
    displayMatches(evt);
  });

  /*
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
  */
}

window.onload = windowsAction();