

;(function() {
    
        'use strict';
    
        window.addEventListener('load', function() {
            
            const retrieveMaxRecords = function(){
                const queryString = '?fields%5B%5D=MaxScore&fields%5B%5D=Username&maxRecords=5&sort%5B0%5D%5Bfield%5D=MaxScore&sort%5B0%5D%5Bdirection%5D=desc';
                fetch('https://api.airtable.com/v0/appAMnFrTLj28QYno/Profiles' + queryString, {
                            headers:{
                                'Authorization' : 'Bearer keyj9zMtJACYaD2uv'
                            }
                        })
                        .then(response => response.json())
                        .then(json => setupMaxScores(json))
            };

            const retrieveStatistics = function(){
                const inputEmail = document.getElementById('emailInput').value;
                console.log(inputEmail);
                const queryString = `?filterByFormula={Email}="${inputEmail}"`;
                fetch('https://api.airtable.com/v0/appAMnFrTLj28QYno/Profiles' + queryString, {
                            headers:{
                                'Authorization' : 'Bearer keyj9zMtJACYaD2uv'
                            }
                        })
                        .then(response => response.json())
                        .then(json => validateResults(json.records))
            };

            const validateResults = function(records){
                if(records.length !== 0){
                    const data = records[0].fields;
                    if(data.Password === document.getElementById('passwordInput').value){
                        processStatistics(data);
                    }
                    else{
                        document.getElementById('invalidPassword').style.display = 'inline-block';
                    }
                }
                else{
                    document.getElementById('invalidEmail').style.display = 'inline-block';
                }
            };

            const processStatistics = function(statistics){
                document.querySelector('table').style.display = 'inline-block';
                document.getElementById('usernamePlayer').innerText = statistics.Username;
                document.getElementById('totalGamesPlayer').innerText = statistics.TotalGames;
                document.getElementById('avgScorePlayer').innerText = statistics.MaxScore;
                document.getElementById('maxScorePlayer').innerText = Math.round(statistics.AverageScore * 100) / 100;
            };

            const setupMaxScores = function(records){
                const scoreBoard = document.querySelector('main .sideContent .scoreboard');
                let counter = 1;
                for(let record of records.records){
                    let topScorer = document.createElement('div');
                    topScorer.classList.add('top5');

                    let username = document.createElement('h3');
                    username.innerText = `${counter} - ` + record.fields.Username;

                    let score = document.createElement('p');
                    score.innerText = 'Score : ' +  record.fields.MaxScore;
                    topScorer.appendChild(username);
                    topScorer.appendChild(score);
                    scoreBoard.appendChild(topScorer);
                    counter++;
                }
            }

            retrieveMaxRecords();

            document.getElementById('searchStats').addEventListener('click', (e) =>{
                e.preventDefault();
                document.getElementById('invalidEmail').style.display = 'none';
                document.getElementById('invalidPassword').style.display = 'none';
                retrieveStatistics();
            });

        });

    })();