$(document).ready( function () {
    function checkTime(i){
        return (i < 10) ? "0" + i : i;
    }

    function startTime(){
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
            
            $('#time').html(h + ':' + m + ':' + s);
            t = setTimeout(function() {
                startTime();
            }, 500);
    }
    startTime();
})