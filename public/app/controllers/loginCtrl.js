angular.module('loginCtrl',['userService'])
    .controller('loginCtrl',function($location){
    var login =  this;
    
    login.title = "login";
     login.signinUser=function(signinData){
         console.log(login.signinData);
         $location.path('/home');
     }
     
    var vm =  this;
    vm.title ="signup";
    vm.signupUser = function(userData){
        console.log("signup");
        console.log(vm.userData);
        $location.path('/home');
    /*User.create(vm.userData)
        .then(function(response){
            vm.userData = {};

            vm.message = response.data.message;

            $window.localStorage.setItem('token',response.data.token);
            $location.path('/home');
        });*/	
    }
    
});