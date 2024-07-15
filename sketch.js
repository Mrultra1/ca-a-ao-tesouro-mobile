var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, endImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

// Estados do jogo
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Movendo plano de fundo
  path = createSprite(width / 2, height / 2);
  path.addImage(pathImg);
  path.velocityY = 4;

  // Criar menino correndo
  boy = createSprite(width / 2, height - 70, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    // Código para redefinir plano de fundo
    if (path.y > height) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 100;
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 150;
    } else if (swordGroup.isTouching(boy)) {
      gameState = END;

      boy.addAnimation("SahilRunning", endImg);
      boy.x = width / 2;
      boy.y = height / 2;
      boy.scale = 0.6;

      cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();

      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Tesouro: " + treasureCollection, width / 2 - 50, 30);
  }
}

function createCash() {
  if (World.frameCount % 200 === 0) {
    var cash = createSprite(Math.round(random(50, width - 50)), 40, 10, 10);
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = Math.ceil(height / 3);
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 === 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50)), 40, 10, 10);
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = Math.ceil(height / 3);
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 === 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50)), 40, 10, 10);
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = Math.ceil(height / 3);
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 === 0) {
    var sword = createSprite(Math.round(random(50, width - 50)), 40, 10, 10);
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = Math.ceil(height / 3);
    swordGroup.add(sword);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  path.width = windowWidth;
  path.height = windowHeight;
}
