

;(function() {

// HET IS MOGELIJK OM VIA RECHTS EN ONDER BUITEN SCHERM TE LOPEN

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
            //console.log(playerObject.style.left + ' - ' + playerObject.style.top);
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
            console.table(hiddenWalls);
        };

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

        generateHiddenWalls();

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


//PROJECTILES

(function() {
			
    "use strict";
    
    var canvasWidth = body.width;
    var canvasHeight = body.height;
    var canvas = null;
    var bounds = null;
    var mouseX = 0.0;
    var mouseY = 0.0;
    
    var player = {
        x: (canvasWidth * 0.5) | 0,
        y: (canvasHeight * 0.5) | 0,
        dx: 0.0,
        dy: 0.0,
        angle: 0.0,
        radius: 17.5,
        
        tick: function() {
            this.angle = Math.atan2(mouseY - this.y,mouseX - this.x);
        },
    };
    
    var bullet = {
        x: (canvasWidth * 0.5) | 0,
        y: (canvasHeight * 0.5) | 0,
        dx: 0.0,
        dy: 0.0,
        radius: 5.0,
        
        tick: function() {
            this.x += this.dx;
            this.y += this.dy;
            
            if (this.x + this.radius < 0.0
            ||	this.x - this.radius > canvasWidth
            ||	this.y + this.radius < 0.0
            || 	this.y - this.radius > canvasHeight)
            {
                this.dx = 0.0;
                this.dy = 0.0;
            }
        },
    };
    
    function loop() {
        // Tick
        bullet.tick();
        player.tick();
        bullet.render();
        //
        requestAnimationFrame(loop);
    }
    


    let changeCharacterAnimation = function(gifFile){
        const playerObject = document.getElementById('player');
        playerCycle = '../img/' + gifFile;
        playerObject.src = playerCycle;
    };



    window.onmousedown = function(e) {
        // The mouse pos - the player pos gives a vector
        // that points from the player toward the mouse
        var x = mouseX - player.x;
        var y = mouseY - player.y;
        
        // Using pythagoras' theorm to find the distance (the length of the vector)
        var l = Math.sqrt(x * x + y * y);
        
        // Dividing by the distance gives a normalized vector whose length is 1
        x = x / l;
        y = y / l;
        
        // Reset bullet position
        bullet.x = player.x;
        bullet.y = player.y;
        
        // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
        bullet.dx = x * 10.0;
        bullet.dy = y * 10.0;
    }
    
    window.onmousemove = function(e) {
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;
    }
    
    window.onload = function() {
        canvas = document.getElementById("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        bounds = canvas.getBoundingClientRect();
        loop();
    }

})();
