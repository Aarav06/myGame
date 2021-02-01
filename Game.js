class Game {
  constructor(){

  }

  //getState from database
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  //update gameState in database
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //start game
  async start(){

    //only start game when gameState is 0
    if(gameState === 0){
      player = new Player();

      //get playercount from database
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      //Show form-input name
      form = new Form()
      form.display();
    }

    //create player sprites
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    obsc1 = createSprite(800, -100, 800, 50);
    //Array cars=all the player's sprites
    cars = [car1, car2];
  }

  //play game
  play(){
    form.hide();
    Player.getPlayerInfo();
   // player.getPoints();
    if(allPlayers !== undefined){

      //var display_position = 100;
      background("blue");


      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;
      for(var plr in allPlayers){

        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 310;

        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        console.log(player.points);
        if(!cars[index - 1].isTouching(obsc1)) {
          fill("white");
          //text("I have " + player.points, x-40, y-90);
          obsc1.shapeColor= "white";
          cars[index - 1].shapeColor = "yellow";
        }
        if(cars[index - 1].isTouching(obsc1)) {
          gameState = 2;
   //       console.log(player.updatePoint(1));
          //Player.updatePoint(1);
          obsc1.shapeColor="pink";
          fill("yellow");
          text('YOU WIN!!!', x-40, y-100);
          cars[index - 1].shapeColor = "green";
        }
        //determine which car is the camera should follow 
        if (index === player.index){
          cars[index - 1].shapeColor = "red";

          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    //moves car up
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //when the player reaches the finish line change the gamestate to end
  
    drawSprites();
  }
  //end function
  end() {
    textSize(50);
    fill("white");
    text("END",  -140, displayHeight/2);
    console.log("END");
  }
}