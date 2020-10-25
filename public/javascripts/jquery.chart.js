var dateCreatex = $('.dateCreatex');
var room_category = $('.room_category');
var rCate = [];
var bookingCate = $('.bookingCate');
var rsRoom = $('.rsRoom');


$.each(room_category, function (i, val) {
    var rCateVal = this.value;
    rCate.push(rCateVal);
})
var [a, b, c, , z] = rCate
var r = 0,
    m = 0,
    s = 0;

$.each(bookingCate, function (i, val) {
    var bookCate = this.value;
    if (bookCate == a) {
        r++;
    } else if (bookCate == b) {
        m++;
    } else if (bookCate == c) {
        s++;
    } else {
        alert('Error');
        return 0;
    }
})

// var rsCount = [r, m, s]
// $.each(rsRoom, function (i, val) {
//     val.innerHTML = rsCount[i];
// })
// console.log(r);
// console.log(m);
// console.log(s);

// Before Call room_Category (ตัวแปรจะงง ๆ หน่อยตรวจสอบดี ๆ ก่อนแก้!!)
var roomDescription = $('.roomDescription');
var roomDes = [];
var bookDes = $('.bookCount');
var rsRoomOther = $('.rsRoomOther');
var rN1 = 0,
    rN2 = 0,
    rN3 = 0,
    rN4 = 0,
    rN5 = 0,
    rN6 = 0;

var o = 0;
var aArr = [];
var tYear = new Date();
// console.log(tYear.getFullYear());
$.each(roomDescription, function (i, val) {
    var roomDesVal = this.value;
    // console.log(roomDesVal)
    var a = 0;
    for (x = 0; x < bookDes.length; x++) {
        var bDes = bookDes[x];

        // console.log(x)
        if (roomDesVal == bDes.value) {
            var bDesY = bDes.getAttribute('y');
            if(bDesY == tYear.getFullYear()){

                a++;
                // console.log(bDes)
            }

        }


    }

    aArr[i] = a;
    roomDes[i] = val.value

    if (o < i) {
        a = 0;
        o + 1;
    }
})
// console.log(aArr)
// $.each(roomDescription, function (i, val) {
//     roomDesVal = this.value;
//     roomDes.push(roomDesVal);
// })
// var [Cz1, Cz2, Cz3, Cz5, Cz6, Cz7, , Cz10] = roomDes;
// $.each(bookDes, function (i, val) {
//     var bookDesVal = this.value;
//     if (bookDesVal === Cz1) {
//         rN1++;
//     } else if (bookDesVal === Cz2) {
//         rN2++;

//     } else if (bookDesVal === Cz3) {
//         rN3++;

//     } else if (bookDesVal === Cz4) {
//         rN4++;

//     } else if (bookDesVal === Cz5) {
//         rN5++;

//     } else if (bookDesVal === Cz6) {
//         rN6++;
//     }
// })

var rsCountOther = aArr;
$.each(rsRoomOther, function (i, val) {
    this.innerHTML = rsCountOther[i];
    // console.log(rsCountOther[i]);
})

// BOOKING FROM Chart
var bfFormat = $('.bfFormat');
var bfFormatArr = [];
var bfRes = $('.bfResult');
var bfRoomCate = $('.bfRoomCate');
var bfRCate = [];

var res1 = 0,
    res2 = 0,
    res3 = 0;

var rClient = 0,
    rStaff = 0,
    mClient = 0,
    mStaff = 0,
    sClient = 0,
    sStaff = 0;
// console.log(rCate);
$.each(bfRoomCate, function (i, val) {
    var bfRoomCateVal = this.value
    bfRCate.push(bfRoomCateVal);
})
// console.log(bfRCate);
$.each(bfFormat, function (i, val) {
    var bfFormatVal = this.value
    bfFormatArr.push(bfFormatVal);
})
$.each(bfRes, function (i, val) {
    // var bfResVal = this.value
    $(this).addClass(bfRCate[i]);
    $(this).toggleClass('bfResult');
    var bfClass = this.className;

    if (bfClass == rCate[0]) {
        res1++;
        var tsVal = $(this).val();
        if (tsVal == bfFormatArr[0]) {
            rClient++;
        } else if (tsVal == bfFormatArr[1]) {
            rStaff++;
        }

        // console.log(tsVal);
    } else if (bfClass == rCate[1]) {
        res2++;
        var tsVal = $(this).val();
        if (tsVal == bfFormatArr[0]) {
            mClient++;
        } else if (tsVal == bfFormatArr[1]) {
            mStaff++;
        }

    } else if (bfClass == rCate[2]) {
        res3++;
        var tsVal = $(this).val();
        if (tsVal == bfFormatArr[0]) {
            sClient++;
        } else if (tsVal == bfFormatArr[1]) {
            sStaff++;
        }

    }
    // $(this).toggleClass('bfResult');
    // if (bfResVal == bfFormatArr[0]) {
    //     res1++;
    // } else if (bfResVal == bfFormatArr[1]) {
    //     res2++;
    // }

})


// Calculate Month & Year
var yChkin = $('.chkin');
var dateNow = new Date();
var useYear;
var month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
var monthInThisYear = [];
var monthInOldYear = [];
var monthVal = [];
var cx = [];
var minMonth;
// t = this Year, f != this Year;
var t = 0, f = 0;
var calR = [[], [], []];
var calO = [[], [], []];
// var calR = [{ [a]: [] }, { [b]: [] }, { [c]: [] }];
$(yChkin).each(function (key, val) {
    var calYear = $(this).hasClass(dateNow.getFullYear());
    var clsStr = this.className;
    var valInt = parseInt(val.value)
    var splitStr = clsStr.split(' ')

    // if ($(this).hasClass(c)) {
    //     semi++;
    //     // calR[c] = {[c]:[val.value]}
    //     calR[2][c].push($(this).val())
    //     console.log('Hello World')
    // } else if ($(this).hasClass(b)) {
    //     meet++;
    //     calR[1][b].push($(this).val())
    //     console.log($(this).val())
    //     console.log('Hello World, Hello SKETX')
    // } else {
    //     calR[0][a].push($(this).val())
    //     rmx++;
    // }

    if (calYear === true) {
        t++;

        monthInThisYear.push(valInt);
        if ($(this).hasClass(c)) {
            // calR[c] = {[c]:[val.value]}
            calR[2].push(parseInt($(this).val()))
            // console.log('Hello World')
        } else if ($(this).hasClass(b)) {
            calR[1].push(parseInt($(this).val()))
            // console.log($(this).val())
            // console.log('Hello World, Hello SKETX')
        } else {
            calR[0].push(parseInt($(this).val()))
        }
        // if ($(this).hasClass(c)) {
        //     semi++;
        //     // calR[c] = {[c]:[val.value]}
        //     calR[2][c].push($(this).val())
        //     console.log('Hello World')
        // } else if ($(this).hasClass(b)) {
        //     meet++;
        //     calR[1][b].push($(this).val())
        //     console.log($(this).val())
        //     console.log('Hello World, Hello SKETX')
        // } else {
        //     calR[0][a].push($(this).val())
        //     rmx++;
        // }

    } else {
        f++;
        monthInOldYear.push(val.value);
        if ($(this).hasClass(c)) {
            // calR[c] = {[c]:[val.value]}
            calO[2].push(parseInt($(this).val()))
            // console.log('Hello World')
        } else if ($(this).hasClass(b)) {
            calO[1].push(parseInt($(this).val()))
            // console.log($(this).val())
            // console.log('Hello World, Hello SKETX')
        } else {
            calO[0].push(parseInt($(this).val()))
        }
    }


})
// console.log(calR)
// console.log(calO)
// console.log(monthInOldYear)

// for (var l = 0; l < month.length; l++) {
//     monthInThisYear.forEach((value, index) => {
//         if (value == l) {
//             r[l - 1] = value;
//         }
//     })
// }

// console.log(r);

// var n1 = 0;
// // เหมือนว่าจะได้แล้ว ลองกลับมาตรวจสอบด้วย
// r.every((val, ind) => {

//     monthInThisYear.forEach((value, index) => {
//         if (val == value) {
//             n1 += value;
//         }
//         // console.log('value | ' + val)
//         // console.log('value | ' + value)
//     })

//     console.log(n1)
//     r[ind] = n1
//     if (n1 != 0) {
//         n1 = 0;
//     }
//     if (val < 12) {
//         return true
//     }

// })
// console.log(r)



if (t < f) {
    useYear = dateNow.getFullYear() - 1;
    monthInOldYear.forEach((val, index) => {

    })
    // monthVal = monthInOldYear;
    // Cal Max Month
    for (i = 0; i < month.length; i++) {
        a = monthInOldYear;
        // console.log(a[i]);
        if (i === 0) minMonth = monthInOldYear[i];
        if (minMonth < a[i]) minMonth = monthInOldYear[i];

    }
    // console.log(minMonth);
} else {

    useYear = dateNow.getFullYear();


    monthVal = monthInThisYear;

    var r = [];
    var kc = [];
    var roms = [],
        meets = [],
        semis = [];

    if (calR) {

        calR.forEach((value, index, arr) => {
            if (index == 0) {
                for (var i = 0; i < month.length; i++) {
                    // console.log(arr[index]) // [4, 3]
                    // console.log(i);
                    // console.log(value)
                    for (var x = 0; x < arr[index].length; x++) {
                        if (i == arr[index][x]) {
                            roms[i - 1] = value[x]
                            // console.log(value[x])
                        }
                    }
                }
                return true
            }

            if (index == 1) {
                for (var i = 0; i < month.length; i++) {
                    // console.log(arr[index]) // [4, 3]
                    // console.log(i);
                    // console.log(value)
                    for (var x = 0; x < arr[index].length; x++) {
                        if (i == arr[index][x]) {
                            meets[i - 1] = value[x]
                            // console.log(value[x])
                        }
                    }
                }
                return true
            }

            if (index == 2) {
                for (var i = 0; i < month.length; i++) {
                    // console.log(arr[index]) // [4, 3]
                    // console.log(i);
                    // console.log(value)
                    for (var x = 0; x < arr[index].length; x++) {
                        if (i == arr[index][x]) {
                            semis[i - 1] = value[x]
                            // console.log(value[x])
                        }
                    }
                }
                return false
            }



        

        })
     
    }
    // console.log(roms); // (4) [empty*2, 3, 4]
    // console.log(meets); // (3) [1, empty, 3]
    // console.log(semis); // (4) [1]
    var defNumb = 0;
    var numCountx = 0;
    var rsCount = []

    calR.every((val, ind, arr) => {
        if (ind == 0) {
            roms.forEach((value, index) => {
                for (var i = 0; i < arr[ind].length; i++) {
                    if (val[i] == value) {
                        defNumb++
                        numCountx++;

                    }
                }
                roms[index] = defNumb;
                if (defNumb != 0) {
                    defNumb = 0;
                }
            })
            rsCount[ind] = numCountx;
            if (numCountx != 0) {
                numCountx = 0;
            }
            return true
        }
        if (ind == 1) {
            meets.forEach((value, index) => {
                for (var i = 0; i < arr[ind].length; i++) {
                    if (val[i] == value) {
                        defNumb++
                        numCountx++;


                    }
                }
                meets[index] = defNumb;
                if (defNumb != 0) {
                    defNumb = 0;

                }
            })
            rsCount[ind] = numCountx;

            if (numCountx != 0) {
                numCountx = 0;
            }
            return true;
        }
        if (ind == 2) {
            semis.forEach((value, index) => {
                for (var i = 0; i < arr[ind].length; i++) {
                    if (val[i] == value) {
                        defNumb++;
                        numCountx++;
                    }
                }
                semis[index] = defNumb;
                if (defNumb != 0) {
                    defNumb = 0;
                }
            })
            rsCount[ind] = numCountx;

            if (numCountx != 0) {
                numCountx = 0;
            }
            return false;

        }
    })
    // console.log(roms) // Rooms Result 
    // console.log(meets) // Meeting Rooms Result
    // console.log(semis) // Seminar Rooms Result
    $.each(rsRoom, function (i, val) {
        if (rsCount[i] == undefined) rsCount[i] = 0;
        val.innerHTML = rsCount[i];
    })

    // Cal Min Month
    for (i = 0; i < month.length; i++) {
        a = monthInThisYear;
        // หาค่าตัวแรกในอาเรย์
        if (i === 0) minMonth = monthInThisYear[i];

        // นำค่าตัวแรกในอาเรย์มาตรวจสอบว่ามากกว่าตัวถัดไปหรือไม่ ถ้าไม่ตัวแรกก็ค่ามากสุด
        if (minMonth > a[i]) minMonth = monthInThisYear[i];


        // console.log(minMonth)
    }


    // หาจำนวนทั้งหมด
    // for (var l = 0; l < month.length; l++) {
    //     monthInThisYear.forEach((value, index) => {
    //         if (value == l) {
    //             r[l - 1] = value;
    //         }
    //     })
    // }

    // console.log(r);

    // var n1 = 0;
    // // เหมือนว่าจะได้แล้ว ลองกลับมาตรวจสอบด้วย
    // r.every((val, ind) => {

    //     monthInThisYear.forEach((value, index) => {
    //         if (val == value) {
    //             n1++;
    //         }
    //         // console.log('value | ' + val)
    //         // console.log('value | ' + value)
    //     })

    //     r[ind] = n1
    //     if (n1 != 0) {
    //         n1 = 0;
    //     }
    //     if (val < 12) {
    //         return true
    //     }

    // })
    // console.log(r)
}
// var monthStart = month[minMonth - 1];
// console.log(monthStart)
// console.log(month)


// ตัดเดือน
// if (month !== undefined) {
//     for (i = 0; i < month.length; i++) {
//         if (monthStart === month[i]) {
//             // console.log(i)
//             month = month.slice(i)
//         }
//     }
// }




// Chart
var myChart = $('#myChart1');
var myChartR = $('#myChartR');
var bfChart = $('#bfChart');
var bfClientChart = $('#bfClientChart');
var bfStaffChart = $('#bfStaffChart');
if (myChart.length == 1) {
    // Main Chart
    var ctx = document.getElementById('myChart1');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: month,
            datasets: [{
                label: rCate[0],
                data: roms,
                // data: [r, m, s] <= คือจำนวนการจองในแต่ละห้องพัก
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                fill: false
            }, {
                label: rCate[1],
                data: meets,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                fill: false
            }, {
                label: rCate[2],
                data: semis,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 0.2)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    });
    console.log(myChart)
    // var ctx = document.getElementById('myChart1').getContext('2d');
    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: rCate,
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [r, m, s],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });
    // console.log(myChart)

} else if (myChartR.length == 1) {

    // Chart Rooms
    var ctxN1 = document.getElementById('myChartR');
    var myChart = new Chart(ctxN1, {
        type: 'bar',
        data: {
            labels: roomDes,
            datasets: [{
                label: roomDes,
                data: aArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

} else if (bfChart.length == 1) {
    // Chart BOOKING FROM !
    var ctxBf = document.getElementById('bfChart');
    var myChart = new Chart(ctxBf, {
        type: 'bar',
        data: {
            labels: rCate,
            datasets: [{
                label: 'By Client',
                data: [rClient, mClient, sClient],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)'

                ],
                borderWidth: 1
            }, {
                label: 'By Staff',
                data: [rStaff, mStaff, sStaff],
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
} else if (bfClientChart.length == 1) {
    // Chart BOOKING FROM !
    var ctxBf = document.getElementById('bfClientChart');
    var myChart = new Chart(ctxBf, {
        type: 'bar',
        data: {
            labels: rCate,
            datasets: [{
                label: '# of Votes',
                data: [rClient, mClient, sClient],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
} else if (bfStaffChart.length == 1) {
    // Chart BOOKING FROM !
    var ctxBf = document.getElementById('bfStaffChart');
    var myChart = new Chart(ctxBf, {
        type: 'bar',
        data: {
            labels: rCate,
            datasets: [{
                label: '# of Votes',
                data: [rStaff, mStaff, sStaff],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}




// var [a1, b1, c1] = rCate;

// function autoVariable(arr){

// }

// var tsarr = [];
// for (var i = 0; i < all.length; i++) {
//     // var dateCreate = '.dateCreate' + i
//     // var count = 'i'
//     var ts = '.dateCreate' + i;
//     var nDate = new Date($(ts).val());
//     tsarr.push(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(nDate));
//     $(monthYear).val(nDate);

// }