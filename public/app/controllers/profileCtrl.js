angular.module('profileCtrl',[])
    .controller('profileCtrl',function($scope,$location){
    var vm =  this;
    
    vm.title = "profile";
    $scope.category = [
       {name: 'Technology'},
       {name: 'Music'},
       {name: 'sports'},
       {name: 'Engineering'},
       {name: 'Science'},
       {name: 'online'},
       {name: 'John Deere'}];
    $scope.interests = [
       {name: 'Technology'},
       {name: 'Music'},
       {name: 'sports'},
       {name: 'Engineering'},
       {name: 'Science'},
       {name: 'online'},
       {name: 'John Deere'}];
    
    vm.updateProfile= function(profileData){
        console.log(vm.profileData);
        $location.path('/home');
    }
});