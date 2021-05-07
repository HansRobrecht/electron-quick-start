

;(function() {
    
        'use strict';
    
        window.addEventListener('load', function() {

            const validateForm = function(){
                //Need to remove last part and make it's own if-statement for better error message to user
                return (document.getElementById('email').value !== '' && document.getElementById('password').value !== '' && validateMail(document.getElementById('email').value.toLowerCase()));
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
                    console.log('Please fill all inputfields in');
                }
            }

            const createNewProfile = function(record){
                if(record.records !== undefined && record.records.length === 0){
                    if(validateMail(document.getElementById('email').value.toLowerCase())){
                        fetch('https://api.airtable.com/v0/appAMnFrTLj28QYno/Profiles', {
                            method: 'POST',
                            headers:{
                                'Authorization' : 'Bearer keyj9zMtJACYaD2uv',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "records": [{
                                    "fields": {
                                        "Email": document.getElementById('email').value.toLowerCase(),
                                        "Password": document.getElementById('password').value,
                                    }
                                }]  
                            })
                        })
                    }
                    else{
                        const error = document.getElementById('errorEmail');
                        error.style.display = 'inline';
                        error.innerHTML = 'This isn\'t a valid mail';
                    }
                    
                }
                else{
                    const error = document.getElementById('errorEmail');
                    error.style.display = 'inline';
                    error.innerHTML = 'This account already exists';
                }
            };

            const validateMail = function(mail){
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
                    return (true)
                }
                return (false)
            }

            const validatePassword = function(record){
                if(record.records.length !== 0){
                    const password = document.getElementById('password').value;
                    console.log(password + ' - ' + record.records[0].fields.Password);
                    if(password === record.records[0].fields.Password){
                        console.log('You\'re in');
                    }
                    else{
                        const error = document.getElementById('errorPassword');
                        error.style.display = 'inline';
                        error.innerHTML = 'Password doesn\'t match up with account';
                    }
                }
                else{
                    const error = document.getElementById('errorEmail');
                    error.style.display = 'inline';
                    error.innerHTML = 'This account doesn\'t exist';
                }
            };
        
            document.getElementById('login').addEventListener('click', (e) => {
                e.preventDefault();
                for(let error of document.querySelectorAll('.errorLabel')){
                    error.style.display = 'none';
                    error.innerHTML = '';
                }
                lookupProfile('login');
            })

            document.getElementById('sign up').addEventListener('click', (e) => {
                e.preventDefault();
                for(let error of document.querySelectorAll('.errorLabel')){
                    error.style.display = 'none';
                    error.innerHTML = '';
                }
                lookupProfile('signup');
            })
    
        });
})();
    