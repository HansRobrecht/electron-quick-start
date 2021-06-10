

;(function() {
    
        'use strict';
    
        window.addEventListener('load', function() {

            let toggleNavigation = false;

            function resizeEvent() {
                if (window.innerWidth >= 769) {
                    document.querySelector('header nav').style.display = 'flex';
                    toggleNavigation = false;
                }
                else{
                    document.querySelector('header nav').style.display = 'none';
                    document.getElementById('hamburgerButton').style.backgroundColor = '#f2dcb3';
                }
            }
            
            window.onload = window.onresize = resizeEvent;
    
            document.getElementById('hamburgerButton').addEventListener('click', ()=>{
                const navigation = document.querySelector('header nav');
                if(!toggleNavigation){
                    navigation.style.display = 'flex';
                    toggleNavigation = true;
                    document.getElementById('hamburgerButton').style.backgroundColor = '#f2b33d';
                }  
                else{
                    navigation.style.display = 'none';
                    toggleNavigation = false;
                    document.getElementById('hamburgerButton').style.backgroundColor = '#f2dcb3';
                }

            });

        });

    })();