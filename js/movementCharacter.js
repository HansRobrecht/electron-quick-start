

;(function() {
	'use strict';

	window.addEventListener('load', function() {

        document.getElementById('player').style.left = 5 + 'rem';
        document.getElementById('player').style.top = 5 + 'rem';

        let playerCycle;
        
        let moveCharacterHorizontally = function(xValues){
            const playerObject = document.getElementById('player');
            if(playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            playerObject.style.left = parseInt(playerObject.style.left) + xValues + 'rem';
        };

        let moveCharacterVertically = function(yValues){
            const playerObject = document.getElementById('player');
            if(playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            playerObject.style.top = parseInt(playerObject.style.top) + yValues + 'rem';
        }

        let changeCharacterAnimation = function(gifFile){
            const playerObject = document.getElementById('player');
            playerCycle = '../img/' + gifFile;
            playerObject.src = playerCycle;
        }

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
