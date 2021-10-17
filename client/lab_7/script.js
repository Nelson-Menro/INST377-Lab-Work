/* eslint-disable no-template-curly-in-string */
// link where I will fetch data
async function windowsAction() {
  const endPoint = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const cities = await endPoint.json();

  // eslint-disable-next-line no-shadow
  function searchMatches(wordToMatch, cities) {
    return cities.filter((place) => place.zip === wordToMatch);
  }

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

  function filterFunction(event) {
    suggestions.innerHTML = '';
    const matchedArray = searchMatches(event.target.value, cities);
    const shortList = matchedArray.slice(0, 5);

    let list = '';
    shortList.forEach((item) => {
      const point = item.geocoded_column_1;
      if (!point || !point.coordinates) {
        return;
      }

      const latlong = point.coordinates;
      const marker = latlong.reverse();

      list += `<li><span>${item.name}<br>${item.category}<br><i>${item.address_line_1}</i><br><i>${item.city}</i><br><i>${item.zip}</i><br></span></li><br>`;
      L.marker(marker).addTo(mymap);
    });

    suggestions.innerHTML = list;
  }

  const searchInput = document.querySelector('#search');

  function clearFunction(evt) {
    if (evt.target.value === '') {
      suggestions.innerHTML = '';
    }
  }
  searchInput.addEventListener('input', (evt) => { filterFunction(evt); });
  searchInput.addEventListener('input', (evt) => { clearFunction(evt); });
}

window.onload = windowsAction();