angular.module('loginCtrl',['userService'])
    .controller('loginCtrl',function($location,$http,$window){
    var vm =  this;
    
    vm.title = "login";
    vm.signinData = {};
    
     vm.signinUser=function(signinData){
         console.log(vm.signinData);
         
         $http.post('http://advanalytics.herokuapp.com/users/login',vm.signinData)
            .success(function(data){
             console.log("login post success");
             console.log(data);
             alert(data.msg);
              $window.localStorage.setItem('accessToken', data.accessToken);
             $location.path('/home');
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
//         $location.path('/home');
     };
     
    var vm =  this;
    vm.title ="signup";
    vm.signupUser = function(userData){
        console.log("signup");
        console.log(vm.userData);
       $http.post('http://advanalytics.herokuapp.com/users/signup',vm.userData)
            .success(function(data){
             console.log("signup post success");
             console.log(data);
           alert(data.msg);
            $location.path('/');
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
        // $location.path('/home');	
    };
    
});