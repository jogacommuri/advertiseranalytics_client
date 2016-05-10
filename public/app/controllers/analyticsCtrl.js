angular.module('analyticsCtrl',['angularUtils.directives.dirPagination'])
    .controller('analyticsCtrl',function($scope,$http,$window,$location){
    var vm = this;
    vm.title = "Analytics";
    vm.token={};
    vm.fname=null;
    vm.both=true;
    vm.eventsnike=null;
    vm.nikeevents=false;
    vm.getCategories=function(){
       vm.token.token =$window.localStorage.getItem('accessToken');
        console.log(vm.token.token);
        $http.post("http://advanalytics.herokuapp.com/users/getUser",vm.token)
            .success(function(data){
                $scope.interests=data.data.interests;
                $window.localStorage.setItem('user',JSON.stringify(data.data));
                vm.fname=data.data.fname;
                vm.userDetails = JSON.parse($window.localStorage.getItem('user'));
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
    }; 
      vm.locations=[];
    vm.eventCount=[];
    vm.eventData=[];
    vm.positiveEvents = 0;
    vm.negativeEvents = 0;
    vm.neutralEvents = 0;
    vm.adData={};

    vm.centroids = [];
    vm.cluster1 = [];
    vm.cluster2 = [];

    vm.categoryEventsMap = {};
    vm.categoryEvents = [];
    
    vm.nike=function(){
        $http.post("http://advanalytics.herokuapp.com/get_nike")
            .success(function(data){
                vm.eventsnike=data.events;
                for(var i=0;i<vm.eventsnike.length;i++){
                    if(vm.eventsnike[i].attendance<15000){
                        vm.eventsnike[i].attendance=15000;
                    }
                }
                vm.both=false; 
                vm.nikeevents=true;  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };
    vm.toyota=function(){
        $http.post("http://advanalytics.herokuapp.com/get_toyota")
            .success(function(data){
                vm.both=false;
                alert('success');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }; 

});