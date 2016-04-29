var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.searchText = "";
 
    $scope.search = function(searchText) {
        $scope.closeSuggestions = false;
        var url = "http://www.omdbapi.com/?";
        url = url + 's=' + searchText;
        $http.get(url).success( function(response) {
            $scope.results = response.Search;
        });
    }

    $scope.selectMovie = function(name) {
        $scope.searchText = name;
        $scope.closeSuggestions = true;
    }
});