var database;
var game;
var obsc1;
var points;
var gameState=0;
var playerCount;
var form,player,game;
var allPlayers;
var distance = 0;
var car1, car2;
var highlight;
var cars;
var playPoint1, playPoint2;
//relative path
//desktop/projects/asynch/images/car1.png - absolute path
function setup(){

    createCanvas(displayWidth-20, displayHeight-30);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
  if(playerCount===2){
      game.update(1);
  }
  if(gameState === 1){
      clear();
      game.play();
  }
  if(gameState == 2) {
      game.end();
  }
}
