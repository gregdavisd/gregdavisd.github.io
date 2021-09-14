buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;

function nextSequence() {
 gamePattern = [];
 userClickedPattern = [];
 ++level;
 $("#level-title").html("Level " + level);

 for (var i = 0; i < level; ++i) {
  randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
 }
 playButtonSequence(gamePattern);
}

function playButtonSound(name) {
 var audio = new Audio("sounds/" + name + ".mp3");
 audio.play();
}

function playButton(name, completeFunc = function() {}) {
 return $("#" + name).animate({
  opacity: 0
 }, {
  duration: 250,
  start: function () {
   playButtonSound(name);
  }
 }).animate({
  opacity: 1
 }, {
  duration: 250,
  complete: completeFunc
 });
}

function playButtonSequence(names, start=0) {
 if (names.length > start)
 {
  playButton(names[start], function () {
   playButtonSequence(names,start+1);
  });
 }
}

$(".btn").on("click", function () {
 if ((level > 0) && (userClickedPattern.length < gamePattern.length)) {
  userChosenColour = this.id;
  if (gamePattern[userClickedPattern.length] === userChosenColour) {
   // correct
   userClickedPattern.push(userChosenColour);
   playButtonSound(userChosenColour);
   $(this).addClass("pressed");
   setTimeout(function (btn) {
    $(btn).removeClass("pressed");
    if (gamePattern.length === userClickedPattern.length) {
     // finished sequence
     setTimeout(function () {
      nextSequence();
     }, 1000);
    }
   }, 250, this);
  } else {
   // wrong
   level = 0;
   playButtonSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function () {
    $("body").removeClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Restart");
   }, 200);
  }
 }
});


$(document).on("keydown", function (event) {
 if (level === 0) {
  event.preventDefault();
  nextSequence();
 }
});
