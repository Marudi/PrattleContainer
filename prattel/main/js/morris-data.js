// Dashboard 1 Morris-chart
$(function () {
    "use strict";
var lineChartData = MYLIBRARY.campaignStatus(0);
var lineChartData1 = JSON.parse(lineChartData);

var Area_chart = Morris.Area({
        element: 'morris-area-chart',
        data: lineChartData1,
        xkey: 'period',
        ykeys: ['calls', 'ucontacts'],
        labels: ['Calls', 'Unique Callers'],
        xLabels: 'Day',
        xLabelFormat: function(x) {
            var day = new Date(x).getDate();
            return day;
          },
        pointSize: 3,
        fillOpacity: 0,
        pointStrokeColors:['#009efb', '#55ce63'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 3,
        hideHover: 'auto',
        lineColors: ['#009efb', '#55ce63'],
        resize: true
        
    });
    
 // Morris donut chart

        var Completed = MYLIBRARY.campaignStatus(1);
        var Pending = MYLIBRARY.campaignStatus(2);
        var Stopped = MYLIBRARY.campaignStatus(3);
        
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Pending Campaigns",
            value: Pending,

        }, {
            label: "Completed Campaigns",
            value: Completed
        }, {
            label: "Stopped Campaigns",
            value: Stopped
        }],
        resize: true,
        colors:['#009efb', '#55ce63', '#2f3d4a']
    });

// Morris bar chart
var barChartData = MYLIBRARY.campaignStatus(4);
var barChartData1 = JSON.parse(barChartData);
var Bar_chart = Morris.Bar({
        element: 'morris-bar-chart',
        data: barChartData1,
        xkey: 'period',
        ykeys: ['calls'],
        labels: ['Calls'],
        xLabels: 'hour',
        parseTime: false,
        barColors:['#55ce63'],
        hideHover: 'auto',
        gridLineColor: '#eef0f2',
        resize: true
    });

    $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

        }

    });

    $("#analyticDate").on("change", function(){
        var selected_date = $(this).val(); 
        $.ajax({
            type: "POST",
            url: "/prattel/analytics",
            data: {selectedDate: selected_date},
            dataType: 'JSON',
            success: function(data){
                console.log(data);
                Area_chart.setData(data);  // Helps to recreate your chart with result data's
            },
            error: function(data){
                // Something went wrong
                // HERE you can handle asynchronously the response 

                // Log in the console
                var errors = data.responseJSON;
                console.log(errors);
            }
        });
    });

    $("#analyticCalls").on("change", function(){
        var selected_id = $(this).val(); 
        $.ajax({
            type: "POST",
            url: "/prattel/analytics1",
            data: {campaign_id: selected_id},
            dataType: 'json',
            success: function(data){
                console.log(data);
                Bar_chart.setData(data);  // Helps to recreate your chart with result data's
            },
            error: function(data){
                // Log in the console
                var errors = data.responseJSON;
                console.log(errors);
            }
        });
    });
 });    