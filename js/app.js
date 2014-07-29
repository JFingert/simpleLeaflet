var app = angular.module('App', []);


app.controller('MainController', function ($scope, $http, $filter) {

	var orderBy = $filter('orderBy');
  $scope.obj = {};
  $scope.treeNames = [];
  $scope.treeProperties = [];
  $scope.treeGeometries = [];
  $scope.bool = false;
  $scope.markerTracker = {};
  

  


  $scope.add = function (data) {
    var myLayer = L.geoJson().addTo(map);

    data.forEach(function (tree) {

      console.log("geo tree", tree);

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







$scope.remove = function (name, data) {
 console.log("remove called", data)
 
 var myLayer = L.geoJson().addTo(map);

 data.forEach(function (tree) {


  function onEachFeature(tree, layer) {
    if (tree.properties) {
      layer.bindPopup(tree.properties.popupContent);
    }
  }


  var geojsonFeature = {
    "type": "Feature",
    "properties": {
      "show_on_map": false,
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
  }).removeLayer(map);
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
          $scope.markerTracker[entry.properties.COMMON] = [];

        });
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
        console.log("$scope.obj",$scope.obj);

      });

});









//extra code





// $scope.visibility = function (someFeatures) {
//   someFeatures.forEach(function (feature) {
//     L.geoJson(someFeatures, {
//       filter: function(feature, layer) {
//           return feature.properties.show_on_map;
//       }
//     }).addTo(map);
//   });

// };

// $scope.toggle = function (name, value) {

//   if(value == $scope.bool) {
//     for (key in $scope.obj) {
//       if (name == key) {
//         $scope.add($scope.obj[key]);
//       }
//     }
//   }
//   if(value != $scope.bool) {
//     for (key in $scope.obj) {
//       if (name == key) {
//         $scope.remove($scope.obj[key]);
//       }
//     }
//   }
//   if(bool == true) {
//     bool = false;
//   }
// }


// $scope.addMarkers = function (tree) {
//     console.log("addMarkers tree", tree);
//       var marker = L.marker([tree.geometry.coordinates[1], tree.geometry.coordinates[0]]).addTo(map);
//       marker.bindPopup(tree.properties.COMMON + '<br>' + tree.properties.ADDRESS + '<br>' + tree.geometry.coordinates[1] + ' , ' + tree.geometry.coordinates[0])


//   };

//   $scope.sortMarkers = function (data) {
//     console.log("sortMarkers called with ", data);
//     console.log("sortMarkers obj ", $scope.obj);
//     data.forEach(function (tree) {
//       $scope.addMarkers(tree);
//     });

//   };

