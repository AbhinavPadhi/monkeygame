var monkey, monkey_running
var ground;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {


    monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstaceImage = loadImage("obstacle.png");

}



function setup() {
    createCanvas(400, 400);
    monkey = createSprite(70, 300, 5, 5);
    monkey.addAnimation("monkeyRun", monkey_running);
    monkey.scale = 0.1;
    ground = createSprite(200, 370, 800, 20);
    ground.velocityX = -4;
    score = 0;
    fruitsGroup = new Group();
    obstacleGroup = new Group();
    monkey.setCollider("rectangle", 0, 0, 500, 614);
    monkey.collide(ground);
}


function draw() {
    background("lightblue");
    textSize(20);

    text("Survival Time: " + score, 20, 20);


    if (gameState === PLAY) {
        if (ground.x === 0) {
            ground.x = 200;
        }
        if (keyDown("space") && monkey.y > 325) {
            monkey.velocityY = -23;
        }
        monkey.velocityY = monkey.velocityY + 0.8;
        monkey.collide(ground);

        score = score + Math.round(getFrameRate() / 60);

        if (fruitsGroup.isTouching(monkey)) {
            fruitsGroup.destroyEach();
        }

        if (obstacleGroup.isTouching(monkey)) {
            gameState = END;
        }
    }

    if (gameState == END) {

        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        fruitsGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        fruitsGroup.setLifetimeEach(-1)
    }

    drawSprites();
    spawnObstacles();
    bananas();

}

function spawnObstacles() {

    if (frameCount % 300 == 0) {

        obstacle = createSprite(550, 345, 20, 20);
        obstacle.velocityX = -4;
        obstacle.addImage(obstaceImage);
        obstacle.scale = 0.1;
        obstacle.lifetime = 180;
        obstacle.setCollider("circle", -10, 0, 200);

        obstacleGroup.add(obstacle);
    }
}

function bananas() {

    randy = Math.round(random(120, 200));
    if (frameCount % 80 == 0) {

        Fruit = createSprite(510, 310, 20, 20);
        Fruit.y = randy;
        Fruit.velocityX = -4;
        Fruit.addImage(bananaImage);
        Fruit.scale = 0.1;
        Fruit.lifetime = 180;
        fruitsGroup.add(Fruit);
        Fruit.depth = monkey.depth;
        monkey.depth = monkey.depth + 1

    }

}