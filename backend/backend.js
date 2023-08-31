const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('form.sql');
var session = require('express-session');


// TODO example can be viewed at https://github.com/expressjs/express/blob/master/examples/auth/index.js

app.use(express.urlencoded({ extended: false }))
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    //TODO secret

    secret: 'shhhh, very secret'
}));

app.get('/', (req, res) => {
    // TODO send to login
    res.redirect("/login");
})

app.get('/form', (req, res) => {
    // TODO test
    //
    if(req.session.user){
        res.redirect('/');
    }
    const username = req.body.username;
    db.get("SELECT * FROM form WHERE username=?", username, (err, rows) => {
        res.json({rows});
    });
})

app.get('/testme', function(req, res){
    const result = db.run("SELECT * FROM form WHERE username=?", username);
    res.json({result});
});

app.get('/login', function(req, res){
    //TODO
    res.render('login');
});

app.get('/logout', function(req, res){
    //TODO
    res.render('login');
});

app.post('/login', function (req, res, next) {
    //TODO test
    if(req.session.user){
        res.redirect('/');
    }

    const username = req.body.username;
    let result = db.run("SELECT FROM form WHERE username=?", username);
    if(result === 0){
        res.send("Error");
    }

    const password = req.body.password;
    result = db.run("SELECT FROM form WHERE username=? AND password=?", [username, password]);
    if(result === 0){
        res.send("Error");
    }
    req.session.regenerate(function(){
        req.session.user = user;
    });
    res.status(200);
})

app.put('/total', function (req, res) {
    //TODO test the code 

    if(req.session.user){
        const total = req.body.oneplus;
        const username = req.session.user;
        db.run("UPDATE form SET plusone=? WHERE username=?", [total, username], (err, _) => {
            if(!err) res.status(201);
            else res.status(500);
        });
    }else{
        res.redirect('/login')
    }
})

app.put('/information', function (req, res) {
    // TODO test
    if(req.session.user){
        const information = req.body.information;
        const username = req.session.user;
        db.run("UPDATE form SET allergy=? WHERE username=?", [information, username], (err, _) => {
            if(!err) res.status(201);
            else res.status(500);
        });
        res.status(201)
    }else{
        res.redirect('/login')
    }
})

app.put('/attending', function (req, res) {
    // TODO test
    if(req.session.user){
        const attending = req.body.attending;
        const username = req.session.user;
        db.run("UPDATE form SET attending=? WHERE username=?", [attending, username], (err, _) => {
            if(!err) res.status(201);
            else res.status(500);
        });
    }else{
        res.redirect('/login')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
