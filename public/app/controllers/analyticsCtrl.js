angular.module('analyticsCtrl',['angularUtils.directives.dirPagination'])
    .controller('analyticsCtrl',function($scope,$http,$window,$location){
    var vm = this;
    vm.title = "Analytics";
    vm.token={};
    vm.fname=null;
    vm.both=true;
    vm.eventsnike=null;
    vm.nikeevents=false;
    vm.toyotaevents=false;

    vm.states = ["","Alabama","Alaska","Arizona","Arkansas", 
"California","Colorado","Connecticut" ,"Delaware" ,"Florida","Georgia","Hawaii" ,"Idaho" ,"Illinois" ,"Indiana","Iowa" ,"Kansas" ,"Kentucky" ,"Louisiana" ,"Maine" ,"Maryland" ,"Massachusetts" ,"Michigan" ,"Minnesota" ,"Mississippi" ,"Missouri" ,"Montana" ,"Nebraska","Nevada" ,"New Hampshire","New Jersey" ,"New Mexico" ,"New York" ,"North Carolina" ,"North Dakota" ,"Ohio" ,"Oklahoma" ,"Oregon" ,"Pennsylvania" ,"Rhode Island ","South Carolina ","South Dakota" ,"Tennessee ","Texas","Utah ","Vermont" ,"Virginia" ,"Washington" ,"West Virginia" ,"Wisconsin" ,'Wyoming'];
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
    vm.count = [];
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
    vm.eventsObjInState = {};
    vm.eventsStateMap = {};
    vm.eventsAge = {};
    vm.categoryEvents = [];

    vm.budget = [6.19,4.70,3.60,3.83,4.44,3.79,4.20,3.83,2.79,1.64,1.69,1.71,1.44];
    vm.revenue = [];
    vm.budgetYears = [2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003];
    vm.revenueYears = [];

    vm.geo_map = {};
    
    vm.nike=function(){
        $http.post("http://advanalytics.herokuapp.com/get_nike")
            .success(function(data){
                console.log(data);
                vm.eventsnike=data.events;
                var temp = 226;
                for(var i=0;i<vm.eventsnike.length;i++){
                    if(i > 0 && i < 70) {
                        vm.eventsnike[i].ageGroup = "15-35";
                    }else if(i >=70 && i < 110) {
                        vm.eventsnike[i].ageGroup = "36-55";
                    }else{
                       vm.eventsnike[i].ageGroup = "55+"; 
                    }
                    if(vm.eventsnike[i].attendance<15000){
                        temp += 116;
                        vm.eventsnike[i].attendance= 15000 + temp;
                    }
                }
                vm.both=false; 
                vm.toyotaevents=false;
                vm.nikeevents=true; 

                if(data.events.length === 0){
                    sweetAlert("No events found ",'',"error");
                }
                else{

                    // initialize categoryEventsMap

                    /*for(var i=0; i<data.targetCategory.length; i++){
                        vm.categoryEventsMap[data.targetCategory[i]] = 0;
                    }

*/
                     
                    for(var i=0;i<data.events.length;i++){
                       
                        if(data.events[i].score > 0){
                            vm.positiveEvents++;
                        }
                        else if(data.events[i].score == 0){
                            vm.neutralEvents++;
                        }
                        else{
                            vm.negativeEvents++;
                        }
                        
                        if(vm.categoryEventsMap.hasOwnProperty(data.events[i].type)){
                            vm.categoryEventsMap[data.events[i].type]++;

                        }
                        else{
                            vm.categoryEventsMap[data.events[i].type] = 1;
                        }
                       //vm.categoryEventsMap[data.events[i].category_id]++;


                       //events-state map

                       if(vm.eventsStateMap.hasOwnProperty(data.events[i].state)){
                           vm.eventsStateMap[data.events[i].state]++;
                       }
                       else{
                           vm.eventsStateMap[data.events[i].state] = 1;

                       }

                       if(vm.eventsObjInState.hasOwnProperty(data.events[i].state)){

                          vm.eventsObjInState[data.events[i].state].push(data.events[i]);
                       }
                       else {
                          vm.eventsObjInState[data.events[i].state] = [data.events[i]];
                       }
                      
                      if(vm.eventsAge.hasOwnProperty(data.events[i].ageGroup)){

                          vm.eventsAge[data.events[i].ageGroup].push(data.events[i]);
                       }
                       else {
                          vm.eventsAge[data.events[i].ageGroup] = [data.events[i]];
                       }


                       //for geographics map

                       if(vm.geo_map.hasOwnProperty((data.events[i].state_abbr).toLowerCase())){
                           vm.geo_map[(data.events[i].state_abbr).toLowerCase()]++;
                       }
                       else{
                           vm.geo_map[(data.events[i].state_abbr).toLowerCase()] = 1;

                       }
                       


                    }
                    for(var key in vm.geo_map){
                         //console.log(key+":"+ vm.geo_map[key]);
                         vm.eventData.push({'hc-key': key,'value': vm.geo_map[key],'drilldown': key});
                       }


                    console.log(vm.eventsObjInState);
                    console.log(vm.state);
                    console.log(vm.eventsAge);
                    console.log(vm.geo_map);
                    console.log(vm.eventData);
                    vm.eventsAgeState = {};
                    if(vm.state && vm.age){
                      for(var key in vm.eventsObjInState){
                        for(var i = 0 ; i< vm.eventsObjInState[key].length; i++ ) {
                            if(vm.eventsAgeState.hasOwnProperty(key)) {
                                if(vm.eventsAgeState[key].hasOwnProperty(vm.eventsObjInState[key][i]["ageGroup"])) {
                                    vm.eventsAgeState[key][vm.eventsObjInState[key][i]["ageGroup"]].push(vm.eventsObjInState[key][i]);
                                }else{

                                    vm.eventsAgeState[key][vm.eventsObjInState[key][i]["ageGroup"]] = [vm.eventsObjInState[key][i]];
                                }
                            }else{
                                vm.eventsAgeState[key] = {};
                                 vm.eventsAgeState[key][vm.eventsObjInState[key][i]["ageGroup"]] = [vm.eventsObjInState[key][i]];
                            }
                        }
                      }
                      console.log(vm.eventsAgeState);
                      vm.eventsnike = vm.eventsAgeState[vm.state][vm.age];
                    }
                    else if(vm.state){
                     vm.eventsnike = vm.eventsObjInState[vm.state];
                    }
                    else if(vm.age){
                     console.log(vm.age);
                     vm.eventsnike = vm.eventsAge[vm.age];
                    }
                    else{
                    vm.eventsnike = data.events;
                    }

                    console.log(vm.eventsnike.length);
                    //vm.eventsnike = vm.eventsObjInState[vm.state];
                    //console.log(vm.categoryEventsMap);
                    //console.log(vm.eventsStateMap);
                    // for map
                    for(var key in vm.categoryEventsMap){
                        vm.categoryEvents.push({name: key, y:vm.categoryEventsMap[key]});
                    }

                    for(var key in vm.eventsStateMap){
                        vm.locations.push(key);
                        vm.count.push(vm.eventsStateMap[key]);
                    }

                    //console.log(vm.locations);
                    //console.log(vm.count);
                    
                    vm.displayLocationChart();

                    //geo_map
                    vm.displayMap();
                }

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

                   // eventsCategoryMap
                    vm.displayEventsCategoryChart();

                    // budgetGraph

                    vm.displayBudgetGraph();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };
    vm.toyota=function(){
        $http.post("http://advanalytics.herokuapp.com/get_toyota")
            .success(function(data){
                vm.eventstoyota=data.events;
                vm.both=false; 
                vm.toyotaevents=true;
                vm.nikeevents=false; 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
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
                text: 'Events By Type'
            },
            tooltip: {
                pointFormat: '<b>{point.percentage}</b>'
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
                name: 'Type',
                colorByPoint: true,
                data: vm.categoryEvents
            }]
    });

   }

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


    vm.displayLocationChart = function(){
        
        
      Highcharts.chart({
        chart: {
            renderTo: 'container_graph2',
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
            categories: vm.locations
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'States',
            data: vm.count
        }]
    });
        
    } 


    vm.displayBudgetGraph = function(){
        
        
      Highcharts.chart({
        chart: {
            renderTo: 'container_graph5',
            type: 'column',
            options3d: {
                enabled: false,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: 'Budget Spent on Advertisements & Endorsements'
        },
       
        plotOptions: {
            column: {
                depth: 50
            }
        },
        xAxis: {
            categories: vm.budgetYears
        },
        yAxis: {
            title: {
                text: 'In Billion Dollars'
            }
        },
        series: [{
            name: 'Budget',
            data: vm.budget
        }]
    });
        
    } 

 // Revenue graph
     Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'container_graph6'
        },
        title: {
            text: 'Revenue for Nike 2010-2016'
        },
       
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Revenue in Billions(Dollars)'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                    
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: [{
            name: 'Revenue',
            colorByPoint: true,
            data: [{
                name: '2010',
                y: 76.88,
                drilldown: '2010'
            }, {
                name: '2011',
                y: 83.04,
                drilldown: '2011'
            }, {
                name: '2012',
                y: 94.50,
                drilldown: '2012'
            }, {
                name: '2013',
                y: 102.26,
                drilldown: '2013'
            }, {
                name: '2014',
                y: 113.44,
                drilldown: '2014'
            }, {
                name: '2015',
                y: 123.22,
                drilldown: '2015'
            },{
                name: '2016',
                y: 31.91,
                drilldown: null
            }]
        }],
        drilldown: {
            series: [{
                name: '2010',
                id: '2010',
                data: [
                    [
                        '2010-Q1',
                        18.65
                    ],
                    [
                        '2010-Q2',
                        19.01
                    ],
                    [
                        '2010-Q3',
                        19.39
                    ],
                    [
                        '2010-Q4',
                        19.83
                    ]
                ]
            }, {
                name: '2011',
                id: '2011',
                data: [
                    [
                        '2011-Q1',
                       20.17
                    ],
                    [
                        '2011-Q2',
                        20.12
                    ],
                    [
                        '2011-Q3',
                       21.02
                    ],
                    [
                        '2011-Q4',
                        21.73
                    ] 
                ]
            }, {
                name: '2012',
                id: '2012',
                data: [
                    [
                        '2012-Q1',
                       22.30
                    ],
                    [
                        '2012-Q2',
                        23.52
                    ],
                    [
                        '2012-Q3',
                        23.91
                    ],
                    [
                        '2012-Q4',
                        24.32
                    ]
                ]
            }, {
                name: '2013',
                id: '2013',
                data: [
                    [
                        '2013-Q1',
                       24.85
                    ],
                    [
                        '2013-Q2',
                        25.31
                    ],
                    [
                        '2013-Q3',
                       25.81
                    ],
                    [
                        '2013-Q4',
                        23.29
                    ]
                ]
            }, {
                name: '2014',
                id: '2014',
                data: [
                   [
                        '2014-Q1',
                       27.07
                    ],
                    [
                        '2014-Q2',
                        27.80
                    ],
                    [
                        '2014-Q3',
                        28.81
                    ],
                    [
                        '2014-Q4',
                        29.76
                    ]
                ]
            }, {
                name: '2015',
                id: '2015',
                data: [
                    [
                        '2015-Q1',
                       30.25
                    ],
                    [
                        '2015-Q2',
                        30.60
                    ],
                    [
                        '2015-Q3',
                        31.03
                    ],
                    [
                        '2015-Q4',
                        31.34
                    ]
                ]
            }]
        }
    });

// device budget spent
Highcharts.chart({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'container_graph7'
        },
        title: {
            text: 'Spending in millions (US Dolalrs)'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Ads & Endorsements',
            data: [
                { name: 'Tv', y: 400.80 },
                { name: 'Internet', y: 700.1 },
                { name: 'Magazines', y: 200.38 },
                { name: 'Outdoor', y: 40.77 },
                { name: 'Newspapers', y: 100.91 },
                { name: 'Unmeasured', y: 1250 }
            ]
        }]
    });

// map

vm.displayMap = function(){
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
      data: vm.eventData,
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
});