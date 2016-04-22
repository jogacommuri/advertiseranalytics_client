angular.module('eventDemoCtrl',[])
    .controller('eventDemoCtrl',function($scope,$window){
    var vm =  this;
    $scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
    vm.profileData = {};
    vm.profileData =  $scope.userDetails;
});