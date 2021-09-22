document.addEventListener( 'DOMContentLoaded',  ()  => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;


    function startGame(){
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    //starts game interval
    let timerId = setInterval(startGame, 20); 


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
        obstacle.classList.add('obstacle');
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
    }


    generateObstacles();
})