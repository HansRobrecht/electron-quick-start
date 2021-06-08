;(function() {
    
    'use strict';

    window.addEventListener('load', function() {

        //Assignments of variables used globally

        let profile = JSON.parse(window.sessionStorage.getItem('loggedUser'));
        console.log(profile);

        const player = document.getElementById('player');
        const modal = document.getElementById("myModal");
        const finalColor = 'rgb(255, 20, 147)';
        const timerSetting = 500;
        let transitionNumber = 0;

        let playerCycle;
        let capturingZone;
        let lastContestedZone;
        let scoreModifier;
        let pauzedGame;
        let gameEnded;
        let lives;


        //Timers
        
        let projectileCreationTimer;
        let projectileShootTimer;
        let collisionDetectionTimer;
        let capturingTimer;
        let scoreTimer;



        //Setup code for positioning, etc

        //px is being used for more consistent results
        const setupCode = function(restartGame){
            player.style.left = 50 + 'px';
            player.style.top = 50 + 'px';
            player.style.width = 50 + 'px';
            player.style.height = 35 + 'px';

            lastContestedZone = '';
            lives = 3;
            scoreModifier = 1;
            transitionNumber = 0;
            pauzedGame = false;
            gameEnded = false;
            capturingZone = false;         

            createCapturezone(3);
            updateLifeCounter();
            document.querySelector('.score').innerText = 0;
            modal.style.display = 'none';
            modal.querySelector('h2').innerText = 'Game is pauzed';
            for(let heart of document.querySelectorAll('.heart')){
                heart.style.display = 'inline-block';
            }

            if(restartGame){
                clearTimers();
            }
            setupTimers();
            
        };
        




        //Gamefunctions

        const setupTimers = function(){
            projectileCreationTimer = setInterval(createProjectile, timerSetting/2);
            projectileShootTimer = setInterval(shootProjectiles, timerSetting/2);
            collisionDetectionTimer = setInterval(collisionDetection, 1);
            scoreTimer = setInterval(increaseScore, timerSetting*2);
        };

        const clearTimers = function(){
            clearInterval(projectileShootTimer);
            clearInterval(collisionDetectionTimer);
            clearInterval(projectileCreationTimer);
            clearInterval(capturingTimer);
            clearInterval(scoreTimer);
        };

        //Function that makes player move horizontally, will also change his animation based on the pressed button
        const moveCharacterHorizontally = function(xValues){
            //console.log(playerObject.style.left + ' - ' + playerObject.style.top);
            if(xValues < 0 && playerCycle !== '../img/Running_Cycle_Left.gif'){
                changeCharacterAnimation('Running_Cycle_Left.gif');
            }
            else if(xValues > 0 && playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            if(!(parseFloat(player.style.left) < 0 && xValues < 0) && !(parseFloat(player.style.left) > (window.outerWidth) && xValues > 0)){
                if(xValues > 0){
                    player.style.left = parseFloat(player.style.left) + parseFloat(xValues)*5 + 'px';
                }
                else if(xValues < 0){
                    player.style.left = parseFloat(player.style.left) + parseFloat(xValues)*5 + 'px';
                }
            }  
        };

        //Function that makes player move vertically
        const moveCharacterVertically = function(yValues){
            //console.log(playerObject.style.left + ' - ' + playerObject.style.top);
            if(playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            if(!(parseFloat(player.style.top) < 0 && yValues < 0) && !(parseFloat(player.style.top) > (window.outerHeight) && yValues > 0)){
                if(yValues > 0){
                    player.style.top = parseFloat(player.style.top) + yValues*5 + 'px';

                }
                else if(yValues < 0){
                    player.style.top = parseFloat(player.style.top) + yValues*5 + 'px';
                }
                
            }  
        };

        //Changes characterImg based on given fileLocation
        const changeCharacterAnimation = function(gifFile){
            playerCycle = '../img/' + gifFile;
            player.src = playerCycle;
        };

        //Function with two parameters, will return when their 'hitbox' aka coordinates are in each other
        //Credits : https://www.codegrepper.com/code-examples/javascript/hitboxes+javascript
        function detectCollision(hitbox, target){
            let targetLeft = parseFloat(target.style.left);
            let targetWidth = parseFloat(target.style.width);
            let targetTop = parseFloat(target.style.top);
            let targetHeight = parseFloat(target.style.height);

            let hitboxLeft = parseFloat(hitbox.style.left);
            let hitboxWidth = parseFloat(hitbox.style.width);
            let hitboxTop = parseFloat(hitbox.style.top);
            let hitboxHeight = parseFloat(target.style.height);

            //console.log(playerLeft, playerWidth, playerTop, playerHeight);

            return (
                targetLeft < hitboxLeft + hitboxWidth && 
                targetLeft + targetWidth > hitboxLeft &&
                targetTop < hitboxTop + hitboxHeight &&
                targetTop + targetHeight > hitboxTop
                )
        }

        //Function with two paremeters, will return random number between those parameters already rounded
        //Credits : https://betterprogramming.pub/generating-random-numbers-in-javascript-4b2a1e9d1806
        function random(min,max){
            return Math.round(Math.random() * (max-min) + min);
        }


        //Function which ends game, terminating all timers and updating data on airtable
        const endGame = function(){
            console.log('game ended')
            modal.querySelector('h2').innerText = 'You died';
            gameEnded = true;
            clearTimers();
            modal.style.display = 'inline-block';
        };

        const pauzeGame = function(){
            console.log('pauzing game');
            pauzedGame = !pauzedGame;
             if(!gameEnded){
                if(pauzedGame){
                    clearTimers();
                    modal.style.display = 'inline-block';
                }
                else{
                    setupTimers();
                    modal.style.display = 'none';
                }
            } 
        };

        //Function that creates new capturezone a certain amount of capturezones with random positioning
        const createCapturezone = function(maxZones){
            const playground = document.querySelector('.playground');
            

            for(let dmx = 0; dmx < maxZones; dmx++){
                const newCapturezone = document.createElement('div');
                const captureLetter = document.createElement('p');
                captureLetter.classList.add('captureLetter');
                captureLetter.innerText = 'C';
                newCapturezone.appendChild(captureLetter);
                const offsetWidth = random(0, (window.outerWidth - 100));
                const offsetHeight = random(0, (window.outerHeight - 100));

                newCapturezone.style.width = '50px';
                newCapturezone.style.height = '50px';
                newCapturezone.style.top = offsetHeight + 'px';
                newCapturezone.style.left = offsetWidth + 'px';
                newCapturezone.classList.add('capturezone');
                playground.appendChild(newCapturezone);
            }
        };

        //Increases scoreModifier based on amount of captured zones
        const increaseScoreModifier = function(){
            let scoreIncrease = 0;
            const capturezones = document.querySelectorAll('.capturezone');
            for(let capturezone of capturezones){
                if(capturezone.style.backgroundColor === finalColor){
                    scoreIncrease++;
                }
            }        
            scoreModifier = 1 + scoreIncrease;   
        };

        //Reduces lives and hides a heart
        const reduceLives = function(){
            lives = lives - 1;
            updateLifeCounter();

            for(let heart of document.querySelectorAll('.heart')){
                if(heart.style.display !== 'none'){
                    heart.style.display = 'none';
                    break;
                }
            }
            
            if(lives <= 0){
                endGame();
            }
        };

        //Removes projectile from playground
        const removeProjectile = function(projectile){
            const playground = document.querySelector('.playground');
            playground.removeChild(projectile);
        };

        //Updates lifecounter gamemenu
        const updateLifeCounter = function(){
            const lifeCounter = document.querySelector('.lives');
            lifeCounter.innerText = lives;
        };




        //Interval functions responsible for gamemechanics
        
        //Function creates a div of class projectile in a random direction with random speed and size
        function createProjectile(){
            const randomDirection = random(0, 3);
            const offset = random(0, (window.outerWidth - 100));
            const projectileSpeed = random(10, 100);
            const length = random(10, 100);
            const width = random(10, 50);

            const newProjectile = document.createElement('div');
            //Projectile vertical
            if(randomDirection === 0 || randomDirection === 2){
                newProjectile.style.width = width + 'px';
                newProjectile.style.height = length + 'px';
                newProjectile.style.left = offset + 'px';
                if(randomDirection === 0){
                    newProjectile.classList.add('down');
                    newProjectile.style.top = '1px';
                }
                else{
                    newProjectile.classList.add('up');
                    newProjectile.style.top = (parseInt(window.outerHeight) - 20)  + 'px';
                }
            }
            //Projectile horizontal
            else if(randomDirection === 1 || randomDirection === 3){
                newProjectile.style.width = length + 'px';
                newProjectile.style.height = width + 'px';
                newProjectile.style.top = offset + 'px';
                if(randomDirection === 1){
                    newProjectile.classList.add('left');
                    newProjectile.style.left = (parseInt(window.outerWidth) - 20) + 'px';
                }
                else{
                    newProjectile.classList.add('right');
                    newProjectile.style.left = '1px';
                }
            }
            newProjectile.classList.add('projectile');
            newProjectile.setAttribute('projectileSpeed', projectileSpeed);
            document.querySelector('.playground').appendChild(newProjectile);
            //clearInterval(projectileCreationTimer);
        };

        //Moves projectile in pointed direction with based on their custom speed
        function shootProjectiles(){
            const playground = document.querySelector('.playground');
            const allProjectiles = document.querySelectorAll('.projectile');
            for(let projectile of allProjectiles){
                if(projectile.classList.contains('down')){
                    projectile.style.top = parseInt(projectile.style.top) + parseInt(projectile.getAttribute('projectileSpeed')) + 'px';
                }
                else if(projectile.classList.contains('up')){
                    projectile.style.top = parseInt(projectile.style.top) - parseInt(projectile.getAttribute('projectileSpeed')) + 'px';
                }
                else if(projectile.classList.contains('right')){
                    projectile.style.left = parseInt(projectile.style.left) + parseInt(projectile.getAttribute('projectileSpeed')) + 'px';
                }
                else if(projectile.classList.contains('left')){
                    projectile.style.left = parseInt(projectile.style.left) - parseInt(projectile.getAttribute('projectileSpeed')) + 'px';
                }
                if((parseInt(projectile.style.top) > (window.outerHeight - 10) || parseInt(projectile.style.top) < 0) || ((parseInt(projectile.style.left) < 0) || parseInt(projectile.style.left) > (window.outerWidth - 10)) ){
                    removeProjectile(projectile);
                }
            }
        };

        //Function which checks each div that can collide with the player, results depend on which div made contact
        const collisionDetection = function(){
            const projectiles = document.querySelectorAll('.projectile');
            let detectedCapture = false;
            for(let projectile of projectiles){
                if(detectCollision(projectile, player)){
                    removeProjectile(projectile);
                    reduceLives();
                }
            }

            const capturezones = document.querySelectorAll('.capturezone');
            for(let capturezone of capturezones){
                if(detectCollision(capturezone, player)){
                    detectedCapture = true;
                    if(!capturingZone && (capturezone.style.backgroundColor !== finalColor)){
                        lastContestedZone = capturezone;
                        capturingTimer = setInterval(transitioncaptureground, timerSetting*2);
                        capturingZone = true;
                        break;
                    }
                }
            }
            if(!detectedCapture && capturingZone && (lastContestedZone !== '')){
                lastContestedZone.style.backgroundColor = 'gray';
                clearInterval(capturingTimer);
                transitionNumber = 0;
                lastContestedZone = '';
                capturingZone = false;
            }
        };

        //Slowly changes contested capturezone to it's final color
        const transitioncaptureground = function(){
            let colorTransition =  ['#CE6766', '#C92208', '#B8300B', '#AD201A', finalColor];

            lastContestedZone.style.backgroundColor = colorTransition[transitionNumber];
            //lastContestedZone.style.backgroundColor = 'deeppink';
            transitionNumber = transitionNumber + 1;

            if(lastContestedZone.style.backgroundColor === finalColor){
                lastContestedZone = '';
                clearInterval(capturingTimer);
                transitionNumber = 0;
                capturingZone = false;
                increaseScoreModifier();
            }
        }

        //Increases score based on scoreModifier
        const increaseScore = function(){
            const scorefields = document.querySelectorAll('.score');
            for(let scorefield of scorefields){
                scorefield.innerText = parseInt(scorefield.innerText) + scoreModifier * 1;
            }
        }



        

        //Single call of functions which setup gamemechanics

        setupCode(false);





        //Event Handlers

        //Detects keypress and will move character when pressing arrow keys
        window.onkeydown = function(pressedKey){
            if(!gameEnded && (!pauzedGame || pressedKey.keyCode === 27 )){
                switch(pressedKey.keyCode){
                    case 27: pauzeGame();break; //Pressed Escape Key
                    case 37: moveCharacterHorizontally(-1);break; //Pressed Left Arrow Key
                    case 39: moveCharacterHorizontally(1);break; //Pressed Right Arrow Key
                    case 38: moveCharacterVertically(-1);break; //Pressed Up Arrow Key
                    case 40: moveCharacterVertically(1);break; //Pressed Bottom Arrow Key
                }
            }
        }

        document.getElementById('restartButton').addEventListener('click', (e) =>{
            e.preventDefault();
            setupCode();
        });

        //Detecs when arrow buttons are no longer pressed and changes playercycle back to idle animation
        window.onkeyup = function(){
            changeCharacterAnimation('Idle_Cycle.gif')
        }





        //Modal functions

        // When the user clicks on <span> (x), close the modal
        document.getElementsByClassName("close")[0].addEventListener('click', () =>{
            if(!gameEnded & pauzedGame){
                pauzeGame();
            }
        });

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if(!gameEnded & pauzedGame){
                console.log('outside modal');
                pauzeGame(true);
            }
        }
    });
})();