

;(function() {
    
        'use strict';
    
        window.addEventListener('load', function() {

            class Profile {
                constructor(id, email, password, username, totalGames, maxScore, avgScore){
                    this.id = id;
                    this.email = email;
                    this.password = password;
                    this.username = username;
                    this.totalGames = totalGames;
                    this.maxScore = maxScore;
                    this.avgScore = avgScore;
                }
            };

            const validateForm = function(){
                return (document.getElementById('email').value !== '' && document.getElementById('password').value !== '');
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
                    //console.log(password + ' - ' + record.records[0].fields.Password);
                    if(password === record.records[0].fields.Password){
                        processProfile(record);
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

            const lookupProfile = function(specificButton){
                if(validateMail(document.getElementById('email').value.toLowerCase())){
                    if(validateForm()){
                        const email = document.getElementById('email').value.toLowerCase();
                        let record;
                        //console.log(email);
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
                else{
                    const error = document.getElementById('errorEmail');
                    error.style.display = 'inline';
                    error.innerHTML = 'This isn\'t a valid mail';
                }
                
            }

            const createNewProfile = function(record){
                if(record.records !== undefined && record.records.length === 0){
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
                                        "Username": 'Guest',
                                        "TotalGames": 0,
                                        "MaxScore": 0, 
                                        "AverageScore": 0
                                    }
                                }]  
                            })
                        })
                        .then(record => record.json())
                        .then(json => processProfile(json))
                }
                else{
                    const error = document.getElementById('errorEmail');
                    error.style.display = 'inline';
                    error.innerHTML = 'This account already exists';
                }
            };

            const processProfile = function(record){
                const data = record.records[0].fields;
                let profile = new Profile(record.records[0].id, data.Email, data.Password, data.Username, data.TotalGames, data.MaxScore, data.AverageScore);
                window.sessionStorage.setItem('loggedUser', JSON.stringify(profile));
                window.location.href = 'mainMenu.html';
            }
        
            document.getElementById('login').addEventListener('click', (e) => {
                e.preventDefault();
                for(let error of document.querySelectorAll('.errorLabel')){
                    error.style.display = 'none';
                    error.innerHTML = '';
                }
                lookupProfile('login');
            })

            document.getElementById('signUp').addEventListener('click', (e) => {
                e.preventDefault();
                for(let error of document.querySelectorAll('.errorLabel')){
                    error.style.display = 'none';
                    error.innerHTML = '';
                }
                lookupProfile('signup');
            })
    
        });
})();
    