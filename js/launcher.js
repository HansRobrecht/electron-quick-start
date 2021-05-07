

;(function() {
    
        'use strict';
    
        window.addEventListener('load', function() {

            const validateForm = function(){
                return (document.getElementById('email').value !== '' && document.getElementById('password').value !== '');
            };

            const lookupProfile = function(specificButton){
                if(validateForm()){
                    const email = document.getElementById('email').value.toLowerCase();
                    let record;
                    console.log(email);
                    fetch(`https://api.airtable.com/v0/appAMnFrTLj28QYno/Profiles?filterByFormula={Email}="${email}"`, {
                        headers:{
                            'Authorization' : 'Bearer keyj9zMtJACYaD2uv'
                        }
                    })
                    .then(response => response.json())
                    .then(json => specificButton === 'login' ? validatePassword(json) : createNewProfile(json))
                }
                else{
                    console.log('please fill all inputfields in');
                }
            }

            const createNewProfile = function(record){
                if(record.records.length === 0){
                    console.log('creating profile')
                }
            };

            const validatePassword = function(record){
                if(record.records.length !== 0){
                    console.log('checking profile');
                }
            };
        
            document.getElementById('login').addEventListener('click', (e) => {
                e.preventDefault();
                lookupProfile('login');
            })

            document.getElementById('sign up').addEventListener('click', (e) => {
                e.preventDefault();
                lookupProfile('signup');
            })
    
        });
})();
    