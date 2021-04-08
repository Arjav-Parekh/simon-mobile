var gamePattern =[];

var buttonColor =["red","green","blue","yellow"];

var userClickedPattern=[]

var level = 0

var started = false;

$(".btun").click(function(){
  if(!started){

    $("#level-title").text("Level: "+level);
    nextSequence();
    started = true;
  }

});

$(".bton").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

  userClickedPattern=[];

  level++;

  $("#level-title").text("Level: "+level)

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);


}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();

}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 850);
    }
  }else{
    console.log("fail");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 225);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern=[];
  started = false;
}

$(".darkbut").click(function(){
  $("body").addClass("dark-theme");
  $("h1").css("color","white");
  $(".darkbut").css("visibility","collapse");
  $(".whitebut").css("visibility","visible");
  $(".btin").css("border-color","white");
})

$(".whitebut").click(function(){
  $("body").removeClass("dark-theme");
  $("h1").css("color","black");
  $(".whitebut").css("visibility","collapse");
  $(".darkbut").css("visibility","visible");
  $(".btin").css("border-color","black");
})
