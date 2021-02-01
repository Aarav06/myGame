class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.points = 0;
    }

    //get count from database
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }

    getPoints(){
      var playerIndex = database.ref('players/player' + this.index);
      playerIndex.on("value",(data)=>{
        points = data.val();
      })
    }
  
    //update count from database
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }

    

    //update distance and name to database
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        points:this.points,
      });
    }

    static updatePoint(point){
      var playerIndex = 'players/player' + this.index;
      database.ref(playerIndex).update({
        points: point
      });
    }

    //gets player info from database
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  }