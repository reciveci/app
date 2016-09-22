myApp.controller('MapController', function($scope, $timeout,$properties) {

    var map;
    var popup;
    var layerSectors;
    var layerRoutes;
    var layerAffiliations;
    var layerBusiness;

    //algoritmo usado con checkboxs

    var loadMap = function() {

        map = L.map('map').setView([-0.1971527023738858, -78.49267959594727], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamExOTc5IiwiYSI6ImNpazcyZHFtcjAxOGJ2ZGt0NGNhamQ1cXQifQ.Kkz4bJY_fOE6PM9YaWzJIg',
                    {
            attribution: 'Map data &copy; <a href="http://openo streetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(map);


        map.on("zoomend", function (e) {
          if (localStorage.showLayerSectionsOrRoutes == "true") {
            showLayerSectionsOrRoutes();
          }
        });

        // Layers
        var routes;
        var business;
        var affiliations;
        var sectors;

        //////////
        // Sectors
        //////////
        var SECTORS_JSON='http://'+$properties.ip+':'+$properties.port+'/map/sectors.json';
        // console.log(SECTORS_JSON);
        $.getJSON(SECTORS_JSON,
          function(sector) {
            var sectorData = JSON.stringify(sector);
            localStorage.setItem('sectorData', sectorData);
            // console.log(sectorData);

            layerSectors = L.geoJson(sector,
                                     {
                                        style: getSectorStyle,
                                        onEachFeature: onEachFeatureSectors
                                    });

            localStorage.setItem("showLayerSectionsOrRoutes","true");
            layerSectors.addTo(map);

          }).fail(function() {
              // Retrieve data from cache
              var sectors = JSON.parse(localStorage.getItem('sectorData'));

              if (sectors != null) {
                  layerSectors = L.geoJson(sectors,
                                           {
                                            style: getSectorStyle,
                                            onEachFeature: onEachFeatureSectors
                                           });

                  localStorage.setItem("showLayerSectionsOrRoutes","true");
                  layerSectors.addTo(map);

              } else {
                  console.log(error);
              }
          });


        /////////
        // Routes
        /////////
        var ROUTES_JSON='http://'+$properties.ip+':'+$properties.port+'/map/routes.json';
        // console.log(ROUTES_JSON);
        $.getJSON(ROUTES_JSON,
                  function(routes) {
            var routesData = JSON.stringify(routes);
            localStorage.setItem('routesData', routesData);
            //console.log(routesData);

            layerRoutes = L.geoJson(routes, {
                style: getStyle,
                onEachFeature: onEachFeature
            });

            // layerRoutes.addTo(map);

        }).fail(function() {
            // Retrieve data from cache
            var routes = JSON.parse(localStorage.getItem('routesData'));

            if (routes != null) {
                layerRoutes = L.geoJson(routes,
                                         {
                                          style: getStyle,
                                          onEachFeature: onEachFeature
                                         });

                // layerRoutes.addTo(map);
                // $("#layerWastePickers").prop('checked',true);
            } else {
                console.log(error);
            }
        });


        ///////////
        // Business
        ///////////
        // //Comentado hasta que se requira la funcionalidad de negocios
        // var BUSINESS_JSON='http://'+$properties.ip+':'+$properties.port+'/map/business.json';
        // $.getJSON(BUSINESS_JSON, function(business) {
        //     var businessData = JSON.stringify(business);
        //     localStorage.setItem('businessData', businessData);
        //     // console.log(bussinesData);
        //     console.log(business);
        //
        //     function traits (feature,layer) {
        //         layer.bindPopup("<div class=map-poup>"+feature.properties["name"]+"</div>"+"<div class=map-content-popup>"+feature.properties["address"]+"</div>");
        //         layer.setIcon(imagen);
        //     };
        //
        //
        //
        //     var imagen = new L.icon({iconUrl:"images/pin_business.png", iconAnchor:[30,80]});
        //
        //     layerBusiness = L.geoJson(business,{
        //         onEachFeature: traits
        //     });
        //
        //
        //
        //
        //     if(localStorage.estado_bussines=="activo"){
        //
        //         layerBusiness.addTo(map);
        //
        //         document.getElementById("layerBusiness").checked=true;
        //
        //     }
        //
        // }).fail(function() {
        //     // Retrieve data from cache
        //     var business = JSON.parse(localStorage.getItem('businessData'));
        //
        //     if (business!= null) {
        //         layerBusiness = L.geoJson(business,{
        //             onEachFeature: traits
        //         });
        //         layerBusiness.addTo(map);
        //         $("#layerBusiness").prop('checked',true);
        //
        //     } else {
        //         console.log(error);
        //     }
        // });


        var AFFILIATIONS_JSON='http://'+$properties.ip+':'+$properties.port+'/map/affiliations.json';

        $.getJSON(AFFILIATIONS_JSON,
                  function(affiliations) {
            var affiliationsData = JSON.stringify(affiliations);
            localStorage.setItem('affiliationsData', affiliationsData);
            function traits (feature,layer) {
                var container = $('<div />');
                // Delegate all event handling for the container itself and its contents to the container
                container.on('click', '.profile-link', function() {
                    $scope.openAffiliation(feature);
                });
                // Insert whatever you want into the container, using whichever approach you prefer
                container.html("<div class=map-poup >"+"<a class='profile-link' href='#'>"+feature.properties["name"]+"</div>"+
                               "<div class=map-content-popup>"+feature.properties["address"]+"</div>"
                              );

                // Insert the container into the popup
                layer.bindPopup(container[0]);

                layer.setIcon(imagen);
                //console.log(feature.geometry.coordinates);
            };

            var imagen = new L.icon({iconUrl:"images/pin_affiliation.png", iconAnchor:[24,56]});

            layerAffiliations = L.geoJson(affiliations,{
                onEachFeature: traits
            });

            if(localStorage.estado_affiliations=="elegido"){


                layerAffiliations.addTo(map);
                document.getElementById("layerAffiliations").checked=true;

            }



        }).fail(function() {

            // Retrieve data from cache
            var affiliations = JSON.parse(localStorage.getItem('affiliationsData'));

            if (affiliations!= null) {
                layerAffiliations = L.geoJson(affiliations, {
                    onEachFeature: traits
                });

            } else {
                console.log(error);
            }
        });
    }


    function getStyle(feature) {
        return {color: feature.properties.color,
                weight: feature.properties.weight,
                opacity: feature.properties.opacity};
    }

    function getSectorStyle(feature) {
        return {color: feature.properties.color,
                weight: feature.properties.weight,
                opacity: feature.properties.opacity};
    }

    /* Funcion para el zoom en cada sector */
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeatureSectors(feature, layer) {
        layer.on({
        click: zoomToFeature
        });
    }


    function onEachFeature(feature, layer) {

        if (feature.properties && feature.properties.schedule) {

            var container = $('<div />');
            // Delegate all event handling for the container itself and its contents to the container
            container.on('click', '.profile-link', function() {
                $scope.openProfile(feature);
            });

            // Insert whatever you want into the container, using whichever approach you prefer
            container.html("<div class='map-popup'>" +
                           "<a class='profile-link' href='#'>" +
                           // "<div class='centered profile-icon' style='color: " + feature.properties["color"] + "; opacity: 0.4;'><i class='icon ion-android-walk'></i></div>" +
                           "<div class='centered'><img class='wastepickerpic' src='" + feature.properties["waste_picker-image_url"] + "'/></div>" +
                           "<div class='centered map-profile-name' style='color: " + feature.properties["color"] + "; opacity: 0.5;'>@" + feature.properties["waste_picker-name"] + "</div>" +
                           "</a>" +
                           "</div>");
            //container.append(feature.properties["schedule"]);

            // Insert the container into the popup
            layer.bindPopup(container[0]);
            // layer.bindPopup("Hello!").openPopup();
            //layer.openPopup();


        }
    }

    $timeout(function(){
        // console.log("Cargando...");
        loadMap();
    },100);


    $scope.openDialer = function(number) {
        window.open('tel: ' + number, '_system');
    };

    $scope.sendEmail = function(email) {
        window.open('mailto: ' + email, '_system');
    };

    /*============FUNCION PARA LA GEOLOCALIZACION==========*/


    function onLocationFound(e) {
        var myPosition = L.icon({iconUrl:"images/myPosition.png", iconAnchor:[24,56]});
        var radius = e.accuracy / 2;
        L.marker(e.latlng,{icon: myPosition}).addTo(map);
        //L.circle(e.latlng, radius).addTo(map);

    }

    function onLocationError(e) {
        //alert(e.message);
        alert("Ubicación no encontrada, por favor active el Servicio de Ubicación(GPS) de su dispositivo");
        stopLocate();
    }


    $scope.obtenerPosicion = function(){
        console.log("Funcion Geolocalizacion");
        map.locate({setView: true, maxZoom:15, timeout: 5000});
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

    }
    //$scope.obtenerPosicion();

    $scope.openProfile = function(feature) {
        $scope.mapNavigator.pushPage('profile.html');
        //$scope.ons.slidingMenu.setMainPage("profile.html", {closeMenu: true});
        $scope.currentWastePicker = feature.properties;
    };

    $scope.openAffiliation = function(feature) {
        $scope.mapNavigator.pushPage('new.html');
        $scope.currentAffiliation= feature.properties;
    };

    function showLayer(layer) {
      if (!map.hasLayer(layer)) {
        layer.addTo(map);
      }
    };

    function hideLayer(layer) {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    };

    function showLayerSectionsOrRoutes() {
      if (map.getZoom() >= 14 ) {
        hideLayer(layerSectors);
        showLayer(layerRoutes);
        // Info popup
        showMapAlert();
      } else {
        hideLayer(layerRoutes);
        showLayer(layerSectors);
      }
    };

    function hideLayerSectionsOrRoutes() {
      hideLayer(layerSectors);
      hideLayer(layerRoutes);
    };

    function showMapAlert() {
      var mapAlertExecuted = localStorage.getItem('mapAlertExecuted');
      if (mapAlertExecuted == null) {
          localStorage.setItem('mapAlertExecuted', 'Y');
          popup = L.popup()
              .setLatLng(map.getCenter())
              .setContent("Haz un tab sobre cada línea para</br>conocer a <strong>l@s reciclador@s<strong>")
              .openOn(map);
      }
    };


    showHideLayers = function(event) {
        if(event.target.id == "layerWastePickers") {
            if(event.target.checked) {
              localStorage.setItem("showLayerSectionsOrRoutes","true");
              showLayerSectionsOrRoutes();

            } else {
              localStorage.setItem("showLayerSectionsOrRoutes","false");
              hideLayerSectionsOrRoutes();
            }
        }
        // else if(event.target.id == "layerBusiness") {
        //     if(event.target.checked) {
        //         layerBusiness.addTo(map);
        //         localStorage.setItem("estado_bussines","activo");
        //     }
        //     else {
        //         map.removeLayer(layerBusiness);
        //         localStorage.removeItem("estado_bussines");
        //     }
        // }
        else if(event.target.id == "layerAffiliations") {
            if(event.target.checked) {
                layerAffiliations.addTo(map);
                localStorage.setItem("estado_affiliations","elegido");
            }
            else {
                map.removeLayer(layerAffiliations);
                localStorage.removeItem("estado_affiliations");
            }
        }
    }

});
