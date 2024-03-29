var map = L.map('canvas').setView([30.907192, 03], 2);
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

function addPin(latlng) {
  var marker = L.marker(latlng, {draggable: true, markerId: 9999, icon:happyPin}).addTo(map);
  marker.on('click', function(e) {
    if (e.originalEvent.shiftKey) {
      if (confirm("delete this pin?")) {
        map.removeLayer(marker);
        deletePin(latlng);
      }
    }
  });
}
// EVENTS
map.on('click', function(e) {
    saveData(e.latlng);
    addPin(e.latlng);
});

function saveData(latlng) {
    fetch('/pin',{
      method: 'post',
      body: JSON.stringify(latlng)
    });
}

function deletePin(latlng) {
  fetch('/deletepin',{
    method: 'post',
    body: JSON.stringify(latlng)
  });
}
//whenever we delete a pin, it goes to the pinhandler (delete) thingy and has an errorr
