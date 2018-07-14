$(function () {
    //Game array, each is an object.
    var game = [{
            question: 'The Nintendo Entertainment System was released in North America in... ',
            answers: ['January 1979', 'May 1990', 'October 1985', 'March 1983'],
            correct: 2,
        },
        {
            question: "This 2-Player game featured Mad Dog and Scorpion as protagonists, as well as one of the most iconic cheat codes ever.",
            answers: ['River City Ransom', 'Bubble Bobble', 'Ikari Warriors', 'Contra'],
            correct: 3,
        },
        {
            question: 'Who was the original name of the nemesis of Mario?',
            answers: ['Bowser', 'King Koopa', 'Ludwig', 'Wario'],
            correct: 1,
        },
        {
            question: 'If it is dangerous to go alone, what should you take?',
            answers: ['A friend', 'Wooden Sword', 'This', 'Caution'],
            correct: 1,
        },
        {
            question: 'What peripheral device did you need to hunt ducks?',
            answers: ['Shotgun', 'Pistol', 'Zapper', 'Rifle'],
            correct: 2,
        },
        {
            question: 'What was the last game released for the NES?',
            answers: ['Super Asteroids', 'Warios Woods', 'Frogger', 'Super Mario 4'],
            correct: 1,
        },
        {
            question: 'Who did Mr Dream replace in Punch Out?',
            answers: ["George Foreman", "Joe Louis", "Muhammad Ali", "Mike Tyson"],
            correct: 3,
        },
        {
            question: 'This family famously opposes Dracula in the Castlevania franchise?',
            answers: ['Alucard', 'Belmont', 'Stroker', 'Bufffy'],
            correct: 1,
        },
        {
            question: 'In A Boy and his Blob, what does the boy feed the blob?',
            answers: ['Spiders', 'Steak', 'Jelly Beans', 'Garbage'],
            correct: 2,
        },
        {
            question: 'How many worlds (levels) are there in Mario 3?',
            answers: ['Nine', 'Eleven', 'Seven', 'Fourteen'],
            correct: 0,
        }
    ];
    //Gobal Variables
    var timer = 10;
    var timerID;
    var timerStart = false;
    var unanswered = 0;
    var right = 0;
    var wrong = 0;
    var currentQuestion = 0;
    var userGuess = "";
    var end = game.length;

    //Hides the reset button.
    $('.fresh').hide();



    function startTimer() {
        if (!timerStart) {
            timerID = setInterval(countDown, 1000);
            timerStart = true;
        }
    }

    function countDown() {
        $('.timer').html('<h2>Time Remaining: <br>' + timer + '</h2>') //Display timer
        timer--;


        if (timer < 0) {
            unanswered++; //unanswered goes up 1
            console.log(unanswered)
            stopTimer();
            $('.answers').empty();
            $('.laugh').show();
            $('.timer').html('<p>Time is up!</p> <p>The Correct answer was ' + game[currentQuestion].answers[game[currentQuestion].correct] + "</p>");
            currentQuestion++;
            setTimeout(displayQuestion, 5000);
        }
    }

    function stopTimer() {
        timerStart = false;
        timer = 10; //resets the timer to 10
        clearInterval(timerID);
    }
    //display question with answers add 4 buttons for answers and gives them a value 0-3
    function displayQuestion() {

        //check if at end of game if not then go to next question      
        if (resetGame()) {

        } else {
            var q = game[currentQuestion].question;
            $('.questions').html(q);
            startTimer();
            $('.laugh').hide();
            var answer = game[currentQuestion].answers;
            for (i = 0; i < answer.length; i++) {
                console.log(answer[i])
                btn = $('<div>');
                btn.text(answer[i]);
                btn.addClass('button btn-lg bg-light');
                btn.attr('data-value', i);
                $('.answers').append(btn);
            }
        }
    }

    function checkCorrect() {
        if (userGuess === game[currentQuestion].correct) {
            stopTimer();
            right++;
            $('.triforce').show();

            $('.answers').empty();
            $('.results').html('<p>CORRECT!</p>');

            currentQuestion++;
            setTimeout(function () {
                $('.triforce').hide();
                $('.results').empty();
                displayQuestion();

            }, 3000);

        } else {
            wrong++;
            userGuess = "";
            stopTimer();
            $('.answers').empty();
            $('.question').empty();
            $('.timer').empty();
            $('.laugh').show();
            $('.results').html('<p>Wrong!</p>');
            $('.current').text('The correct answer is: ' + game[currentQuestion].answers[game[currentQuestion].correct])
            currentQuestion++;
            setTimeout(function () {
                $('.current').empty();
                $('.results').empty();
                $('.laugh').hide();
                displayQuestion();
            }, 3000);
        }
        console.log(right + " " + wrong)
    }


    function resetGame() {
        if (currentQuestion === end) {
            $('.questions').empty();
            $('.timer').empty();
            $('.answers').empty();
            $('.timer').html('Game Over').addClass('gameOver');
            $('.results').html('<p>You answered ' + right + ' correctly!</p><p>You answered ' + wrong + ' wrong!</p><p>You did not answer ' + unanswered + ' questions.</p><p>What? Was 10 seconds not enough time?!?</p>')
            $('.reset').show();
            return true;
        }
    }
    //Resets everything to fresh page status.
    function newGame() {
        $('.reset').hide();
        $('.fresh').hide();
        $('.answers').empty();
        $('.questions').empty();
        $('.timer').empty();
        $('.results').empty();
        $('.start').show();
    }


    //Click function hides start button and starting picture, starts timer and shows question.
    $('.start').on('click', function () {
        $(this).hide();
        $('.quiz').show();
        currentQuestion = 0;
        wrong = 0;
        right = 0;
        unanswered = 0;
        startTimer();
        $('.questions').fadeIn(1000);
        $('.answers').fadeIn(1000);
        displayQuestion();
    })

    $('.answers').on('click', '.button', function () {
        userGuess = parseInt($(this).attr('data-value'))
        checkCorrect();
    })
    //Hook into click event to reset game.
    $('.reset').on('click', function () {
        newGame()
    })

});