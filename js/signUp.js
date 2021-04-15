"use strict";

        let Email = document.getElementById("email").value;
        let Password = document.getElementById("password").value;

        let data = 
        {
            "records": 
            [{
                "fields": 
                {
                    "Email": Email,
                    "Password": Password,
                }
            }]
        };
        data = JSON.stringify(data);
        console.log("hello");

        sendPost(data);

    function sendPost(post)
    {
        fetch("https://api.airtable.com/v0/apprDH4W3EZTkap2r/Users",
        {
            method: "POST",
            headers: 
            {
                "Authorization": "Bearer keyJXkcYDuRJxxoQ6",
                "Content-Type": "application/json"
            },
            body: post

        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((err) => window.alert(err));
        
        console.log("dodo");
    }