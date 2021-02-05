var tiger,tigerimg,tigerfreocius,tigerGroup;
var tigerangry;
var bunny,bunnyimg,rabbitimg;
var rabbit;
var carrot,carrotimg,gcarrot,gcimg,carrotgroup,gcarrotgroup;
var bg,bgimg;
var rock,rockimg,grass,grassimg,rockgroup,grassgroup;
var gameover,goimg,restart,restartimg;
var inviground;
var score = 0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){

  tigerimg = loadAnimation("1t.png","2t.png","3t.png","4t.png","5t.png","6t.png","7t.png","8t.png");
  tigerfreocius=loadImage("ferocious-tiger.png");
  bunnyimg= loadAnimation("bi.png","b2.png","b3.png","b4.png","b5.png","b6.png");
  rabbitimg=loadImage("b3.png");
  rockimg= loadImage("rock1.png");
  grassimg= loadImage("grass.png");
  bgimg=loadImage("Forest.jpg");
  carrotimg=loadImage("carrot.png");
  gcimg=loadImage("goldencarrot.png");
  goimg=loadImage("gameover.png");

}

function setup(){
  createCanvas(1000,600);

  bg=createSprite(10,10,1000,600);
  bg.addImage(bgimg);
  bg.scale=1.1;

  tigerangry=createSprite(500,300,20,20);
  tigerangry.addImage(tigerfreocius);
  tigerangry.scale=0.5;
  

  gameover=createSprite(500,100);
gameover.addImage(goimg);
gameover.scale=0.5

rabbit= createSprite(500,420,20,20);
rabbit.addImage(rabbitimg);
rabbit.scale=0.5;


  
  //tiger.velocityX=2;
  //if(tiger.x=1000){
   // bunny.x=-5
  //}

  bunny= createSprite(490,450,10,10);
  bunny.addAnimation("bunnyrunning",bunnyimg);
  bunny.scale=0.35;
  //bunny.debug=true;
  //bunny.velocityX=2;
  //if(bunny.x=1000){
   // bunny.x=-5
 // }
  
  inviground=createSprite(500,555,1000,20);
  //
  inviground.visible=false;

  carrotgroup= new Group ();
  gcarrotgroup = new Group ();
  tigerGroup = new Group();
  rockgroup = new Group();
  grassgroup = new Group();

  bunny.collide(inviground);

  
}


function draw(){

  background(0);

  if (gameState === PLAY){
 
  

  bg.velocityX=-3;
  if(bg.x<700){
   bg.x=bg.width/2
  }
  
  tigerangry.visible=false;
  gameover.visible=false;
  rabbit.visible=false;

  if(keyDown (UP_ARROW) && bunny.y>50){
    bunny.velocityY=-4;
    
  }
  bunny.velocityY=bunny.velocityY+0.8;
 

  if(bunny.isTouching(carrotgroup)){
    score=score+1;
  carrotgroup.destroyEach();
  }

  if(bunny.isTouching(gcarrotgroup)){
    bunny.scale=bunny.scale+0.01;
    score=score+5;
    gcarrotgroup.destroyEach();

  }

  if(bunny.isTouching(rockgroup)){
    score=score-0.1;

  }



  if(tigerGroup.isTouching(bunny)){
  
    gameState=END
    
  }
  
  spawnTiger();
  spawnObstacles();
  spawnCarrots();
  
  fill("white");
  
  textSize(38);
  text("Score:"+score,800,50);
  }

  else if(gameState === END ){
    bg.velocityX=0;

    bunny.visible=false;
   // bunny.changeAnimation("bunny",rabbitimg)
    //bunny.velocityX=0;
    //bunny.x=tigerangry.x;
   // bunny.y=tigerangry.y;

    tigerangry.visible=true;
    rabbit.visible=true;
    gameover.visible=true;
    tigerGroup.setVisibleEach(false);
    carrotgroup.setVelocityXEach(0);
    gcarrotgroup.setVelocityXEach(0);
    rockgroup.setVelocityXEach(0);
    //tiger.changeAnimation("tigerfreocius",tigerfreocius);
   

    text("The tiger ate your Bunny",500,200);
    image(tigerfreocius,300,300,20,20);
    
  }
  bunny.collide(inviground);
  drawSprites();
  textSize(38);
  text("Score:"+score,800,50);
  
  ////console.log(score);
  
}

function spawnObstacles(){

  if(frameCount % 120 === 0){
  rock = createSprite(900,500,70,70);
 // rock.debug=true;
  rock.velocityX=-4;


  var rand=Math.round(random(1,2))
  switch (rand){
    case 1: 
    rock.addImage(rockimg);
    rock.scale=0.2
    break;

    case 2:
     rock.addImage(grassimg);
      rock.scale=0.2
    break;

    default:
      break;

  }
  rock.lifetime=400;
  
  rockgroup.add(rock);
}
}

function spawnCarrots(){

  if(frameCount %80 === 0){
    carrot=createSprite(900,70,40,40);
    //carrot.debug=true;
    carrot.velocityX=-5;
   carrot.addImage(carrotimg);
   carrot.scale=0.7;
   carrotgroup.add(carrot);
   carrot.lifetime=400;
   

  }
  
  if(frameCount %650 === 0){
    gcarrot=createSprite(900,50,40,40);
   // gcarrot.debug=true;
    gcarrot.velocityX=-5;
   gcarrot.addImage(gcimg);
   gcarrot.scale=0.9;
   gcarrot.lifetime=400;

  
   gcarrotgroup.add(gcarrot);

  }
  
}

function spawnTiger(){

  if(frameCount % 500===0 ){
  tiger = createSprite(35,450,10,10);
  tiger.velocityX=5;
  tiger.addAnimation("running",tigerimg);
  tiger.scale=0.5;
  //tiger.debug=true;
  tiger.lifetime=400;
  tigerGroup.add(tiger);

  }
}
