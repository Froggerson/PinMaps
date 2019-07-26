var map = L.map('canvas').setView([30.907192, 03], 3);
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
    var marker = L.marker(e.latlng, {draggable: true, markerId: 9999, icon:happyPin}).addTo(map);
    saveData(e.latlng);
    marker.on('click', function(e) {
      map.removeLayer(marker);
      print(e)
      deletePin(e.latlng)
    });
});

function saveData(latlng) {
    fetch('/pin',{
      method: 'post',
      body: JSON.stringify(latlng)
    });
}

function deletePin(latlng) {
  fetch('/pin',{
    method: 'delete',
    body: JSON.stringify(latlng)
  });
}
//whenever we delete a pin, it goes to the pinhandler (delete) thingy and has an errorr
