var map = L.map('canvas').setView([38.907192, -77.036873], 3);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

// EVENTS
map.on('click', function(e) {
    L.marker(e.latlng, {draggable: true, markerId: 9999}).addTo(map);
    saveData(e.latlng);
});

function saveData(latlng) {
    fetch('/pin',{
      method: 'post',
      body: JSON.stringify(latlng)
    });
}
