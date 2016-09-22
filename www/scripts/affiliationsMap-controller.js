myApp.controller('AffiliationsMapController', function($scope, $timeout,$properties) {
console.log("controlador de AffiliationsMapController");
var map;

var page = affiliationNavigator.getCurrentPage();
    console.log(page.options.param1);

 $scope.affiliationName=page.options.param3;

var loadMap = function() {

 map = L.map('map').setView([page.options.param1, page.options.param2], 16);

 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamExOTc5IiwiYSI6ImNpazcyZHFtcjAxOGJ2ZGt0NGNhamQ1cXQifQ.Kkz4bJY_fOE6PM9YaWzJIg',
                    {
            attribution: 'Map data &copy; <a href="http://openo streetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(map);

 var imagen = new L.icon({iconUrl:"images/pin_affiliation.png", iconAnchor:[24,56]});
       L.marker([page.options.param1,page.options.param2],{icon: imagen}).addTo(map).
       bindPopup(page.options.param4);


}

$timeout(function(){
        // console.log("Cargando...");
        loadMap();
    },100);

 });
