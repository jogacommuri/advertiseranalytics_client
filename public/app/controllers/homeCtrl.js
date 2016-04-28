angular.module('homeCtrl',['angularUtils.directives.dirPagination'])
    .controller('homeCtrl',function($scope,$http,$window,$location){
    var vm =  this;
    $scope.token= $window.localStorage.getItem('accessToken');
     
    
    vm.title = "home";
    vm.events=null;
    $scope.sweetalert=false;
    $scope.getaddDetails=true;
    $scope.recomendations=false;
     vm.token = {};
    
    vm.getCategories=function(token){
       vm.token.token =$window.localStorage.getItem('accessToken');
        console.log(vm.token.token);
        $http.post("http://advanalytics.herokuapp.com/users/getUser",vm.token)
            .success(function(data){
                $scope.interests=data.data.interests;
                $window.localStorage.setItem('user',JSON.stringify(data.data));
                $scope.fname=data.data.fname;
                vm.userDetails = JSON.parse($window.localStorage.getItem('user'));
            
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
        .error(function(error) {
				console.log('Error: ' + error);
			});
    
    };
    vm.getRecomendations=function(category){
    alert(category);
        $scope.getaddDetails=false;
        $scope.recomendations=true;
        $http({
            method:'POST',
            url:'http://advanalytics.herokuapp.com/getEvents',
            data: { "category": category}
        }).success(function(data){
                if(data.totalNoOfEvents===0){
                    sweetAlert("No events found ",'',"error");
                }
                else{
                    for(var i=0;i<data.events.length;i++){
                        if(data.events[i].image_url!=null){
                            data.events[i].image_url=data.events[i].image_url.replace(/\/small\//,'/medium/');
                        }   
                        else{
                            data.events[i].image_url="images/home-thumb/"+data.events[i].category_id+".png";
                        }
                    }
                    vm.events=data.events;
                }

        }).error(function(error) {
            sweetAlert("Oops! some thing went wrong",error,"error");
        });
    }
});