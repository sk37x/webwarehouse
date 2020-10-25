// $('#dateStart').datepicker({
//     dayNames: [ "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์" ],
//     dayNamesMin: [ "อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส." ],
//     minDate: new Date(Date.now()),
//     monthNames: [ 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม' ],
//     monthNamesMin: [ 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.' ],
//   });
(function(){
  let setDate = ($('#dateStart').data('date') ? new Date($('#dateStart').data('date')) : new Date());
  $("#dateStart").datepicker({
    format: "dd/mm/yyyy",
    todayBtn: false,
    language: "th",
    thaiyear: true,
    autoclose: true,
    maxViewMode: 2,
  }).datepicker("setDate", setDate)
  .on('hide', function(e) {
    // `e` here contains the extra attributes
    let dateSelected = prepareDate(e.format());
    $('input[name="dateStarted"]').val(dateSelected);
    $("#dateStart").val(compareDate2TextTH(dateSelected))
    // form.order_date.value = dateSelected;
  });
  

  
  let date = new Date();
  
  
  $('input[name="dateStarted"]').val().length === 0 ? $('input[name="dateStarted"]').val(date) : '';
  // console.log($('input[name="dateStarted"]').val());
  if($("#dateStart").data('date')) {
    $("#dateStart").val(compareDate2TextTH(new Date($("#dateStart").data('date'))));
  } else {
    $("#dateStart").val(compareDate2TextTH(new Date()));
  }
  
})()

