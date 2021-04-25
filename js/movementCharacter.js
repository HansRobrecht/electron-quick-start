

;(function() {
	'use strict';

	window.addEventListener('load', function() {

        let hiddenWalls = new Array();
        let captureGrounds = new Array();
        let gameIsRunning = true;
        let transitionTimer;
        let colorGradientCounter = 0;
        let transitionTimerGoing = false;
        let playerCycle;
        let lastCapturedGround;

        //TempCode to position player in topleft corner
        document.getElementById('player').style.left = 5 + 'rem';
        document.getElementById('player').style.top = 5 + 'rem';

        let singleCall = function(){
            generateHiddenWalls();
            generateCaptureFields();
            //loopingCode();
        };
        
        let loopingCode = async function(){
            let counter = 0;
            while(gameIsRunning){
                console.log(counter++);
                //gameIsRunning = (counter < 100);
            }
        }

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
                        testCapture(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top), playerObject.classList.value);
                        playerObject.style.left = parseFloat(playerObject.style.left) + parseFloat(xValues)/2 + 'rem';
                    }
                }
                else if(xValues < 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left)-0.5, parseFloat(playerObject.style.top))){
                        testCapture(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top), playerObject.classList.value);
                        playerObject.style.left = parseFloat(playerObject.style.left) + parseFloat(xValues)/2 + 'rem';
                    }
                }
            }  
        };

        let moveCharacterVertically = function(yValues){
            const playerObject = document.getElementById('player');
            //console.log(playerObject.style.left + ' - ' + playerObject.style.top);
            if(playerCycle !== '../img/Running_Cycle.gif'){
                changeCharacterAnimation('Running_Cycle.gif');
            }
            if(!(parseFloat(playerObject.style.top) < 0 && yValues < 0) && !(parseFloat(playerObject.style.top) > (window.outerHeight/10) && yValues > 0)){
                if(yValues > 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top)+0.5)){
                        testCapture(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top), playerObject.classList.value);
                        playerObject.style.top = parseFloat(playerObject.style.top) + yValues/2 + 'rem';
                    }
                }
                else if(yValues < 0){
                    if(!testHiddenWall(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top)-0.5)){
                        testCapture(parseFloat(playerObject.style.left), parseFloat(playerObject.style.top), playerObject.classList.value);
                        playerObject.style.top = parseFloat(playerObject.style.top) + yValues/2 + 'rem';
                    }
                }
                
            }  
        };

        //Changes characterImg based on given fileLocation
        let changeCharacterAnimation = function(gifFile){
            const playerObject = document.getElementById('player');
            playerCycle = '../img/' + gifFile;
            playerObject.src = playerCycle;
        };


        //Generates array of coordinates based on img of the class wall
        let generateHiddenWalls = function(){
            const walls = document.querySelectorAll('.wall');
            console.log(walls);
            for(let wall of walls){
                let leftPosition = wall.offsetLeft/10;
                let topPosition = wall.offsetTop/10;
                //console.log(leftPosition);
                //console.log(topPosition);
                for(let dmx = 0; dmx < wall.clientWidth/10; dmx++){
                    for(let xmd = 0; xmd < wall.clientHeight/10; xmd++){
                        hiddenWalls.push([(leftPosition + dmx/2),(topPosition + xmd/2)]);
                        hiddenWalls.push([(leftPosition + dmx/2),(topPosition - xmd/2)]);
                        hiddenWalls.push([(leftPosition - dmx/2),(topPosition - xmd/2)]);
                        hiddenWalls.push([(leftPosition - dmx/2),(topPosition + xmd/2)]);
                        //console.log(`[${dmx} - ${wall.clientHeight/10}] = [${xmd} - ${wall.clientWidth/10}]`);
                        //xmd = xmd + 0.5;
                    }
                    //dmx = dmx + 0.5;
                }
            }
            //console.table(hiddenWalls);
        };

        //Tests whether a coordinate is lying in the hiddenWall area and returns boolean
        let testHiddenWall = function(xCoordinate, yCoordinate){
            //console.log(xCoordinate + ' - ' + yCoordinate);
            if(hiddenWalls.length === 0){
                //hiddenWalls.push([7,5], [10,21], [10,22]);
            }
            for(let dmx = 0; dmx < hiddenWalls.length; dmx++){
                if(hiddenWalls[dmx][0] == xCoordinate && hiddenWalls[dmx][1] == yCoordinate){
                    //console.log('match');
                    return true;
                }
            }
            return false;
        };

        //Generates array of coordinates based on div of the class captureField
        let generateCaptureFields = function(){
            const fields = document.querySelectorAll('.captureGround');
            console.log(fields);
            for(let field of fields){
                let leftPosition = field.offsetLeft/10;
                let topPosition = field.offsetTop/10;
                //console.log(leftPosition);
                //console.log(topPosition);
                for(let dmx = 0; dmx < field.clientWidth/10; dmx++){
                    for(let xmd = 0; xmd < field.clientHeight/10; xmd++){
                        captureGrounds.push([(leftPosition + dmx/2),(topPosition + xmd/2), field.id]);
                        captureGrounds.push([(leftPosition + dmx/2),(topPosition - xmd/2), field.id]);
                        captureGrounds.push([(leftPosition - dmx/2),(topPosition - xmd/2), field.id]);
                        captureGrounds.push([(leftPosition - dmx/2),(topPosition + xmd/2), field.id]);
                        //console.log(`[${dmx} - ${wall.clientHeight/10}] = [${xmd} - ${wall.clientWidth/10}]`);
                        //xmd = xmd + 0.5;
                    }
                    //dmx = dmx + 0.5;
                }
            }
            //console.table(captureGrounds);
        };

        //Tests whether a coordinate is lying in a captureField
        let testCapture = function(xCoordinate, yCoordinate, teamColor){
            //console.log(xCoordinate + ' - ' + yCoordinate);
            for(let dmx = 0; dmx < captureGrounds.length; dmx++){
                if(captureGrounds[dmx][0] == xCoordinate && captureGrounds[dmx][1] == yCoordinate){    
                    console.log('Capturing');
                    transitionCaptureGroundColor(teamColor, true, captureGrounds[dmx][2]);
                    break;
                }
                else{
                    transitionCaptureGroundColor(teamColor, false, captureGrounds[dmx][2]);
                }
            }
        }; 

        let transitionCaptureGroundColor = function(teamColor, stillCapturing, specificCaptureGround){
            const captureGround = document.getElementById(specificCaptureGround);
            let lastCapture;
            let colorGradientCounter = 0;   
            if(stillCapturing && !transitionTimerGoing){
                transitionTimer = setInterval(transitionColor, 2000, teamColor, captureGround);
                transitionTimerGoing = true;
            }
            if(!stillCapturing && !(captureGround.style.backgroundColor === 'blue' || captureGround.style.backgroundColor === 'red') && captureGround.style.backgroundColor !== 'gray'){
                console.log('resetting counter');
                clearInterval(transitionTimer);
                captureGround.style.backgroundColor = 'gray';
                transitionTimerGoing = false;
                colorGradientCounter = 0;
            }
            lastCapture = teamColor;
        };

        let transitionColor = function(teamColor, specificCaptureGround){
            //console.log(colorGradientCounter);
            let redColorTransition =  ['#CE6766', '#C92208', '#B8300B', '#AD201A', 'red'];
            let blueColorTransition = ['#40DAF5', '#1CCDFF', '#35A7DB', '#3584E6', 'blue'];
            //console.log(redColorTransition[colorGradientCounter]);
            if((specificCaptureGround.style.backgroundColor === 'blue' || specificCaptureGround.style.backgroundColor === 'red')){
                clearInterval(transitionTimer);
                colorGradientCounter = 0;
            }
            else{
                if(teamColor === 'blueTeam'){
                    //console.log('changing color blue');
                    specificCaptureGround.style.backgroundColor = blueColorTransition[colorGradientCounter];
                }
                else{
                    //console.log('changing color red');
                    specificCaptureGround.style.backgroundColor = redColorTransition[colorGradientCounter];
                }
                colorGradientCounter++;
            }       
        };


        //Single call of code to setup arrays, etc

        singleCall();

        //Event Handlers

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
