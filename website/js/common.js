

;(function() {

    // HET IS MOGELIJK OM VIA RECHTS EN ONDER BUITEN SCHERM TE LOPEN
    
        'use strict';
    
        window.addEventListener('load', function() {

            let toggleNavigation = false;
            
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

            const setupMaxScores = function(records){
                const scoreBoard = document.querySelector('main .sideContent');
                for(let record of records.records){
                    let topScorer = document.createElement('div');
                    topScorer.classList.add('top5');

                    let username = document.createElement('h3');
                    username.innerText = record.fields.Username;

                    let score = document.createElement('p');
                    score.innerText = 'Score : ' +  record.fields.MaxScore;
                    topScorer.appendChild(username);
                    topScorer.appendChild(score);
                    scoreBoard.appendChild(topScorer);
                }
            }

            function resizeEvent() {
                if (window.innerWidth >= 769) {
                    document.querySelector('header nav').style.display = 'flex';
                    toggleNavigation = false;
                }
                else{
                    document.querySelector('header nav').style.display = 'none';
                }
            }
            
            window.onload = window.onresize = resizeEvent;
    
            document.getElementById('hamburgerButton').addEventListener('click', ()=>{
                const navigation = document.querySelector('header nav');
                if(!toggleNavigation){
                    navigation.style.display = 'flex';
                    toggleNavigation = true;
                }  
                else{
                    navigation.style.display = 'none';
                    toggleNavigation = false;
                }

            });

            retrieveMaxRecords();

        });

    })();