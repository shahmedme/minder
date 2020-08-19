// IMPORTING MODULE
const express = require("express"),
	expressLayouts = require("express-ejs-layouts"),
	session = require("express-session");
const db = require("./db").config;
const dashboardRoute = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 5000;

// DATABASE CONNECTION
db.connect(function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("database connection successful");
	}
});

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
	})
);

// DASHBOARD ROUTES
app.use("/dashboard", dashboardRoute);

// app.use(expressLayouts);

// HOMEPAGE
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

app.get("/register", (req, res) => {
	if (req.session.email) {
		res.redirect("/dashboard");
	} else {
		res.render("register");
	}
});

app.post("/register", (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;
	let query =
		"INSERT INTO users(email, password, first_name, last_name, balance, reward, tran_limit) VALUES(?, ?, ?, ?, ?, ?, ?)";

	db.query(
		query,
		[email, password, first_name, last_name, 0, 10, 0],
		(err, result) => {
			if (err) throw err;
			res.redirect("/login");
		}
	);
});

app.listen(PORT, () => {
	console.log("Server started at PORT no " + PORT);
});
