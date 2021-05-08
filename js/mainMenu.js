

;(function() {
    
    'use strict';

    window.addEventListener('load', function() {

        let temp = JSON.parse(window.sessionStorage.getItem('loggedUser'));
        console.log(temp);

    });
})();
