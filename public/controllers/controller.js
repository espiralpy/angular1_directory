(function () {
    'use strict';

    angular
    .module('myApp')
    .controller('ListController', ['$scope', '$http', function($scope, $http){
      console.log('Hola desde controller list');

      //get all datas and refresh list
      var refresh = function(){
        $http.get('/contactlist').success(function(response){
          console.log('I got the data I request');
          $scope.contactList = response;
        });
      };

      refresh();

      //add data
      $scope.addContact = function(){
        console.log('testin'+ $scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response){
          console.log(response);
          refresh();
        });
      };

      //remove data
      $scope.remove = function(id){
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response){
          refresh();
        });
      };

      //select a data to update
      $scope.edit = function(id){
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response){
          $scope.contact = response;
        });
      };

      //update a data
      $scope.update = function(id){
          console.log(id);
          $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
            refresh();
          });
      };

    }]);

}());
