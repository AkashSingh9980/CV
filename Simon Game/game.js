//Array declaration to store colors
var buttonColors = ["red", "blue", "green", "yellow"];

//CPU controlled color array through randomization
var gamePattern = [];
//User controlled color array through mosue clicks
var userClickedPattern = [];

var started = false;
var level = 0;

//Start off the game by pressing any key
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Check for button click
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//Match gamePattern array and userClickedPattern array for game progression
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//Generate next random color to be added in the gamePattern sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Reset the game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
