

;(function() {
    
        'use strict';
    
        window.addEventListener('load', function() {

            const lookupProfile = function(){
                const email = document.getElementById('email').value;
                fetch('http://localhost:3000/feedback')
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .then(data => rows = data)
                    .then(console.log(rows))
            }

            document.getElementById('login').addEventListener('click', (e) => {
                e.preventDefault();
                window.test();
            })

            document.getElementById('sign up').addEventListener('click', (e) => {
                e.preventDefault();
                lookupProfile()
            })
    
        });
})();
    