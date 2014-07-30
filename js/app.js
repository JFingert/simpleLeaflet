var app = angular.module('App', []);


app.controller('MainController', function ($scope, $http, $filter) {

	var orderBy = $filter('orderBy');
  $scope.obj = {};
  $scope.treeByHealth = {};
  $scope.treeNames = [];
  $scope.treeProperties = [];
  $scope.markerTracker = {};
  

  


  $scope.add = function (data, status) {
    console.log("add called", data);
    var myLayer = L.geoJson().addTo(map);
    var array = [];
    
    if (status == 'all') {
      if (data.good.length > 0) {
        console.log("data.good",data.good)
        $scope.good(data.good);
      }
      if (data.fair.length > 0) {
        $scope.fair(data.fair);
      }
      if (data.poor.length > 0) {
        $scope.poor(data.poor);
      }
      
    }
    if (status == 'good') {
      $scope.good(data);
    }
    if (status == 'fair') {
      $scope.fair(data);
    }
    if (status == 'poor') {
      $scope.poor(data);
    }

    $scope.good = function (data) {
      data.forEach(function (tree) {

        var geojsonMarkerOptions = {
            radius: 7,
            fillColor: "#3CA855",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        function onEachFeature(tree, layer) {
          console.log("onEachFeature called", tree);
          if (tree.properties) {
            layer.bindPopup(tree.properties.popupContent);
            layer.on('mouseover', function (e) {
              this.openPopup();
            });
            layer.on('mouseout', function (e) {
              this.closePopup();
            });
          }
        }
      

        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "show_on_map": true,
            "name": tree.properties.COMMON,
            "health": tree.properties.HEALTH,
            "popupContent": tree.properties.COMMON + "<br>Health: " + tree.properties.HEALTH + '<br>' + tree.properties.ADDRESS
          },
          "geometry": {
            "type": "Point",
            "coordinates": [tree.geometry.coordinates[0], tree.geometry.coordinates[1]]
          }
        };
        

        L.geoJson(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(map);

      });
  } 
    $scope.fair = function (data) {
      data.forEach(function (tree) {
        var geojsonMarkerOptions = {
            radius: 7,
            fillColor: "#ff7800",
            color: "#000",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        };

        function onEachFeature(tree, layer) {
          console.log("onEachFeature called", tree);
          if (tree.properties) {
            layer.bindPopup(tree.properties.popupContent);
            layer.on('mouseover', function (e) {
              this.openPopup();
            });
            layer.on('mouseout', function (e) {
              this.closePopup();
            });
          }
        }
      

        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "show_on_map": true,
            "name": tree.properties.COMMON,
            "health": tree.properties.HEALTH,
            "popupContent": tree.properties.COMMON + "<br>Health: " + tree.properties.HEALTH + '<br>' + tree.properties.ADDRESS
          },
          "geometry": {
            "type": "Point",
            "coordinates": [tree.geometry.coordinates[0], tree.geometry.coordinates[1]]
          }
        };
        
        

        L.geoJson(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(map);

      });
  }

  $scope.poor = function (data) {
      data.forEach(function (tree) {

        var geojsonMarkerOptions = {
            radius: 7,
            fillColor: "#F02D3A",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        function onEachFeature(tree, layer) {
          console.log("onEachFeature called", tree);
          if (tree.properties) {
            layer.bindPopup(tree.properties.popupContent);
            layer.on('mouseover', function (e) {
              this.openPopup();
            });
            layer.on('mouseout', function (e) {
              this.closePopup();
            });
          }
        }
      

        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "show_on_map": true,
            "name": tree.properties.COMMON,
            "health": tree.properties.HEALTH,
            "popupContent": tree.properties.COMMON + "<br>Health: " + tree.properties.HEALTH + '<br>' + tree.properties.ADDRESS
          },
          "geometry": {
            "type": "Point",
            "coordinates": [tree.geometry.coordinates[0], tree.geometry.coordinates[1]]
          }
        };
        
        

        L.geoJson(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(map);

      });
  }


};

$scope.fair = function (data) {
  console.log("fair called", data, $scope.obj);
    var array = [];
    var myLayer = L.geoJson().addTo(map);

    data.forEach(function(tree) {
      if(tree.properties.HEALTH == 'Fair') {
        array.push(tree);
      } 
    });

    array.forEach(function (tree) {
      console.log("fair condition tree", tree);

      function onEachFeature(tree, layer) {
        console.log("onEachFeature called", tree);
        if (tree.properties) {
          layer.bindPopup(tree.properties.popupContent);
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
            this.closePopup();
          });
        }
      }

      var geojsonFeature = {
        "type": "Feature",
        "properties": {
          "show_on_map": true,
          "name": tree.properties.COMMON,
          "health": tree.properties.HEALTH,
          "popupContent": tree.properties.COMMON + "<br>health: " + tree.properties.HEALTH + '<br>' + tree.properties.ADDRESS
        },
        "geometry": {
          "type": "Point",
          "coordinates": [tree.geometry.coordinates[0], tree.geometry.coordinates[1]]
        }
      };
      L.geoJson(geojsonFeature, {
        onEachFeature: onEachFeature
      }).addTo(map);
    });
};











      //pull in the data


      $http.get('data/trees_concordia.json')
      .then(function(result){
        
        $scope.treeData = result.data.features;
        // $scope.treeData.show_on_map = false;
        console.log("result", $scope.treeData);
        // $scope.addMarkers($scope.treeData);
        $scope.treeData.forEach(function (entry) {
          $scope.treeProperties.push(entry);

          $scope.obj[entry.properties.COMMON] = [];
          $scope.treeByHealth[entry.properties.COMMON] = {good: [], fair: [], poor: []};
          // $scope.markerTracker[entry.properties.COMMON] = [];

        });
        console.log("$scope.treeByHealth", $scope.treeByHealth)
        for (key in $scope.obj) {
          $scope.treeNames.push({key: []});
        }


        

        console.log("treeProperties", $scope.treeProperties);

        $scope.treeProperties.forEach(function (tree) {
          tree.properties.show_on_map = false;
          for(key in $scope.obj) {
            if (tree.properties.COMMON == key) {
              $scope.obj[key].push(tree);
            }

          }
        });

        $scope.treeProperties.forEach(function (tree) {
          tree.properties.show_on_map = false;
          for(key in $scope.treeByHealth) {
            if (tree.properties.COMMON == key) {
              if (tree.properties.HEALTH == 'Good') {
                $scope.treeByHealth[key].good.push(tree);
              }
              if (tree.properties.HEALTH == 'Fair') {
                $scope.treeByHealth[key].fair.push(tree);
              }
              if (tree.properties.HEALTH == 'Poor') {
                $scope.treeByHealth[key].poor.push(tree);
              }
              
            }

          }
        });
        console.log("$scope.obj",$scope.obj);
        console.log("$scope.treeByHealth",$scope.treeByHealth);
        $scope.add($scope.treeByHealth);
      });

});