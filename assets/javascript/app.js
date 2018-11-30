window.onload = function () {
    $("#start").click(timer.start);
};
var intervalId;

var clockRunning = false;

var timer = {
    time: 65,

    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }
    },
    count: function () {
        timer.time--;
        console.log(timer.time)
        var displayTime = timer.countdown(timer.time);
        $("#timer").text(displayTime);
    },
    countdown: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
    
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
    
        if (minutes === 0) {
          minutes = "0";
        }
    
        else if (minutes < 10) {
          minutes = minutes;
        }
    
        return minutes + ":" + seconds;
      }

}