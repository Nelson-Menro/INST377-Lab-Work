/* eslint-disable no-template-curly-in-string */
// link where I will fetch data
async function windowsAction() {
  const endPoint = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const cities = await endPoint.json();

  // eslint-disable-next-line no-shadow
  function searchMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex) || place.category.match(regex) || place.name.match(regex);
    });
  }

  const suggestions = document.querySelector('.suggestions');

  function displayMatches(event) {
    const matchedArray = searchMatches(event.target.value, cities);
    // eslint-disable-next-line no-template-curly-in-string
    // eslint-disable-next-line arrow-body-style
    const html = matchedArray.map((place) => {
      return `<li><span>${place.name}<br>${place.category}<br><i>${place.address_line_1}</i><br><i>${place.city}</i><br><i>${place.zip}</i><br></span></li>`;
    }).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('#search');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}

window.onload = windowsAction();