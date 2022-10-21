
const locations = JSON.parse(document.querySelector('#map').dataset.locations);
console.log(locations)


mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXBlYXJvc2EiLCJhIjoiY2w2cDk1cHVyMGlsdzNjcjNjeGxuOGxsdCJ9.qzjW6Sw47Lpbl7AHOFeWkA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  scrollZoom: false
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  }).setLngLat(loc.coordinates).addTo(map)

  new mapboxgl.Popup({
    offset: 30
  }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

  bounds.extend(loc.coordinates);
})

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  }
});
