$(document).ready(function ($) {
    $('body').append('<div class="overlay-sidebar trans-2"></div>');
    var btnSidebar = $('.btn-show-sidebar');
    var btnHideSidebar = $('.btn-hide-sidebar');
    var ovlSidebar = $('.overlay-sidebar');

    var sidebar = $('.sidebar');
    // del field
    $(btnSidebar).each(function (i) {
        $(this).on('click', () => {
            $(sidebar).eq(i).addClass('show-sidebar')
            $(ovlSidebar).addClass('show-overlay-sidebar');
        })
    })
    // $(btns).on('click', () => {
    //     $(sidebar).addClass("show-sidebar");
    //     $(ovlSidebar).addClass('show-overlay-sidebar');
    // });

    $(btnHideSidebar).on('click', () => {
        $(sidebar).removeClass('show-sidebar');
        $(ovlSidebar).removeClass('show-overlay-sidebar');
    })


    $(ovlSidebar).on('click', () => {
        $(sidebar).removeClass('show-sidebar');
        $(ovlSidebar).removeClass('show-overlay-sidebar');
    })


    // cal value
    var radiox = $('.chk');
    var totalprice = $('#totalprice');
    var dateStart = new Date($('#datestart').val());
    var dateEnd = new Date($('#dateend').val());
    var timediff = Math.abs(dateEnd.getTime() - dateStart.getTime());
    var totaltime = Math.ceil((timediff / (1000 * 60 * 60 * 24)) + 1);

    $('#totaltimex').val(totaltime);
    // console.log(dateStart);
    // console.log(dateEnd);
    // console.log(totaltime);

    $(radiox).each(function (i) {
        // console.log(this);
        $(this).on('click', () => {
            var chkx = $(this).val();
            // console.log(chkx);
            $(totalprice).val(chkx * totaltime);
        })
    })


    // Hide userBlockContent
    var blockUser = $('.blockx-userx');
    var showAndHideBlockx = $('#show-hide-blockx');

    $(showAndHideBlockx).on('click', function () {
        $(this).toggleClass('show-blockx');
        var checkbox = $(this).hasClass('show-blockx');
        console.log(checkbox);
        if (checkbox == true) {
            $(blockUser).show('blind', 500)
        } else {
            $(blockUser).hide('blind', 500)

        }
    })





    // index Admin
    var dateF = $('#datecin'),
        dateE = $('#datecout'),
        resultTime = $('#ntotaltimex'),
        resultPrice = $('#ntotalpricex'),
        pricex = $('.chk');

    $(dateF).prop('disabled', true);
    $(dateE).prop('disabled', true);
    $(pricex).each(function (i) {
        $(this).on('click', () => {
            var totalpricex = $(this).val();
            $(dateF).prop('disabled', false);
            $(resultPrice).val(totalpricex);
            $(dateF).on('change', () => {
                $(dateE).prop('disabled', false);
                $(dateE).val('');
                $(dateE).on('change', () => {
                    var f1datev = $(dateF).val(),
                        e1datev = $(dateE).val(),
                        datefst = new Date(f1datev), // new Date in #datecin
                        dateexd = new Date(e1datev), // new Date in #datecout
                        ntimediff = Math.abs(datefst - dateexd),
                        ntotaltime = Math.ceil(ntimediff / (1000 * 60 * 60 * 24) + 1);

                    result = totalpricex * ntotaltime;
                    $(resultPrice).val(result);
                    $(resultTime).val(ntotaltime);
                    console.log(result);
                    console.log(ntotaltime);
                })
            })


        })
    })

    // Radio button in Index
    var raditother = $('.chkx'),
        chkval = $('.chk_t1'),
        log = $('#logchk'),
        timesec = $('#timesec').val(),
        logprice = $('#totalprice');


    // console.log(raditother);
    // console.log(logprice);
    // $(log).text('1');

    $(raditother).each(function () {
        // console.log(this);
        $(this).on('click', () => {
            $('#secprice').removeClass('invisible');
            $(dateF).prop('disabled', false);
            var logx = $(this).val();
            // console.log(logx);
            $(logprice).val(logx);
            $(chkval).on('click', () => {
                var checkSelect = $('input[type="checkbox"]:checked').length;
                $(log).val(checkSelect);
                console.log(checkSelect);
                var logpricetotal = logx * checkSelect;
                $(logprice).val(logpricetotal);

            })

            // console.log(logprice);
        })
    })

    $(chkval).each(function (i) {
        i += 1;
        console.log(i);
        console.log($(this).val() + ' - ' + timesec);
        var x = $(this).val();
        console.log(x);
        var tbonc1 = $('#tboncb1').text();
        var tbonc2 = $('#tboncb2').text();
        var tbonc3 = $('#tboncb3').text();

        if (tbonc1 === timesec) {
            $('#cb1').attr('checked', 'checked');
            $('#cb1').toggleClass('invisible')
            $('#tboncb1').toggleClass('invisible');
            // $(this).prop('readonly', true);
        } else if (tbonc2 === timesec) {
            $('#cb2').attr('checked', 'checked');
            $('#cb2').toggleClass('invisible')
            $('#tboncb2').toggleClass('invisible');
        } else if (tbonc3 === timesec) {
            $('#cb3').attr('checked', 'checked');
            $('#cb3').toggleClass('invisible')
            $('#tboncb3').toggleClass('invisible');
        }
    })





    // ad-reportx //////////////////////////////////////

    // คำนวณเงิน
    var totalx = $('input.totalprice');
    var totalxz = $('span.totalpricez');
    
    var sumprice = $('span.sumprice');
    var totalxsum = 0;
    var stotalxsum
    $(totalx).each(function (i, val) {
        totalxsum += Number($(this).val());
        stotalxsum = totalxsum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        var nText = parseInt($(this).val()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        
        $(sumprice).text(stotalxsum + ' บาท');
        $(totalxz[i]).text(moneyFormat(parseInt($(this).val())))
        // console.log(moneyFormat(parseInt($(this).val())))
        
    });
    var strTotalxsum = String(totalxsum)
    console.log(strTotalxsum);
    console.log(totalxsum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    console.log(strTotalxsum.replace(/(?=\d{3})*,(?=\d{3})/g, ''))


    // เลือกเดือน, ปี, ประเภท
    var repsMonthIn = $('span.spngetmonthin');
    var repsYearIn = $('span.spngetyearin');
    var repsCategory = $('span.spnCategory');
    var selectCateReps = $('#selectCateReps');
    var curtr = $('tbody.reportPrice').children('tr')
    var newlogPrice = $('tbody.reportPrice').children('tr.repsresult')
    var monthSel = $('#selectM');
    var yearSel = $('#selectY');

    $(monthSel).prop('disabled', true);
    $(yearSel).prop('disabled', true);
    // Select Category
    $(selectCateReps).on('change', function () {
        totalxsum = 0;
        $(yearSel).prop('disabled', false);
        $(monthSel).prop('disabled', true);
        var cal1x = 0;
        var cal2x = 0;
        $(monthSel).val('');
        $(yearSel).val('');
        var repsCateVal = $(this).val();

        $(curtr).each(function (i, val) {

            var curclass = this.className;
            if (repsCateVal === curclass) {
                $(this).addClass('cal');
                $(this).prop('hidden', false);
                var cal2 = Number($(this).children('td').children('input.totalprice').val());
                console.log(cal2);
                // monthinn = $(this).children('td').children('p').children('span.spngetmonthin'),
                // monthVal = $(monthinn).text();
                totalxsum += cal2;
                console.log(totalxsum);
                $(sumprice).text(moneyFormat(totalxsum) + "บาท");
            } else if (repsCateVal === 'showall') {
                $(yearSel).prop('disabled', true);


                var hasCal = $(this).hasClass('cal');
                if (hasCal === true) {
                    $(this).removeClass('cal');
                    $(this).removeClass('monthSelected');
                    $(this).removeClass('yearSelected');
                    var cal2xx = Number($(this).children('td').children('input.totalprice').val());
                    cal1x += cal2xx;
                } else {
                    $(this).prop('hidden', false);
                    var cal2a = Number($(this).children('td').children('input.totalprice').val());
                    cal2x += cal2a;
                }
                var resultCalShowAllCate = cal1x + cal2x;
                totalxsum = resultCalShowAllCate;
                $(sumprice).text(totalxsum + ' บาท');


            } else {
                var yearOldSelected = $(this).hasClass('yearSelected');
                var monthOldSelected = $(this).hasClass('monthSelected');
                if (yearOldSelected) $(this).removeClass('yearSelected')
                if (monthOldSelected) $(this).removeClass('monthSelected')

                $(this).removeClass('cal');
                $(this).prop('hidden', true);
                $(newlogPrice).prop('hidden', false);
                $(sumprice).text(moneyFormat(totalxsum) + ' บาท');
            }
            return this;
        })


        $(yearSel).on('change', function () {
            var yearSelVal = $(this).val();
            var curSelected = $('.cal');
            $(monthSel).prop('disabled', false);
            $(monthSel).val('');
            totalxsum = 0;
            $(curSelected).each(function (i, val) {
                var curYear = $(this).children('td').children('p').children('.spngetyearin');
                var curYearTxt = $(curYear).text();
                // console.log(curYear)
                // console.log(curYearTxt)
                if (yearSelVal === curYearTxt) {
                    $(this).addClass('yearSelected');
                    $(this).prop('hidden', false);
                    var cal3 = Number($(this).children('td').children('input.totalprice').val());
                    totalxsum += cal3;
                    $(sumprice).text(moneyFormat(totalxsum) + ' บาท');
                } else {
                    $(this).removeClass('yearSelected');
                    $(this).prop('hidden', true);
                    $(sumprice).text(moneyFormat(totalxsum) + ' บาท');
                }

            })


            $(monthSel).on('change', function () {
                var monthSelVal = $(this).val();
                var curtrcal = $('.yearSelected');
                console.log(monthSelVal);
                totalxsum = 0;
                $(curtrcal).each(function (i, val) {
                    var curMonth = $(this).children('td').children('p').children('.spngetmonthin');
                    var curMonthTxt = $(curMonth).text();

                    if (monthSelVal === curMonthTxt) {
                        $(this).addClass('monthSelected');
                        $(this).prop('hidden', false);
                        var cal4 = Number($(this).children('td').children('input.totalprice').val());

                        totalxsum += cal4;
                        $(sumprice).text(moneyFormat(totalxsum) + ' บาท');
                        return this;
                    } else {
                        $(this).removeClass('monthSelected');
                        $(this).prop('hidden', true);
                        $(sumprice).text(moneyFormat(totalxsum) + ' บาท');
                    }

                })
            })




        })
    })

    // Select Month
    // $(monthSel).on('change', function (i, val) {
    //     var selectMonthVal = this.value;
    //     var selectCateVal = $(selectCateReps).val();

    //     console.log(selectCateVal);
    //     totalxsum = 0;
    //     $(curtr).each(function () {
    //         var curMonth = $(this).children('td').children('p').children('span.spngetmonthin');
    //         var curMonthVal = $(curMonth).text();


    //         if (selectCateVal === '') {
    //             var curCal = $(this).hasClass('cal');
    //             if (selectMonthVal === curMonthVal) {
    //                 $(this).prop('hidden', false);
    //             } else if (curCal === false) {
    //                 $(this).prop('hidden', true);
    //             }  // !!!! แก้ต่อตรงนี้
    //         } else {
    //             var curCal = $(this).hasClass('cal');
    //             console.log(curCal)
    //             if (selectMonthVal === curMonthVal) {
    //                 $(this).prop('hidden', false);
    //                 $(newlogPrice).prop('hidden', false);
    //                 var cal2 = Number($(this).children('td').children('span.totalprice').text());
    //                 totalxsum += cal2;

    //             } else {
    //                 $(this).toggleClass('cal');
    //                 $(this).prop('hidden', true);
    //                 $(newlogPrice).prop('hidden', false);
    //                 $(sumprice).text(totalxsum + ' บาท');
    //             }
    //         }


    //         // if (selectCateVal === null) {
    //         //     alert('heyHo');
    //         // } else {

    //         // }


    //     })
    // })



    // selectCategory in utility
    var selx = $('#selectCate');
    var tdval = $('.catex');
    var currow = $('.table tbody').children('tr');


    // $(currow).prop('hidden', true);
    var trRowsTs;
    // var trNumOther;
    $(selx).on('change', () => {
        var selxval = $(selx).val();
        var trNum = 0;
        var trRows = [];

        $('.selectpicker').selectpicker('val', '5000');
        // $('.selectpicker').val(5000);
        // $('table tr:eq(0)').prepend('<th>ID</th>');
        $(currow).each(function (i) {
            var tsx = this.className;
            $(this).prop('hidden', false);
            if (selxval == tsx) {
                $(this).prop('hidden', false);
                trNum++;
                trRows.push(trNum);
                // $('.selectpicker').selectpicker('render');
            } else if (selxval == 'shall') {
                $(this).prop('hidden', false);

            } else {
                $(this).prop('hidden', true);

            }
        })
        console.log(trRows);
        if (trRows.length == 0) {
            showNum(0, 0, 0);
        } else {
            showNum(trRows[0], trRows[trRows.length - 1], trRows.length);
        }
        trRowsTs = trRows.length;



    })




    // ad-user(USER MANAGE PAGE)
    // Build For Pagination
    var ts1 = $('.test1');
    var testPa = [];

    $.each(ts1, function (k, val) {
        var txt = this.innerText;
        console.log(txt);
        testPa.push(txt);
    })
    console.log(testPa);

    // $('#pagination-container').pagination({
    //     dataSource: testPa,
    //     callback: function(data, pagination) {
    //         // template method of yourself
    //         var htmlx = template(data);
    //         $('#data-container').html(htmlx);
    //     }
    // })



    // Pagination #maxRows #mytable .pagination;

    $('#maxRows').on('change', function () {
        // console.log(trRowsTs);


        $('.pagination').html('');
        // console.log(this.value);
        var trnum = 0;

        var maxRows = parseInt($(this).val());
        var totalRows = $('#mytable tbody tr').length;
        var showin = [];
        showNum(1, maxRows, totalRows);
        if (trRowsTs == undefined) {
            $('#mytable tr:gt(0)').each(function () {
                trnum++;

                if (trnum > maxRows) {
                    $(this).hide();
                }
                if (trnum <= maxRows) {
                    $(this).show();
                    showin.push(trnum);
                }
            })

            showNum(showin[0], showin.length, totalRows);

            if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows);
                for (var i = 1; i <= pagenum; i++) {
                    $('.pagination').append('<li class="page-item" data-page=' + i + '><a class="page-link">' + i + '</a></li>').show();
                }
            }
        } else {
            var trNumx = 0;
            var selxval = $('#selectCate').val();
            var showin2 = [];
            $(currow).each(function (i) {
                var tsx = this.className;

                if (selxval == tsx) {
                    trNumx++;

                    if (trNumx > maxRows) {
                        $(this).hide();
                    }
                    if (trNumx <= maxRows) {
                        $(this).show();
                        showin2.push(trNumx);
                    }
                } else if (selxval == 'shall') {
                    $(this).prop('hidden', false);
                } else {
                    $(this).prop('hidden', true);
                }
            })
            console.log(showin2);
            if (showin2.length == 0) {
                showNum(0, 0, 0);

            } else {

                showNum(showin2[0], showin2[showin2.length - 1], trRowsTs);
            }
            if (trNumx > maxRows) {
                var pagenumOther = Math.ceil(trNumx / maxRows);
                console.log(pagenumOther);
                for (var i = 1; i <= pagenumOther; i++) {
                    $('.pagination').append('<li class="page-item" data-page=' + i + '><a class="page-link">' + i + '</a></li>').show();
                }
            }
        }
        $('.pagination li:first-child').addClass('active');
        $('.pagination li').on('click', function () {
            var pageNum = $(this).attr('data-page');
            var trIndex = 0;
            var trIndexShow = [];
            $('.pagination li').removeClass('active');
            // $(this).addClass('active')
            $('#mytable tr:gt(0)').each(function () {
                trIndex++;

                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $(this).hide();
                } else {
                    $(this).show();
                    trIndexShow.push(trIndex);
                }

            })
            if (trRowsTs == undefined) {
                // console.log(trIndexShow[trIndexShow.length - 1]);
                showNum(trIndexShow[0], trIndexShow[trIndexShow.length - 1], totalRows);
            } else {
                showNum(showin2[0], showin2[showin2.length - 1], trRowsTs);

            }
        })
    })


    // check name before add Room
    var s1 = $('.size1');
    var s2 = $('.size2');
    var p1 = $('.priceAdd1');
    var p2 = $('.priceAdd2');
    var addroomx = $('#addroomx');

    $(addroomx).submit((e) => {
        var s1val = $(s1).val();
        var s2val = $(s2).val();
        var p1val = $(p1).val();
        var p2val = $(p2).val();
        if (s1val > s2val) {
            alert('รูปแบบ "ความจุของห้อง" ไม่ถูกต้อง')
            e.preventDefault();
        } else if (p1val < p2val) {
            alert(`รูปแบบไม่ถูกต้อง \n
            "ราคาปกติ" ต้องมากกว่า "ราคาพิเศษ"`)
            e.preventDefault();
        } else {

            alert('เพิ่มข้อมูลสำเร็จ')
        }
    })

    // ALL SCRIPT IN MANAGE USERSX

    // RoomCate
    // add room_category
    var rcate = $('.roomcates');
    var rcateAdd = $('.acate');
    var formrcate = $('#addroomcate');
    var btnarcate = $('.btn-arcate');
    var rcateArr = [];
    var editcate = $('#editcate');
    var editCateData = $('.editcatedata');
    var allcate = $('.allcateedit');
    $(formrcate).submit((e) => {
        $.each(rcate, (key, val) => {
            rcateArr.push(val.value);
        })
        var rcateAddValx = $(rcateAdd).val();
        var tmp = '';
        for (var i = 0; i < rcateArr.length; i++) {
            if (rcateAddValx == rcateArr[i]) {
                alert('ไม่สามารถเพิ่ม "ชื่อ" ประเภทห้องซ้ำกันได้ !!');
                console.log(rcateArr[i]);
                tmp = rcateArr[i];
                e.preventDefault();
                break;
            }

        }
        console.log(tmp)
        if (tmp == '') {
            alert('เพิ่มห้องพักสำเร็จ')
        }
    })
    $(editcate).submit((e) => {
        $.each(allcate, (key, val) => {
            rcateArr.push(val.value);
        })
        var rcateEditVal = $(editCateData).val();
        var tmp = '';
        for (var i = 0; i < rcateArr.length; i++) {
            if (rcateEditVal == rcateArr[i]) {
                alert('ไม่สามารถเปลี่ยน "ชื่อ" ประเภทห้องซ้ำกันได้ !!');
                console.log(rcateArr[i]);
                tmp = rcateArr[i];
                e.preventDefault();
                break;
            }

        }
        console.log(tmp)
        if (tmp == '') {
            alert('แก้ไขห้องพักสำเร็จ')
        }

    })

    // Public-Utility
    var nameUtil = $('.nameUtil');
    var iconUtil = $('.iconUtil');
    var showx = $('#showx');
    var spnHideText = $('.hideText');
    $(nameUtil).keyup(function () {
        var spnHideTextVal = $(spnHideText).text();
        var nameVal = $(this).val()
        $(spnHideText).text(nameVal);
        console.log(spnHideTextVal)
    })
    $(iconUtil).keyup(function() {
        var showxClass = $(showx).attr('class')
        var iconVal = $(this).val();
        $(showx).attr('class', iconVal)
        console.log(iconVal)
    })
    if (spnHideText.length > 0) {
        $(showx).hover(function () {
            $(spnHideText).show('bounce', 300);
        })
        $(showx).mouseout(function () {

            $(spnHideText).hide('fade', 200);
        })
    }



})








function moneyFormat(num){
    var nFormat = num.toFixed(2).replace(/\d(?=(\d{3})\.)/g, '$&,')
    return nFormat
}

function showNum(first, last, total) {
    var firstSh = $('#firstNumShow');
    var lastSh = $('#lastNumShow');
    var totalSh = $('#totalShow');

    $(firstSh).text(first);
    $(lastSh).text(last);
    $(totalSh).text(total);
    return 0;
}


$(function () {
    var totalRows = $('#mytable tbody tr').length;
    var showID = [];
    $('table tr:eq(0)').prepend('<th>ID</th>');
    var id = 0;
    $('table tr:gt(0)').each(function (key, val) {
        showID.push(key);
        if (this.className !== 'repsresult table-success') {
            id++;
            $(this).prepend('<td>' + id + '</td>');
        }


    })

    var showIDFirst = showID.slice(1, 2);


    showNum(showIDFirst, totalRows, totalRows);


})

$(function () {
    $('.phonex').text(function (i, text) {
        return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    });
    // jQuery UI Datepicker & imputmask
    $('#datecin').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, maxDate: "+1Y +10D" });
    $('#datecout').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, maxDate: "+1Y +10D" });
    $('#datecin').inputmask({ 'mask': '9999-99-99' });
    $('#datecin').datepicker('option', 'showAnim', 'fadeIn');
    $('#datecout').inputmask({ 'mask': '9999-99-99' });
    $('#datecout').datepicker('option', 'showAnim', 'fadeIn');
    $('#phonemask').inputmask({ 'mask': '999-999-9999' });
    // $('.iconUtil').inputmask({ 'mask': 'aaa aa-aa' });
    var cin = $('#datecin');
    $(cin).on('change', function () {
        var newDate = $(this).val();
        var newDatex = new Date(newDate);
        var dateNow = new Date();
        var xdifftime = Math.abs(dateNow - newDatex);
        var ntime = Math.ceil(xdifftime / (1000 * 60 * 60 * 24));

        // console.log(xdifftime)
        // console.log(ntime)
        $('#datecout').datepicker('option', 'minDate', ntime);
    })

    // if Busy all input have readonly
    var allinput = $('input.ckin');
    var inval = $('#roomstat').val();
    // console.log(allinput);
    // console.log(inval);
    if (inval === 'Busy') {
        $('#datecin').prop('disabled', true);
        $('#datecout').prop('disabled', true);
        allinput.prop('readonly', true);
        $('textarea').prop('readonly', true);
        allinput.css({ 'cursor': 'pointer' })
        $('textarea').css({ 'cursor': 'pointer' });
    } else {
        allinput.prop('readonly', false);
        $('#ntotaltimex').prop('readonly', true);
        $('#ntotalpricex').prop('readonly', true);
    }

    // console.log('hello World')
    // select Month to Search
    // เลือกเดือน(สร้างเอง)
    var selectNewDate = new Date();
    // $('#selectY').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, maxDate: "+1Y +10D" });
    var selectM = $('#selectM');
    var selectY = $('#selectY');
    var month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    var years = [];
    selectY.val(selectNewDate.getFullYear());

    for (var a = selectNewDate.getFullYear() - 10; a <= selectNewDate.getFullYear(); a += 1) {
        years.push(a);
    }

    if (selectY.prop) {
        var optionx = selectY.prop('options');
    } else {
        var optionx = selectY.attr('options');
    }
    if (optionx != undefined) {
        console.log(optionx)

        $.each(years, function (yi, yval) {
            optionx[optionx.length] = new Option(yval, yval);
        })
    }

    if (selectM.prop) {
        var options = selectM.prop('options');
    } else {
        var options = selectM.attr('options');
    };
    if (options != undefined) {
        console.log(options)
        $.each(month, function (i, val) {
            options[options.length] = new Option(val, i + 1);
        });

    }




})


$(function () {

    // var imx = $('#img-lstx ul li').children('img');

    // $(imx).click(()=>{
    //     var eximg = $('#expendedImg').attr('src');
    //     var imx = imx.attr('src')
    //     eximg = imx;
    // })



});


function openImg(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text

    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image

}

function sumcal(number) {



}




// encodeIMG USE HERE
function encodeImgFileAsURL() {
    var filesSelected = document.getElementById('inputFileToLoad').files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();
        console.log(fileToLoad)
        console.log(fileReader)
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            var newImage = document.createElement('img');
            // var resizeImage = newImage.getContext('2d');

            newImage.src = srcData;

            document.getElementById('imgTest').innerHTML = newImage.outerHTML;
            console.log('Converted Base64 version is ' + document.getElementById('imgTest').innerHTML)
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}



    // // index Admin
    // var dateF = $('#datecin'),
    //     dateE = $('#datecout'),
    //     resultTime = $('#ntotaltimex'),
    //     resultPrice = $('#ntotalpricex'),
    //     pricex = $('.chk');

    // $(dateF).prop('disabled', true);
    // $(dateE).prop('disabled', true);
    // $(pricex).each(function (i) {
    //     $(this).on('click', () => {
    //         var totalpricex = $(this).val();
    //         $(dateF).prop('disabled', false);
    //         $(resultPrice).val(totalpricex);
    //         $(dateF).on('change', () => {
    //             $(dateE).prop('disabled', false);
    //             $(dateE).val('');
    //             $(dateF, dateE).on('change', () => {
    //                 var f1datev = $(dateF).val(),
    //                     e1datev = $(dateE).val(),
    //                     datefst = new Date(f1datev), // new Date in #datecin
    //                     dateexd = new Date(e1datev), // new Date in #datecout
    //                     ntimediff = Math.abs(datefst - dateexd),
    //                     ntotaltime = Math.ceil(ntimediff / (1000 * 60 * 60 * 24) + 1);

    //                 result = totalpricex * ntotaltime;
    //                 $(resultPrice).val(result);
    //                 $(resultTime).val(ntotaltime);
    //                 console.log(result);
    //                 console.log(ntotaltime);
    //             })
    //         })


    //     })
    // })












    // // Radio button in Index
    // var raditother = $('.chkx'),
    //     chkval = $('.chk_t1'),
    //     log = $('#logchk'),
    //     timesec = $('#timesec').val(),
    //     logprice = $('#totalprice');


    // console.log(raditother);
    // // console.log(logprice);
    // $(log).text('1');

    // $(raditother).each(function () {
    //     // console.log(this);
    //     $(this).on('click', () => {
    //         $('#secprice').removeClass('invisible');
    //         var logx = $(this).val();
    //         console.log(logx);
    //         $(logprice).val(logx);
    //         $(chkval).on('click', () => {
    //             var checkSelect = $('input[type="checkbox"]:checked').length;
    //             $(log).text(checkSelect);
    //             console.log(checkSelect);
    //             var logpricetotal = logx * checkSelect;
    //             $(logprice).val(logpricetotal);

    //         })

    //         // console.log(logprice);
    //     })
    // })

    // $(chkval).each(function (i) {
    //     i += 1;
    //     console.log(i);
    //     console.log($(this).val() + ' - ' + timesec);
    //     var x = $(this).val();
    //     console.log(x);
    //     var tbonc1 = $('#tboncb1').text();
    //     var tbonc2 = $('#tboncb2').text();
    //     var tbonc3 = $('#tboncb3').text();

    //     if (tbonc1 === timesec) {
    //         $('#cb1').attr('checked', 'checked');
    //         $('#cb1').toggleClass('invisible')
    //         $('#tboncb1').toggleClass('invisible');
    //         // $(this).prop('readonly', true);
    //     } else if (tbonc2 === timesec) {
    //         $('#cb2').attr('checked', 'checked');
    //         $('#cb2').toggleClass('invisible')
    //         $('#tboncb2').toggleClass('invisible');
    //     } else if (tbonc3 === timesec) {
    //         $('#cb3').attr('checked', 'checked');
    //         $('#cb3').toggleClass('invisible')
    //         $('#tboncb3').toggleClass('invisible');
    //     }
    // })



    // $('#No').selectmenu();
    // {
    //     _renderButtonItem: function (item) {
    //         var buttonItem = $("<span>", {
    //             "class": "ui-selectmenu-text"
    //         });
    //         this._setText(buttonItem, item.value);

    //         buttonItem.css("background-color", item.label);

    //         return buttonItem;
    //     }
    // }



