

;(function() {
	'use strict';

	window.addEventListener('load', function() {

        let hiddenWalls = new Array();

        document.getElementById('player').style.left = 5 + 'rem';
        document.getElementById('player').style.top = 5 + 'rem';

        let playerCycle;
        
        let moveCharacterHorizontally = function(xValues){
            const playerObject = document.getElementById('player');
            //console.log(playerObject.style.left + ' - ' + playerObject.style.top);
            if(xValues < 0 && playerCycle !== '../img/Running_Cycle_Left.gif'){
                changeCharacterAnimation('Running_Cycle_Left.gif');
            }
            else if(xValues > 0 && playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            if(!(parseFloat(playerObject.style.left) < 0 && xValues < 0) && !(parseFloat(playerObject.style.left) > (window.outerWidth/10) && xValues > 0)){
                if(xValues > 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left)+0.5, parseFloat(playerObject.style.top))){
                        playerObject.style.left = parseFloat(playerObject.style.left) + parseFloat(xValues)/2 + 'rem';
                    }
                }
                else if(xValues < 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left)-0.5, parseFloat(playerObject.style.top))){
                        playerObject.style.left = parseFloat(playerObject.style.left) + parseFloat(xValues)/2 + 'rem';
                    }
                }
            }  
        };

        let moveCharacterVertically = function(yValues){
            const playerObject = document.getElementById('player');
            console.log(playerObject.style.left + ' - ' + playerObject.style.top);
            if(playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            if(!(parseFloat(playerObject.style.top) < 0 && yValues < 0) && !(parseFloat(playerObject.style.top) > (window.outerHeight/10) && yValues > 0)){
                if(yValues > 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top)+0.5)){
                        playerObject.style.top = parseFloat(playerObject.style.top) + yValues/2 + 'rem';
                    }
                }
                else if(yValues < 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top)-0.5)){
                        playerObject.style.top = parseFloat(playerObject.style.top) + yValues/2 + 'rem';
                    }
                }
                
            }  
        };

        let changeCharacterAnimation = function(gifFile){
            const playerObject = document.getElementById('player');
            playerCycle = '../img/' + gifFile;
            playerObject.src = playerCycle;
        };

        let testHiddenWall = function(xCoordinate, yCoordinate){
            console.log(xCoordinate + ' - ' + yCoordinate);
            if(hiddenWalls.length === 0){
                hiddenWalls.push([7,5], [10,21], [10,22]);
            }
            //console.table(hiddenWalls);
            for(let dmx = 0; dmx < hiddenWalls.length; dmx++){
                if(hiddenWalls[dmx][0] == xCoordinate && hiddenWalls[dmx][1] == yCoordinate){
                    console.log('match');
                    return true;
                }
            }
            return false;
        };

        testHiddenWall(10,20);

        window.onkeydown = function(pressedKey){
            switch(pressedKey.keyCode){
                case 37: moveCharacterHorizontally(-1);break; //Pressed Left Arrow Key
                case 39: moveCharacterHorizontally(1);break; //Pressed Right Arrow Key
                case 38: moveCharacterVertically(-1);break; //Pressed Up Arrow Key
                case 40: moveCharacterVertically(1);break; //Pressed Bottom Arrow Key
            }
        }

        window.onkeyup = function(){
            changeCharacterAnimation('Idle_Cycle.gif')
        }

	});
})();
