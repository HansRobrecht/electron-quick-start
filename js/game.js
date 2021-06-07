;(function() {
    
    'use strict';

    window.addEventListener('load', function() {

        //Assignments of variables used globally

        let user = JSON.parse(window.sessionStorage.getItem('loggedUser'));
        let playerCycle;
        const player = document.getElementById('player');
        const timerSetting = 500;


        //Timers
        
        let projectileCreationTimer;
        let projectileShootTimer;
        let collisionDetectionTimer;



        //Setup code for positioning, etc

        //px is being used for more consistent results
        const setupCode = function(){
            player.style.left = 50 + 'px';
            player.style.top = 50 + 'px';
            player.style.width = 50 + 'px';
            player.style.height = 35 + 'px';

            projectileCreationTimer = setInterval(createProjectile, timerSetting/2);
            projectileShootTimer = setInterval(shootProjectiles, timerSetting/2);
            collisionDetectionTimer = setInterval(collisionDetection, timerSetting/timerSetting);
        };
        




        //Gamefunctions

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
            console.log('ending game');
            clearInterval(projectileShootTimer);
            clearInterval(collisionDetectionTimer);
            clearInterval(projectileCreationTimer);
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
                    playground.removeChild(projectile);
                }
            }
        };

        const collisionDetection = function(){
            const projectiles = document.querySelectorAll('.projectile');
            for(let projectile of projectiles){
                if(detectCollision(projectile, player)){
                    projectile.style.backgroundColor = 'green';
                }
            }
        };


        

        //Single call of functions which setup gamemechanics

        setupCode();





        //Event Handlers

        //Detects keypress and will move character when pressing arrow keys
        window.onkeydown = function(pressedKey){
            switch(pressedKey.keyCode){
                case 27: endGame();break; //Pressed Escape Key
                case 37: moveCharacterHorizontally(-1);break; //Pressed Left Arrow Key
                case 39: moveCharacterHorizontally(1);break; //Pressed Right Arrow Key
                case 38: moveCharacterVertically(-1);break; //Pressed Up Arrow Key
                case 40: moveCharacterVertically(1);break; //Pressed Bottom Arrow Key
            }
        }

        //Detecs when arrow buttons are no longer pressed and changes playercycle back to idle animation
        window.onkeyup = function(){
            changeCharacterAnimation('Idle_Cycle.gif')
        }
    });
})();