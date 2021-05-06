

;(function() {
	'use strict';

	window.addEventListener('load', function() {

        let hiddenWalls = new Array();
        let captureGrounds = new Array();
        let playerCycle;

        let defaultCaptureGroundColor ='gray';
        let [lastSolidOne, lastSolidTwo] = [defaultCaptureGroundColor, defaultCaptureGroundColor];
        let lastCaptureAttempt;
        let transitionTimerOne;
        let transitionTimerTwo;
        let transitionCounterOne = 0;
        let transitionCounterTwo = 0;
        let timerGoingOne = false;
        let timerGoingTwo = false;

        //TempCode to position player in topleft corner
        document.getElementById('player').style.left = 5 + 'rem';
        document.getElementById('player').style.top = 5 + 'rem';

        let singleCall = function(){
            generateHiddenWalls();
            generateCaptureFields();
            //loopingCode();
        };

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
                field.style.backgroundColor = 'gray';
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
            let gotMatch = false;
            for(let dmx = 0; dmx < captureGrounds.length; dmx++){
                if(captureGrounds[dmx][0] == xCoordinate && captureGrounds[dmx][1] === yCoordinate){
                    checkCaptureGroundColor(teamColor, captureGrounds[dmx][2]);
                    gotMatch = true;
                    lastCaptureAttempt = captureGrounds[dmx][2];
                    break;
                }
            }
            if(!gotMatch){
                //Prevents activation in case there wasn't an attempt to capture a ground yet
                if(lastCaptureAttempt !== undefined){
                    controlCaptureGround(lastCaptureAttempt);
                }
            }
        }; 

        let controlCaptureGround = function(captureGroundId){

            let captureGroundColor = document.getElementById(captureGroundId).style.background;

            //In case false -> Ground was completely captured, nothing should be done while exiting
            //In case true -> Ground wasn't completely captured 
            if(!(captureGroundColor === 'blue' || captureGroundColor === 'red')){
                //CaptureGroundColor should return to last solid color => Either red/blue if those claimed it last or gray when never claimed
                //Counter should be reset so colorTransitions are working
                switch(captureGroundId){
                    case 'captureGround1': clearInterval(transitionTimerOne); timerGoingOne = false; transitionCounterOne = 0; document.getElementById(captureGroundId).style.background = lastSolidOne; break;
                    case 'captureGround2' : clearInterval(transitionTimerTwo); timerGoingTwo = false; transitionCounterTwo = 0; document.getElementById(captureGroundId).style.background = lastSolidTwo;break;
                }
            }
        };

        //Checks whether captureGround isn't getting captured yet -> Color should be gray
        //Then extra check for solidColor (red || blue) and opposite to teamColor that entered, yes : activate capturing mechanic
        let checkCaptureGroundColor = function(teamColor, captureGroundId){

            const captureGround = document.getElementById(captureGroundId);
            let allowCapturing = false;

            //First Check whether one field is already being captured
            if((captureGroundId === 'captureGround1' && !timerGoingOne) || (captureGroundId === 'captureGround2' && !timerGoingTwo)){
                //True -> Start capturing
                if(captureGround.style.backgroundColor === 'gray'){
                    allowCapturing = true;
                }
                //If ground already captured, additional check to see whether entering team is opposite to the last team that captured the ground
                else if((captureGround.style.backgroundColor === 'blue' && teamColor === 'teamRed') || (captureGround.style.backgroundColor === 'red' && teamColor === 'teamBlue')){
                    allowCapturing = true;
                }    
            }   
            
            if(allowCapturing){
                switch(captureGroundId){
                    case 'captureGround1': transitionTimerOne = setInterval(captureGroundTransitionColor, 2000, teamColor, captureGroundId); timerGoingOne = true; break;
                    case 'captureGround2' : transitionTimerTwo =  setInterval(captureGroundTransitionColor, 2000, teamColor, captureGroundId); timerGoingTwo = true; break;
                }
            }
        };

        let captureGroundTransitionColor = function(teamColor, captureGroundId){

            let redColorTransition =  ['#CE6766', '#C92208', '#B8300B', '#AD201A', 'red'];
            let blueColorTransition = ['#40DAF5', '#1CCDFF', '#35A7DB', '#3584E6', 'blue'];
            let timerGoing;
            
            //Addtional check for still capturing if for some reason interval occurs again after leaving ground
            switch(captureGroundId){
                case 'captureGround1': timerGoing = timerGoingOne; break;
                case 'captureGround2': timerGoing = timerGoingTwo; break;
            }

            console.log('switching colors');

            //Internal control of the timer, will stop loop if ground completely captured
            if((document.getElementById(captureGroundId).style.backgroundColor === 'blue' && teamColor === 'teamBlue') || (document.getElementById(captureGroundId).style.backgroundColor === 'red' && teamColor === 'teamRed')){
                switch(captureGroundId){
                    case 'captureGround1': clearInterval(transitionTimerOne); timerGoingOne = false; lastSolidOne = teamColor.substring(4);break;
                    case 'captureGround2' : clearInterval(transitionTimerTwo); timerGoingTwo = false; lastSolidTwo = teamColor.substring(4); break;
                }
            }
            else{
                //Use of previously set copy of timers in case of unintentional activation
                if(timerGoing){
                    if(teamColor === 'teamBlue'){
                        switch(captureGroundId){
                            case 'captureGround1': document.getElementById(captureGroundId).style.background = blueColorTransition[transitionCounterOne]; transitionCounterOne++; break;
                            case 'captureGround2' : document.getElementById(captureGroundId).style.background = blueColorTransition[transitionCounterTwo]; transitionCounterTwo++; break;
                        }
                    }
                    else{
                        switch(captureGroundId){
                            case 'captureGround1': document.getElementById(captureGroundId).style.background = redColorTransition[transitionCounterOne]; transitionCounterOne++; break;
                            case 'captureGround2' : document.getElementById(captureGroundId).style.background = redColorTransition[transitionCounterTwo]; transitionCounterTwo++; break;
                        }
                    }
                }  
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
