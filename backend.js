const express = require('express')
const app = express()
const port = 3000

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
    // TODO send all sql information
    // figure out which user
})

app.get('/login', function(req, res){
    //TODO
    res.render('login');
});

app.post('/login', function (req, res, next) {
    //TODO login 

    const username = req.body.username;
    const password = req.body.password;

    res.send('Got a POST request')
})

app.put('/total', function (req, res) {
    //TODO if logged in 
    //set the size to the input give
    //else restrict the url for only logged in
    const total = req.body.oneplus;

    res.send('Updated');
})

app.put('/information', function (req, res) {
    // TODO add additional information to the backend allergy column
    const total = req.body.information;

    res.send('Updated');
})

app.put('/attending', function (req, res) {
    // TODO 
    const total = req.body.attending;

    res.send('Updated');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
