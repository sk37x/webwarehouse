$('#maxRows').on('change', function() {
    $('.pagination').html('');
    // console.log(this.value);
    var trnum = 0;
    var maxRows = parseInt($(this).val());
    var totalRows = $('#mytable tbody tr').length;
    console.log(maxRows);
    console.log(totalRows);
    $(table + ' tr:gt(0)').each(function() {
        trnum++;
        if(trnum > maxRows) {
            $(this).hide();
        } 
        if(trnum <= maxRows) {
            $(this).show();
        }
    })
    if(totalRows > maxRows){
        var pagenum = Math.ceil(totalRows/maxRows);
        // console.log(pagenum);
        for(var i=1; i<=pagenum;i++){
            $('.pagination').append('<li class="page-item" data-page='+ i +'><a class="page-link">'+ i +'</a></li>').show();
        }
    }
    $('.pagination li:first-child').addClass('active');
    $('.pagination li').on('click', function() {
        var pageNum = $(this).attr('data-page');
        var trIndex = 0;
        $('.pagination li').removeClass('active');
        // $(this).addClass('active')
        $('#mytable tr:gt(0)').each(function(){
            trIndex++;
            if(trIndex > (maxRows*pageNum) || trIndex <=((maxRows*pageNum)-maxRows)){
                $(this).hide();
            } else { 
                $(this).show();
            }

        })
    })
})

$(function(){
    $('table tr:eq(0)').prepend('<th>ID</th>');
    var id = 0;
    $('table tr:gt(0)').each(function() {
        id++;
        $(this).prepend('<td>'+id+'</td>');
    })

})