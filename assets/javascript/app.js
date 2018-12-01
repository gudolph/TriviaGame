window.onload = function () {
    $("#start").click(timer.start).click(quiz.start);
    $("#replay").hide();
};
var intervalId;

var clockRunning = false;

var martins = [
    "assets/images/SadMartin.jpg",
    "assets/images/SadMartin2.jpg",
    "assets/images/SadMartin3.jpg",
    "assets/images/SadMartin4.jpg",
    "assets/images/SadMartin5.jpg",
    "assets/images/SadMartin6.jpg",
    "assets/images/SadMartin7.jpg",
    "assets/images/SadMartin8.jpg",
    "assets/images/SadMartin9.jpg",
    "assets/images/SadMartin10.jpg",
]
var questions = [
    "Which one of these is NOT one of Daenerys' dragons?",
    "What is Littlefinger's sigil?",
    "Who among these is a eunuch?",
    "How many complete books are there in ASOIAF?",
    "Who sent the assassin to try to kill Bran?",
    "Which is NOT the name of a direwolf?",
    "How many Stark children are greenseers",
    "Which of these on Arya's kill list did she kill herself?",
    "Who did Maggie the Frog predict would kill Cersei?",
    "What is Young Griff's real name?",
]

var guesses = [
    q1 = ["Viserion", "Rhaegon", "Drogon", "Rhaegal"],
    q2 = ["Mockingbird", "A Tree", "Vulture", "Seven-Pointed Star"],
    q3 = ["Illyrio", "Roose Bolton", "Varys", "Thoros"],
    q4 = ["3", "4", "5", "6"],
    q5 = ["Lysa Arryn", "Peter Baelish", "Joffrey Baratheon", "Jaime Lannister"],
    q6 = ["Flower", "Lady", "Shaggydog", "Ghost"],
    q7 = ["1", "2", "3", "All of them"],
    q8 = ["Polliver", "Joffrey Baratheon", "Sir Ilyn Payne", "Sandor Clegane"],
    q9 = ["Littlefinger", "The Valonquar", "The Sand Snakes", "The Three-Eyed Crow"],
    q10 = ["Aegon", "Aemond", "Rhagar", "Rhanys"],
]

var correct = 0;
var j = 0;
var answers = ["Rhaegon", "Mockingbird", "Varys", "5", "Joffrey Baratheon", "Flower", "1", "Polliver", "The Valonquar", "Aegon"]
var quiz = {
    start: function () {
        $("#container").html("<h2>Question " + (j + 1));
        $("#martin").attr("src",martins[j])
        $("p").html("");
        $("#start").hide();
        $("#question").text(questions[j]);
        $("#total").text("Score: " + correct + "/10");
        if (timer.time < 31) {
            $("#warning").text("30 seconds left!");
        }
        console.log(guesses[j]);
        for (i = 0; i < 4; i++) {
            var guess = (guesses[j][i]);
            console.log(guess)
            $("#guesses").append("<button>" + guess);
        }

        $("button").on("click", function () {
            var value = answers.indexOf($(this).html());
            console.log($(this).html());
            console.log(value);
            if (value === -1) {
                correct = correct;
            }
            if (value != -1) {
                correct++;
            }
            j++;
            if (j < 9) {
                $("#container").html("<h2>Question " + (j + 1));
                $("#question").empty();
                $("#guesses").empty();
                $("#question").text(questions[j]);
                $("button").click(quiz.start(j))

            }
            if (j === 9) {
                $("#question").empty();
                $("#guesses").empty();
                $("#question").text(questions[j]);
                $("button").click(quiz.start(j))
                $("button").click(timer.stop);

            }
            if (j === 10) {
                $("#question").empty();
                $("#guesses").empty();
                $("#container").empty().html("<h2>Well done! You got " + correct + " of 10 questions right!")
                $("#info").text("He'll finish the series after all!");
                $("#martin").attr("src", "assets/images/JoffClap.gif");
                $("#replay").show().click(function() {
                    location.reload();
                });
            }
        })

    }
}


var timer = {
    time: 45,


    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }
    },
    count: function () {
        timer.time--;
        if (timer.time === 0) {
            clearInterval(intervalId);
            $("#question").empty();
            $("#guesses").empty();
            $("#container").html("<h2>You missed the deadline!");
            $("#info").html("<p>Good luck telling the fans!");
            $("#replay").show().click(function() {
                location.reload();
            });
            $("#martin").attr("src", "assets/images/JonSad.gif")
        }
        var displayTime = timer.countdown(timer.time);
        $("#timer").text("Time left: " + displayTime);

    },
    stop: function () {
        timer.time === 0,
            clearInterval(intervalId);
        var displayTime = timer.countdown(0);
        console.log(timer.time);
        $("#timer").text("Time left: " + displayTime);
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