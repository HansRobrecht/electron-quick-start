

;(function() {
    
    'use strict';

    window.addEventListener('load', function() {

        let profile = JSON.parse(window.sessionStorage.getItem('loggedUser'));

        const setupPlayerStatistics = function(){
            document.getElementById('username').innerText = profile.username;
            document.getElementById('gameCount').innerText = profile.totalGames;
            document.getElementById('avgScore').innerText = Math.round(profile.avgScore * 100) / 100;
            document.getElementById('maxScore').innerText = profile.maxScore;
        };  
        setupPlayerStatistics();
    });
})();
