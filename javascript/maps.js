
var map = L.map('canvas').setView([38.907192, -77.036873], 3);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

//Marker
var happyPin = L.icon({
    iconUrl: "https://image.flaticon.com/icons/svg/1014/1014719.svg",
    shadowUrl: '',
//16, 1
    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [34, 49], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
// Attach events.

map.on('click', function(e) {
    L.marker(e.latlng, {draggable: true, markerId: 9999, icon: happyPin}).addTo(map);
});

map.on('mouseup', function(e) {
    saveData();
})

// Load data from the server if it already exists.

loadData();


// Library methods

// function loadData(allMarkers) {
//     for each(marker in allMarkers) {
//         L.marker(marker).addTo(map);
//     }
//     // TODO: Load all markers from the server.
// }

function saveData() {
    var allMarkers = getAllMarkers();

    console.log(allMarkers);
    // TODO: Call some web method to save the markers.
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
