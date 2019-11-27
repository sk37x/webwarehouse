window.onload = function () {
    var datex = $('.dateCreate');
    
    var datexVal = new Date($('.dateCreate').val());
    
    $(datex).each(function(i, val){
        var dateCreate = new Date($(this).val());
        console.log(dateCreate);
        return dateCreate;
    })
    
    console.log(datexVal);

    var options = {
        animationEnabled: true,
        title:{
            text: "ยอดการจอง"
        },
        axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "จำนวนครั้ง",
            includeZero: false,
            valueFormatString: "$##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "DD MMM",
            yValueFormatString: "$##0.00",
            dataPoints: [
                {x: new Date($(datex).val()), y: 50}

                // { x: new Date(2017, 08, 01), y: 75 },
    
                // { x: new Date(2017, 08, 04), y: 84.42 },
                // { x: new Date(2017, 08, 05), y: 84.97 },
                // { x: new Date(2017, 08, 06), y: 84.89 },
                // { x: new Date(2017, 08, 07), y: 84.78 },
                // { x: new Date(2017, 08, 08), y: 85.09 },
                // { x: new Date(2017, 08, 09), y: 85.14 },
    
                // { x: new Date(2017, 08, 11), y: 84.46 },
                // { x: new Date(2017, 08, 12), y: 84.71 },
                // { x: new Date(2017, 08, 13), y: 84.62 },
                // { x: new Date(2017, 08, 14), y: 84.83 },
                // { x: new Date(2017, 08, 15), y: 84.37 },
                
                // { x: new Date(2017, 08, 18), y: 84.07 },
                // { x: new Date(2017, 08, 19), y: 83.60 },
                // { x: new Date(2017, 08, 20), y: 82.85 },
                // { x: new Date(2017, 08, 21), y: 82.52 }
            ]
        }]
    };
    
    $("#chartContainer").CanvasJSChart(options);
    
    }