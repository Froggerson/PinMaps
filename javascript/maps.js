var map = L.map('canvas').setView([38.907192, -77.036873], 3);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

// Attach events.

map.on('click', function(e) {
    L.marker(e.latlng, {draggable: true, markerId: 9999}).addTo(map);
    saveData(e.latlng);
});

// Load data from the server if it already exists.


// Library methodss

// function loadData(allMarkers) {
//     for each(marker in allMarkers) {
//         L.marker(marker).addTo(map);
//     }
//     // TODO: Load all markers from the server.
// }

function saveData(latlng) {
  console.log(latlng)
    fetch('/pin',{
      method: 'post',
      body: JSON.stringify(latlng)
    });
}

function getAllMarkers() {
      var allMarkers = [];

    map.eachLayer(function (layer) {

        if (layer.options.markerId != undefined) {
            // The layer is a marker.
            allMarkers.push({
                markerId: layer.options.markerId,
                latlng: null
            });
        }

    });

    return allMarkers;
}
