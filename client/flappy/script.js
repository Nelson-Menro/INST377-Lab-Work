document.addEventListener( 'DOMContentLoaded',  ()  => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let gap = 430;
    let isGameOver = false;

    function startGame(){
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    //starts game interval
    let gameTimerId = setInterval(startGame, 20); 


    //stops the game interval
    //clearInterval(timerId);
    function control(event){
        if(event.keyCode ===  32){
            jump();
        }
    }

    function jump(){
        if(birdBottom < 500){
            birdBottom += 50;
        }
        
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup' , control);


    function generateObstacles(){
        let randomHeight = Math.random() * 60;
        let obstacleLeft = 500;
        let obstacleBottom = randomHeight;
        
        //creates div
        const obstacle  = document.createElement('div');
        const topObstacle = document.createElement('div');

        if(!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';


        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';


            if(obstacle.style.left === -60){
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220  && (birdBottom < obstacleBottom+115 || birdBottom > obstacleBottom + gap - 230) || 
            birdBottom === 0){
                gameOver();
                clearInterval(timerId);
            }
           
        }
    
        let timerId = setInterval(moveObstacle, 20);
        if(!isGameOver) {
            setTimeout(generateObstacles, 3000);
        }
    }
    generateObstacles();


    function gameOver(){
        clearInterval(gameTimerId);
        isGameOver = true; 
        document.removeEventListener('keyup', control);
        console.log('Game ended')
    }


})