
const locations = document.querySelector('#map').dataset.locations;
console.log(locations)


mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXBlYXJvc2EiLCJhIjoiY2w2cDk1cHVyMGlsdzNjcjNjeGxuOGxsdCJ9.qzjW6Sw47Lpbl7AHOFeWkA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false
});
