angular.module('homeCtrl',[])
    .controller('homeCtrl',function($scope,$http,$window){
    var vm =  this;
    $scope.token= $window.localStorage.getItem('accessToken');
     vm.userDetails = JSON.parse($window.localStorage.getItem('user'));
    
    vm.title = "home";
    
     vm.token = {};
    
    vm.getCategories=function(token){
       vm.token.token =$window.localStorage.getItem('accessToken');
        console.log(vm.token.token);
        $http.post("http://advanalytics.herokuapp.com/users/getUser",vm.token)
            .success(function(data){
                        /*console.log(data.data);
                        console.log(data.data.interests);*/
            $window.localStorage.setItem('user',JSON.stringify(data.data));
            
                     })
            .error(function(data) {
				console.log('Error: ' + data);
			});
        $http.post("http://advanalytics.herokuapp.com/getCategories")
            .success(function(data){
            $scope.trendings = data.events;
                console.log($scope.trendings);
            $window.localStorage.setItem('Interests',JSON.stringify($scope.trendings));
        })
        .error(function(data) {
				console.log('Error: ' + data);
			});
    }
    
});