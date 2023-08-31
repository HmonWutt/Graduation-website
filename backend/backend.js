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

app.get("/", (req, res) => {
  // TODO send to login
  res.redirect("/login");
});


app.get("/testme", function (req, res) {
  db.all("SELECT * FROM form;", [], (err, rows) => {
    res.json({ rows });
  });
});

app.get("/login", function (req, res) {
  //TODO
  res.send("In loggin");
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
  console.log("authenticate");
  console.log("session authenticate", req.session.user);

  if (req.session.user) next();
  else res.send("Not logged in");
}

app.get("/lala", isAuthenticated, function (req, res) {
  console.log("lalla");
  res.send("hello");
});

app.post("/login", function (req, res, next) {
  //TODO test
  if (req.session.user) {
    res.redirect("/");
  }
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;
  console.table([username, password]);
  db.get("SELECT username FROM form WHERE username=?", username, (err, row) => {
    console.log("username", row);
    if (!row) {
      res.send("Error");
    }

    console.log("passed first");

    result = db.get(
      "SELECT username FROM form WHERE username=? AND password=?",
      [username, password],
      (err, row) => {
        console.log("password", row);
        console.log("passed second");

        if (!row) {
          res.send("Error");
        }
        req.session.regenerate(function () {
          req.session.user = username;
          console.log(req.session);
        });
        req.session.save();
        res.status(200);
      }
    );
  });
});

app.get('/form', (req, res) => {
    // TODO test
    //
    if(req.session.user){
        const username = req.body.username;
        db.get("SELECT * FROM form WHERE username=?", username, (err, rows) => {
            res.json({rows});
        });
    }
    res.send(403)
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
  console.log(`Example app listening on port ${port}`);
});
