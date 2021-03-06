angular.module('homeCtrl',['angularUtils.directives.dirPagination'])
    .controller('homeCtrl',function($scope,$http,$window,$location){
    var vm =  this;
    $scope.token= $window.localStorage.getItem('accessToken');
     
    
    vm.title = "home";
    vm.events=null;
    vm.back = function() { 
        $window.location.reload();
      };
    $scope.sweetalert=false;
    $scope.getaddDetails=true;
    $scope.recomendations=false;
     vm.token = {};
    vm.ages=["18-24","25-34","35-44","45-54","55-64","65+"];
    vm.states = ["","Alabama","Alaska","Arizona","Arkansas", 
"California","Colorado","Connecticut" ,"Delaware" ,"Florida","Georgia","Hawaii" ,"Idaho" ,"Illinois" ,"Indiana","Iowa" ,"Kansas" ,"Kentucky" ,"Louisiana" ,"Maine" ,"Maryland" ,"Massachusetts" ,"Michigan" ,"Minnesota" ,"Mississippi" ,"Missouri" ,"Montana" ,"Nebraska","Nevada" ,"New Hampshire","New Jersey" ,"New Mexico" ,"New York" ,"North Carolina" ,"North Dakota" ,"Ohio" ,"Oklahoma" ,"Oregon" ,"Pennsylvania" ,"Rhode Island ","South Carolina ","South Dakota" ,"Tennessee ","Texas","Utah ","Vermont" ,"Virginia" ,"Washington" ,"West Virginia" ,"Wisconsin" ,'Wyoming'];
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
    vm.getRecomendations=function(){
        //vm.adData.category=vm.category;
        //vm.adData.state=vm.state;
        vm.adData.name = vm.name;
    console.log( vm.adData);
        $scope.getaddDetails=false;
        $scope.recomendations=true;
        $http({
            method:'POST',
            url:'http://advanalytics.herokuapp.com/findCategory',
            data: vm.adData
        }).success(function(data){
                
                console.log(data);
                if(data.events.length === 0){
                    sweetAlert("No events found ",'',"error");
                }
                else{

                    // initialize categoryEventsMap

                    for(var i=0; i<data.targetCategory.length; i++){
                        vm.categoryEventsMap[data.targetCategory[i]] = 0;
                    }


                    for(var i=0;i<data.events.length;i++){
                        if(data.events[i].image_url!=null){
                            data.events[i].image_url=data.events[i].image_url.replace(/\/small\//,'/medium/');
                        }   
                        else{
                            data.events[i].image_url="images/home-thumb/"+data.events[i].category_id+".png";
                        }

                        if(data.events[i].score > 0){
                            vm.positiveEvents++;
                        }
                        else if(data.events[i].score == 0){
                            vm.neutralEvents++;
                        }
                        else{
                            vm.negativeEvents++;
                        }

                        vm.categoryEventsMap[data.events[i].category_id]++;
                    }
                    vm.events=data.events; 
                    console.log(vm.categoryEventsMap);
                    // for map
                    for(var key in vm.categoryEventsMap){
                        vm.categoryEvents.push({name: key, y:vm.categoryEventsMap[key]});
                    }
                    console.log(vm.categoryEvents);


                    for(var i=0; i<data.stateCount.length; i++){

                        vm.eventData.push({'hc-key':data.stateCount[i]['hc-key'],'value': data.stateCount[i]['value'],'drilldown':data.stateCount[i]['hc-key']});
                    }

                    vm.displayMap(vm.eventData);

                    // for cluster
 
                    for(var i=0; i < data.clusterResponse.length; i++){
                        vm.centroids.push(data.clusterResponse[i].centroid);
                         if(i == 0){
                            vm.cluster1.push(data.clusterResponse[i].cluster);
                         }
                         if(i == 1){
                            vm.cluster2.push(data.clusterResponse[i].cluster);
                         }
                    }

                    vm.displayClusterChart();

                    //eventsAnalysis

                    vm.displayEventsChart();
                    //

                    vm.displayEventsCategoryChart();

                } 

        }).error(function(error) {
            sweetAlert("Oops! some thing went wrong",error,"error");
        });
        
        /*$http.post('http://advanalytics.herokuapp.com/getEventCountsByCategory',  vm.adData)
            .success(function(data){
                console.log("post sucess");
                console.log(data.eventCounts);
                for(var i=0; i< data.eventCounts.length;i++){
                    //console.log(data.eventCounts[i].region_name.substring(0,2).toUpperCase());
                    vm.locations.push(data.eventCounts[i].region_abbr.toUpperCase());
                
                    vm.eventCount.push(data.eventCounts[i].noOfEvents);
                    vm.eventData.push({'hc-key':data.eventCounts[i].region_abbr,'value':data.eventCounts[i].noOfEvents,'drilldown':data.eventCounts[i].region_abbr});
               
                }
                console.log(vm.locations);
                 console.log(vm.eventCount);
                console.log(vm.eventData);
                 //vm.displayLocationChart(vm.locations, vm.eventCount);
                 vm.displayMap(vm.eventData);
            })
            .error(function(data) {
                    console.log('Error: ' + data);
                });*/
        $http.post('http://advanalytics.herokuapp.com/demographics_age',  {category_id:vm.adData.category})
            .success(function(data){
                console.log("post sucess");
                console.log(data.male);
                
                vm.maleData=[];
                while (vm.maleData.length > 0) {
                        vm.maleData.pop();
                    }
                vm.femaleData=[];
                 while (vm.femaleData.length > 0) {
                        vm.femaleData.pop();
                    }
                for(var key in data.male){
                    vm.maleData.push(-(data.male[key])) ;
                    console.log(vm.maleData);
                }
               
            
                for(var key in data.female){
                    vm.femaleData.push(data.female[key]);
                    console.log(vm.femaleData );
                }
                //console.log(vm.femaleData);
                 //event.data = data.results;
               /* console.log(event.data);*/
                //event.displayMap(event.data);
                vm.displayAgeChart(vm.maleData, vm.femaleData);
                vm.loading=false;
            })
            .error(function(data) {
                    console.log('Error: ' + data);
                });
     
    }
    vm.displayAgeChart = function(maleData, femaleData){
        
         Highcharts.chart('container_graph1', {

    	chart: {
    		    type: 'bar'
            },
            title: {
                text: 'Campaign Female vs Male'
            },
           
            xAxis: [{
                categories: vm.categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: vm.categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
                name: 'Male',
                data: maleData
            }, {
                name: 'Female',
                data: femaleData
            }]
        });
        
    }
    vm.displayMap = function(data){
            Highcharts.Map( {

      chart: {
                        renderTo: 'container_geo',
                        type: 'map',
                        

                        events: {
                        
                        drilldown: function (e){
                        alert("inside drilldown");
                        if (!e.seriesOptions) {
                           var chart = this,
                            mapKey = 'countries/us/'+e.point.drilldown+'-all',
                            // Handle error, the timeout is cleared on success
                            fail = setTimeout(function () {
                                if (!Highcharts.maps[mapKey]) {
                                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                                    fail = setTimeout(function () {
                                        chart.hideLoading();
                                    }, 1000);
                                }
                            }, 3000);
                          alert(mapKey);
                        // Show the spinner
                        chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                        // Load the drilldown map
                        $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

                            data = Highcharts.geojson(Highcharts.maps[mapKey]);

                            // Set a non-random bogus value
                            //console.log(data.length);
                            vm.cityData = {};
                            $http.post('http://advanalytics.herokuapp.com/getEventsInCity', {state: e.point.name, category_id: vm.adData.category})
            .success(function(data1){
                console.log(data1.data);
               vm.cityData = data1.data;

               vm.city(vm.cityData);
               
            })
            .error(function(data) {
                    console.log('Error: ' + data);

                });

                    vm.city = function(cityData){ 
                        $.each(data, function (i) {
                                console.log((data[i].name).trim());

                                console.log(cityData[(data[i].name).trim()]);
                                if(cityData[(data[i].name).trim()] == undefined){
                                    this.value = 0;
                                }
                                else{
                                   this.value = cityData[(data[i].name).trim()] ; 
                                }
                                
                            });
                }

                            // Hide loading and add series
                            chart.hideLoading();
                            clearTimeout(fail);
                            chart.addSeriesAsDrilldown(e.point, {
                                name: e.point.name,
                                data: data,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            });
                        });
                    }
                    }
                }
                    },
                 title: {
      text: 'Events data in the US'
    },

    subtitle: {
      text: null
    },
    legend: {
            layout: 'vertical',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: 'true',
            align:'left'
            
        },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
 
    colorAxis: {
      min: 0
            },

    series: [{
      data: data,
      mapData: Highcharts.maps['countries/us/us-all'],
      joinBy: 'hc-key',
      name: 'Event data',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
        point: {

            },
         tooltip: {
                pointFormat: '{point.name}:<br> {point.event} :{point.value}'
    }
    },
    {
      name: 'Separators',
      type: 'mapline',
      data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
      color: 'silver',
      showInLegend: false,
      enableMouseTracking: false
    }],

    drilldown: {
            //series: drilldownSeries,
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
                });
        }
    vm.displayLocationChart = function(locations, count){
        
        
      Highcharts.chart({
        chart: {
        	renderTo: 'container_graph3',
            type: 'column',
            options3d: {
                enabled: false,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: 'Events in Locations'
        },
       
        plotOptions: {
            column: {
                depth: 50
            }
        },
        xAxis: {
            categories: locations
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'States',
            data: count
        }]
    });
        
    }
    Highcharts.chart('container_graph2', {

            chart: {
                
                type: 'pie'
            },
            credits: {
            		enabled: false
            },
            title: {
                text: 'Cross Device'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Location',
                colorByPoint: true,
                data: [{
                    name: 'Desktop',
                    y: 42.33
                }, {
                    name: 'Mobile',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Tablet',
                    y: 10.38
                }, {
                    name: 'Others',
                    y: 14.77
                }]
            }]
    });


   // cluster 

   vm.displayClusterChart = function(){

      Highcharts.chart( {

      

      chart: {
            renderTo: 'container_graph3',
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Clustering'
        },
        subtitle: {
           
        },
        xAxis: {
            title: {
                enabled: false,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                enabled: false,
                text: 'Weight (kg)'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} , {point.y}'
                }
            }
        },
        series: [{
            name: 'Positive',
            color: 'rgba(223, 83, 83, .5)',
            data: vm.cluster1[0]

        }, {
            name: 'Negative',
            color: 'rgba(119, 152, 191, .5)',
            data: vm.cluster2[0]
        },
         {
            name: 'centroid',
            color: 'rgba(0,0,0,0.5)',
            data: vm.centroids
        }
        ]
                });
   }

   // EventsChart

   vm.displayEventsChart = function(){

    Highcharts.chart( {

      
        chart: {
            
            renderTo: 'container_graph1',
            type: 'column'
        },
        title: {
            text: 'Events Analysis'
        },
        subtitle: {
            
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total number of Events'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: [{
            name: 'Events',
            colorByPoint: true,
            data: [{
                name: 'Positive',
                y: vm.positiveEvents
            }, {
                name: 'Neutral',
                y: vm.neutralEvents
            }, {
                name: 'Negative',
                y: vm.negativeEvents
            }]
        }]
      
                });
   }

   // categoryEventsChart

   vm.displayEventsCategoryChart = function(){
     
     Highcharts.chart('container_graph4', {

            chart: {
                
                type: 'pie'
            },
            credits: {
                    enabled: false
            },
            title: {
                text: 'Events By Category'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Location',
                colorByPoint: true,
                data: vm.categoryEvents
            }]
    });

   }
});