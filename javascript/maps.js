var map = L.map('canvas').setView([38.907192, -77.036873], 3);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);
var happyPin = L.icon({
    iconUrl: "https://image.flaticon.com/icons/svg/1559/1559161.svg",
    shadowUrl: '',
    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
// EVENTS
map.on('click', function(e) {
    L.marker(e.latlng, {draggable: true, markerId: 9999, icon:happyPin}).addTo(map);
    saveData(e.latlng);
});
function saveData(latlng) {
    fetch('/pin',{
      method: 'post',
      body: JSON.stringify(latlng)
    });
}
