const express = require("express");
const db = require("../db").config;
const router = express.Router();

// GET REQUESTS
router.get("/", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("dashboard", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/money-in", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("money-in", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.post("/money-in", (req, res) => {
	let amount = req.body.amount;
	let email = req.session.email;
	let currentBalanceQ = "SELECT balance from users WHERE email = ?";
	let updateBalanceQ = "UPDATE users SET balance = ? WHERE email = ?";

	db.query(currentBalanceQ, [email], (err, result) => {
		let newBalance = Number(result[0].balance) + Number(amount);
		db.query(updateBalanceQ, [newBalance, email], (err) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect("/dashboard");
			}
		});
	});
});

router.get("/money-out", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("money-out", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/money-transfer", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("money-transfer", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/buy-airtime", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("buy-airtime", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/vcard", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("vcard", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/history", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("history", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
});

router.get("/profile", (req, res) => {
	if (req.session.email) {
		let email = req.session.email;
		let password = req.session.password;
		let query = "SELECT * FROM users WHERE email = ? AND password = ?";

		db.query(query, [email, password], (err, result) => {
			let userObj = {
				firstname: result[0].first_name,
				lastname: result[0].last_name,
				email: result[0].email,
				balance: result[0].balance,
				reward: result[0].reward,
				limit: result[0].tran_limit,
			};
			res.render("profile", userObj);
		});
	} else {
		res.redirect("/login");
	}
});

// POST REQUESTS
router.post("/money-transfer", (req, res) => {
	let recieverEmail = req.body.email;
	let senderEmail = req.session.email;
	let amount = req.body.amount;
	let getRecieverInfoQ = "SELECT * FROM users WHERE email = ?";
	let updateRecieverBalanceQ = "UPDATE users SET balance = ? WHERE email = ?";
	let getSenderInfoQ = "SELECT * FROM users WHERE email = ?";
	let updateSenderBalanceQ = "UPDATE users SET balance = ? WHERE email = ?";

	db.query(getRecieverInfoQ, [recieverEmail], (err, result) => {
		let recieverNewBalance = Number(result[0].balance) + Number(amount);
		db.query(
			updateRecieverBalanceQ,
			[recieverNewBalance, recieverEmail],
			(err) => {
				if (err) {
					console.log(err);
				} else {
					db.query(getSenderInfoQ, [senderEmail], (err, result2) => {
						let senderNewBalance = Number(result2[0].balance) - Number(amount);
						db.query(
							updateSenderBalanceQ,
							[senderNewBalance, senderEmail],
							(err) => {
								if (err) {
									console.log(err);
								} else {
									res.redirect("/");
								}
							}
						);
					});
				}
			}
		);
	});
});

module.exports = router;
