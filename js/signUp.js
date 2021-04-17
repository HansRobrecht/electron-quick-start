;(function() {
	'use strict';

    const fetch = require('electron-fetch').default

	window.addEventListener('load', function() {

        let postMessage = function(){

            let data = {
                "records": [{
                    "fields":{
                        "Email": 'Test',
                        "Password": 'TestPassword'
                    }
                }]
            };

            fetch('https://api.airtable.com/v0/apprDH4W3EZTkap2r/Users', {
                method: 'POST',
                    headers: {
                        'Authorization' : 'Bearer keyJXkcYDuRJxxoQ6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json => displayMessages(json));
        };

        postMessage();

	});
})();
