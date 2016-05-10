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
    vm.eventsStateMap = {};
    vm.categoryEvents = [];

    vm.budget = [6.19,4.70,3.60,3.83,4.44,3.79,4.20,3.83,2.79,1.64,1.69,1.71,1.44];
    vm.revenue = [];
    vm.budgetYears = [2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003];
    vm.revenueYears = [];
    
    vm.nike=function(){
        $http.post("http://advanalytics.herokuapp.com/get_nike")
            .success(function(data){
                console.log(data);
                vm.eventsnike=data.events;
                for(var i=0;i<vm.eventsnike.length;i++){
                    if(vm.eventsnike[i].attendance<15000){
                        vm.eventsnike[i].attendance=15000;
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


                       
                    }
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

});