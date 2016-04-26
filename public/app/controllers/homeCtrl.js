
angular.module('homeCtrl',['angularUtils.directives.dirPagination'])
    .controller('homeCtrl',function($scope,$http,$window,$location){
    var vm =  this;
    $scope.token= $window.localStorage.getItem('accessToken');
     
    
    vm.title = "home";
    vm.events=null;
    $scope.sweetalert=false;
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
    vm.search=function(category){
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
    };
    vm.follow=function(category_id,category_name){
        for(var i=0;i<$scope.interests.length;i++){
            if(category_id==$scope.interests[i].category_id){
                $scope.sweetalert=true;
            }
        }
        if($scope.sweetalert){
            $scope.sweetalert=false;
            sweetAlert("Already Following",'',"error");
        }
        else{
            $http({
                method:'POST',
                url:'http://advanalytics.herokuapp.com/users/follow',
                data: { "category_id": category_id,"category_name":category_name,"email":vm.userDetails.email,"token":$scope.token}
                }).success(function(data){
                    vm.getCategories();
                    sweetAlert("Successfully Saved","","success");

                }).error(function(error) {
                    sweetAlert("Oops! some thing went wrong",error,"error");
                });
        }
    };
    vm.unfollow=function(category_id){
        $http({
                method:'POST',
                url:'http://advanalytics.herokuapp.com/users/unfollow',
                data: { "category_id": category_id,"email":vm.userDetails.email,"token":$scope.token}
                }).success(function(data){
                    vm.getCategories();
                    sweetAlert("Successfully Saved","","success");

                }).error(function(error) {
                    sweetAlert("Oops! some thing went wrong",error,"error");
                });

    }
     
    vm.logout=function(){
        $window.localStorage.clear();
        sweetAlert("Logout Successful");
        $location.path('/');
    }
    
});