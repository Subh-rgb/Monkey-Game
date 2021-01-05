var MONKEY , MONKEY_running;
var BANANA ,BANANAImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;


function preload(){
  
  
  MONKEY_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  BANANAImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  

 
}



function setup() {
  createCanvas (600,600)
  
  MONKEY = createSprite (100,500, 20, 20)
  MONKEY.addAnimation("MONKEY_running", MONKEY_running);
  MONKEY.scale = 0.2;
  
  //obstacle = createSprite(300,500,20,20)
 
  
  ground = createSprite(100,570,600,20);
  ground.x = ground.width /2;
  
  obstacleGroup = createGroup();
  BANANAGroup = createGroup();
  
  
  score = 0;
  
  
}


function draw() {
background ("white")
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnBANANA();
  
   if(keyDown("space") && MONKEY.y >= 400) {
        MONKEY.velocityY = -12;
    }
      if (BANANAGroup.isTouching(MONKEY)){
      BANANAGroup.destroyEach();
      score=score+1;
    }
     
      if (MONKEY.isTouching(obstacleGroup)){
      MONKEY.velocityY=0;
      MONKEY.velocityX = 0;
      BANANAGroup.velocityX = 0;
      obstacleGroup.velocityX = 0;
      
      BANANAGroup.lifetime = BANANAGroup.lifetime*(-1)
      obstacleGroup.lifetime = obstacleGroup.lifetime*(-1)
    }
  
  MONKEY.velocityY = MONKEY.velocityY + 0.8

  
  
   MONKEY.collide(ground); 
  
  drawSprites();
  
  fill("white")
 text("Score: "+ score, 500,50);
  
  fill("black")
  textSize(20)
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50)
}



function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,512,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnBANANA() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    BANANA = createSprite(600,100,40,10);
    BANANA.y = Math.round(random(300,400));
    BANANA.addImage(BANANAImage);
    BANANA.scale = 0.1;
    BANANA.velocityX = -3;
    
     //assign lifetime to the variable
    BANANA.lifetime = 500;
    
    //adjust the depth
    BANANA.depth = MONKEY.depth;
    MONKEY.depth = MONKEY.depth + 1;
    
    //adding cloud to the group
   BANANAGroup.add(BANANA);
    }
}

