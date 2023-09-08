const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("form.sql");
var session = require("express-session");
app.use(express.urlencoded({ extended: true }));

// TODO example can be viewed at https://github.com/expressjs/express/blob/master/examples/auth/index.js

app.use(express.json());
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    //TODO secret

    secret: "shhhh, very secret",
  })
);

app.get("/testme", function (req, res) {
  db.all("SELECT * FROM form;", [], (err, rows) => {
    res.json({ rows });
  });
});

app.get("/logout", function (req, res) {
  //TODO
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
          if (err) next(err)
          res.redirect('/')
        })
    })
});

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else res.send("Not logged in");
}

app.get("/lala", isAuthenticated, function (req, res) {
  console.log("lalla");
  res.send("hello");
});

app.post("/login", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  }

  const username = req.body.username;
  const password = req.body.password;
  console.table([username, password]);
  db.get("SELECT username FROM form WHERE username=?", username, (err, row) => {
    if (!row) {
      res.send("Error");
    }

    result = db.get(
      "SELECT username FROM form WHERE username=? AND password=?",
      [username, password],
      (err, row) => {

        if (!row) {
          res.send("Error");
        }
        req.session.user = username;
        req.session.save();
        res.status(200).send("Session saved");
      }
    );
  });
});

app.get('/form', isAuthenticated, (req, res) => {
    const username = req.session.user;
    if(username){
        db.get("SELECT attendance, allergy, plusone FROM form WHERE username=?;", username, (err, rows) => {
            res.json({rows});
        });
        return;
    }
    res.status(403).send();
});

app.post('/form', isAuthenticated, (req, res) => {
    const username = req.session.user;
    var {attendance, allergy, plusone} = req.body;
    attendance = Number(attendance)
    plusone = Number(plusone);
    
    console.log(attendance, allergy, plusone)
    db.run("UPDATE form SET attendance=?, allergy=?, plusone=? WHERE username=?", [attendance, allergy, plusone, username], (err) => {
        err ? res.status(500).send() : res.status(200).send();
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
