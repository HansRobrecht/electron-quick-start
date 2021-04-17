'use strict'

document.getElementById('signUp').addEventListener('click', (e) =>{
    e.preventDefault();
    sendPost()
});

function sendPost()
{
    alert('jo');
    const express = require('express');
    const path = require('path');
    const mysql = require('mysql2/promise');
    const bodyParser = require('body-parser');
    const hbs = require('hbs');
    const fetch = require('node-fetch');

    const app = express();
    const port = 3000;
    const config = {
        host: 'localhost',
        user:'Master',
        password: 'Azerty123*',
        database: 'Castle_Siege'
    };

    const publicDirectory = path.join(__dirname, 'public');
    const viewsDirectory = path.join(__dirname, 'views');
    const partialsDirectory = path.join(__dirname, 'views/partials');


    app.set('view engine', 'hbs');
    app.set('views', viewsDirectory);
    app.use(bodyParser.json());
    app.use(express.static(publicDirectory));
    hbs.registerPartials(partialsDirectory);
    hbs.registerHelper('scoreEvaluation', function(value) {
        return parseInt(value) < 5;
    });

        
    async function get() {
        const conn = await mysql.createConnection(config);
        const [rows] = await conn.query('SELECT * FROM feedback');
        //console.log(rows);
        await conn.end();
        return rows;
    }


    app.get('/', (req, res) => {
        let rows = new Array();
        fetch('http://localhost:3000/feedback')
            .then(response => response.json())
            //.then(response => console.log(response))
            .then(data => rows = data)
            .then(console.log(rows))
            .then(feedback => res.render('index', {
                feedback
                })
            )
    });

    app.get('/feedback', async (req, res) => {
        const conn = await mysql.createConnection(config);
        const [rows] = await conn.query('SELECT * FROM feedback');
        //console.log(rows);
        await conn.end();
        res.json(rows);
    });

    app.post('/feedback', async (req, res) => {
        console.log(req);
        const body = req.body;
        if(
            !body.hasOwnProperty('course_name') ||
            !body.hasOwnProperty('feedback') || 
            !body.hasOwnProperty('score')
        ){
            return res.send({
                error: 'Invalid input data',
                status: 422
            });
        }
        const conn = await mysql.createConnection(config);
        const query = 'INSERT INTO feedback(course_name, feedback, score) VALUES (?,?,?)'
        const [results] = await conn.query(query, [body.course_name, body.feedback, body.score]);
        await conn.end();
        res.json(results);
    });

    app.put('/feedback/:id', async (req, res) => {
        const body = req.body;
        const conn = await mysql.createConnection(config);
        const query = 'UPDATE feedback SET course_name = ?, feedback = ?, score = ? WHERE id = ?';
        const [results] = await conn.query(query, [body.course_name, body.feedback, body.score, req.params.id]);
        await conn.end();
        res.json(results);
    });

    app.delete('/feedback/:id', async (req, res) => {
        const conn = await mysql.createConnection(config);
        const query = 'DELETE FROM feedback WHERE id = ?';
        const [results] = await conn.query(query, [`${parseInt(req.params.id)}`]);
        await conn.end();
        res.json(results);
    });

        
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}