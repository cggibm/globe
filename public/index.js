var earth;
var defLatLongInit = [14.6042, 120.9822];
var defZoom = 2;
var defTilt = 90;
var delay = 50;
var marker;

var listCities = [
    [[39.9075, 116.39723], "Beijing, China"],
    [[40.71427, -74.00597], "New York, USA"],
    [[-8.833333333, 13.216667], "Luanda, Angola"],
    [[1.28967, 103.85007], "Singapore, Singapore"],
    [[48.85341, 2.3488], "Paris, France"],
    [[19.4284700, -99.1276600], "Mexico City, Mexico"],
    [[14.6042, 120.9822], "Manila, Philippines"],
    [[59.91273, 10.74609], "Oslo, Norway"],
    [[-34.61315, -58.37723], "Buenos Aires, Argentina"],
    [[13.75398, 100.50144], "Bangkok, Thailand"],
    [[-1.28333, 36.81667], "Nairobi, Kenya"],
    [[-33.86785, 151.20732], "Sydney, Australia"],
    [[48.2, 16.366667], "Vienna, Austria"],
    [[18, -76.8], "Kingston, Jamaica"],
    [[35.6895, 139.69171], "Tokyo, Japan"],
    [[28.65381, 77.22897], "New Delhi, India"],
    [[-15.8667, -47.9167], "Brasilia, Brazil"],
    [[-33.7999, 18.4667], "Cape Town, South Africa"],
    [[25.3, 55.4333], "Dubai, UAE"],
    [[4, 73], "Male, Maldives"],
    [[47.3667, 8.5333], "Zurich, Switzerland"],
                 ];

function initialize() {
    earth = new WE.map('earth_div');
    earth.setView(defLatLongInit, defZoom);
    earth.setTilt(defTilt);
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    // Start a simple rotation animation
    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = earth.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1*(elapsed/delay)]);
        requestAnimationFrame(animate);
    });
}

document.querySelector('#earth_div').onclick = function() {
    if (marker != null) {
        marker.removeFrom(earth);
    }
    var rand = Math.floor(Math.random() * listCities.length);
    var latlong = listCities[rand][0];
    var city = listCities[rand][1];

    earth.setCenter(latlong);
    marker = WE.marker(latlong);
    marker.addTo(earth);
    marker.bindPopup("<b>" + city + "</b><br>Supplier: XXX", {maxWidth: 120, closeButton: true}).openPopup();
};