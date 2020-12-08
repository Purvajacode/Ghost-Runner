var tower, towerImg;
var door, doorImg, doorGroup;
var climber,climberImg, climberGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var Score = 0;

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorGroup  = new Group(); 
  climberGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
  
  invisibleBlock = new Group();
  Score = 0;
  
}

function draw() 
{
  background(0);
  
  text("Score"+Score,700,50);
  
  if(gameState === "play")
    {
      Score = Score+(getFrameRate()/60);
  
  if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x-3;
    }
  if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x+3;
    }
  if(keyDown("space"))
    {
      ghost.velocityY = -5;
    }
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(tower.y>400)
    {
      tower.y = 300;
    }

  if(climberGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
    {
      ghost.destroy();
    }
    
    
  spawnDoors();
  
  drawSprites();
    }
  if(gameState === "end")
    {
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("gameover",230,250);
    }
}
function spawnDoors()
{
  if(frameCount%240 === 0)
    {
      var door = createSprite(200,-50);
      door.addImage(doorImg);
      
      var climber = createSprite(200,10);
      climber.addImage(climberImg);
      
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      
      door.x = Math.round(random(120,400));
      door.velocityY = 1;
      
      climber.x = door.x;
      climber.velocityY = 1;
      
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY = 1;
      
      
      //assign lifetime
      door.lifetime = 600;
      climber.lifetime = 600;
      //add each door to the group
      doorGroup.add(door);
      climberGroup.add(climber);
      
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
      
      ghost.depth = door.depth;
      ghost.depth+=1;    
    }
}













