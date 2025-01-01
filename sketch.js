var lft,rgt,ball,rst,restart;
var pScore=0,cScore=0;
var gameState = 0;

function preload(){
    rst = loadImage("restart.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    lft = createSprite(20,windowHeight-windowHeight/2,10,70);
    rgt = createSprite(windowWidth-20,windowHeight-windowHeight/2,10,70);
    ball = createSprite(windowWidth/2,windowHeight/2,15,15);
    restart = createSprite(windowWidth/2,windowHeight/2-70);
    restart.addImage(rst);
    restart.scale = 0.5;
    restart.visible = false;
}

function draw(){
    background(255);

    edge = createEdgeSprites();
    ball.bounceOff(edge[2]);
    ball.bounceOff(edge[3]);
    ball.bounceOff(lft);
    ball.bounceOff(rgt);
    rgt.bounceOff(edge[2]);
    rgt.bounceOff(edge[3]);
    lft.y = ball.y;
    rgt.velocityY = 0;
    if(keyDown(UP_ARROW)){
        rgt.y=rgt.y-10;
    }
    else if(keyDown(DOWN_ARROW)){
        rgt.y=rgt.y+10;
    }

    if(gameState == 0){
        text("Press space to start",windowWidth/2-50,windowHeight/2-100);
        restart.visible = false;
    }

    if(keyDown("space") && gameState == 0){
        play();
        gameState = 1;
    }

    if(ball.x>windowWidth || ball.x<0){
        if(ball.x>windowWidth){
            cScore++;
        }
        if(ball.x<0){
            pScore++;
        }
        reset();
        gameState = 0;
    }

    if(pScore == 5 || cScore == 5 ){
        gameState = -1;
        text("Game Over!!",windowWidth/2-30,windowHeight/2-120);
        restart.visible = true;
    }

    if(mousePressedOver(restart) && gameState == -1){
        gameState = 0;
        pScore = 0;
        cScore = 0;
    }

    drawnet();
    drawSprites();
    text(cScore, (windowWidth/2)-23,20);
    text(pScore, (windowWidth/2)+20,20);
}

function drawnet(){
    for(var i=0;i<windowHeight;i=i+20){
        line(windowWidth/2,i,windowWidth/2,i+10);
    }
}

function play(){
    flag = Math.round(random(0,1));
    if(flag == 1){
        rx = 5;
        ry = 10;
    }
    else{
        rx = -5;
        ry = -10;
    }
    ball.velocityX = rx;
    ball.velocityY = ry;
}

function reset(){
    ball.x = windowWidth/2;
    ball.y = windowHeight/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
}