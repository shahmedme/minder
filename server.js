const express = require("express"),
  expressLayouts = require("express-ejs-layouts"),
  session = require("express-session");

const db = require("./db").config;

const dashboardRoute = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 5000;

db.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("database connection successful");
  }
});

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/dashboard", dashboardRoute);

// app.use(expressLayouts);
app.set("view engine", "ejs");

// GET REQUESTS
app.get("/", (req, res) => {
  if (req.session.email) {
    res.redirect("/dashboard");
  } else {
    res.render("welcome");
  }
});

app.get("/login", (req, res) => {
  if (req.session.email) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

app.get("/register", (req, res) => {
  if (req.session.email) {
    res.redirect("/dashboard");
  } else {
    res.render("register");
  }
});

// POST REQUESTS
app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if (result.length == 1) {
      if (email == result[0].email && password == result[0].password) {
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        res.redirect("/dashboard");
      }
    } else if (result.length == 0) {
      res.redirect("/register");
    } else {
      res.redirect("/");
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started at PORT no " + PORT);
});
