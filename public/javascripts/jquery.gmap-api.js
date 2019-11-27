function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(13.818200, 100.576595),
        zoom: 18,

    }
    var contentString = '<div style="font-size: 18px;">Chandrakasem Park Hotel</div>';
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(13.818200, 100.576595),
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Chandrakasem Park"
    })
    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}
// google.maps.event.addDomListener(window, 'load', initialize);