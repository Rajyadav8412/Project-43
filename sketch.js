var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg;
var obstacleImg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var foodGroup;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImg=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup=createGroup();
  obstaclesGroup=createGroup();
  
}

function draw() { 
  background(0);
  drawSprites();
  

  if(gameState===PLAY){
    textSize(40);
    fill("red");
    text("Score : "+score,400,40);

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score=score+2;
      player.scale+=+0.01;
    }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();

    if(obstaclesGroup.isTouching(player)){
      gameState=END;
    }

  }else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;

    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    textSize(50);
    fill("red");
    text("GAMEOVER!",300,220);
  }

  

  
}


function spawnFood(){
  if(frameCount%120===0){
    var banana=createSprite(800,250,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImg);
    banana.scale=0.05;
    banana.velocityX=-4;

    banana.lifetime=300;
    player.depth=banana.depth+1;
    foodGroup.add(banana);

  }
}

function spawnObstacles(){
  if(frameCount%200===0){
    var obstacle=createSprite(800,320,40,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale=0.2;
    obstacle.velocityX=-4;

    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
  }
}
