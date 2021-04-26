require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const path = require('path');
const passport = require("passport");
const session = require("express-session");
const passport_lcl_mongo = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const cors = require('cors')  // allows/disallows cross-site communication

const app = express();
const helmet = require('helmet') // creates headers that protect from attacks (security)
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

// --> Add this
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://shrouded-journey-38552.herokuapp.com', 'https://crypto-market-combo.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
// --> Add this
app.use(cors(corsOptions))

app.use(session({
	secret: "This is our Little Secret.",
	saveUninitialized: false,
	resave: false
}));

const userSchema = new mongoose.Schema({
	name : String,
	username: String,
	password: String,
	Cryptos: Array
});

userSchema.plugin(passport_lcl_mongo);	
userSchema.plugin(findOrCreate);

mongoose.connect(""+process.env.MONGO_DB_URL).then(()=> {
	userCollection = mongoose.model("user", userSchema);
	passport.use(userCollection.createStrategy());
	passport.serializeUser(function(user, done) {
		done(null, user.username);
	});
	passport.deserializeUser(userCollection.deserializeUser());
	console.log("connected to Mongodb");
}
);
mongoose.set('useCreateIndex', true);

app.use(passport.initialize());
app.use(passport.session());

var l_aarr =[];
var name = "";

app.post("/login", function(req, res) {

	const user_login = new userCollection({
		username: req.body.username,
		password: req.body.password
	});
	console.log(user_login);

	req.login(user_login, function(err) {
		if(err) {
			console.log(err);
			res.redirect("/");
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/home");
			});
		}
	});
});

app.route("/register")
	.post(function(req, res) {
		full_name = req.body.name;
		username = req.body.username;
		password = req.body.password;
		c_password = req.body.c_password;

		if (c_password === password) {
			new_user = new userCollection({
				name: full_name,
				username: username,
			});
			console.log(new_user, password);
			userCollection.register(new_user, password, function(err, user) {
				if(err) {
					console.log(err);
					res.redirect("/register");
				} else {
					passport.authenticate("local")(req, res, function () {
						name = full_name;
						res.redirect("/home",);
					})
				}
			});
		}
		else 
			res.redirect("/register");
	}
);

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/login");
	//res.send({});
});

app.post("/deleteCoin", function(req, res) {
	console.log();
	coin = req.body.coin_slug;
	ind = req.user.Cryptos.indexOf(coin);
	req.user.Cryptos = req.user.Cryptos.filter(c => {
		return c!==coin;
	})
	userCollection.findOneAndUpdate({username: req.user.username}, req.user, {upsert: true}, function(err, result) {
		if(err)
			console.log(err);
		else 
			console.log(result);
	});
	console.log(req.user.Cryptos);
	res.redirect("/home");
	//console.log(req.user.Cryptos);
});

app.post("/addCoin", function(req, res) {
	coin = req.body.coinSelected;
	console.log(coin);
	if (coin==="null" || req.user.Cryptos.includes(coin)) {
		res.redirect("/home");
		return;
	}
	req.user.Cryptos.push(coin);
	userCollection.findOneAndUpdate({username: req.user.username}, req.user, {upsert: true}, function(err, result) {
		if(err)
			console.log(err);
		else
			console.log(result);
	});
	res.redirect("/home");
});



app.get("/coins", function(req, response) {
	l_aarr=[];
	if (!req.isAuthenticated()) {
		response.send({auth:null});
	}
	Cryptos = req.user.Cryptos;
	leng = Cryptos.length;

	async function getCoinInfo(coin) {
		url="https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY="+process.env.API_KEY+"&slug="+coin+"&convert=inr";
		const res = await fetch(url);
		const json = await res.json();
		var value;  
		Object.keys(json.data).forEach(function(key) {
			value = json.data[key];
			l_aarr.push({
				id: value['id'],
				slug: coin,
				name: value['name'],
				symbol: value['symbol'],
				price: value['quote']['INR']['price'],
				market_supply: value['circulating_supply']
			});
		});
		console.log(coin, Cryptos, leng);
		if(l_aarr.length===leng) 
			response.send({auth:req.user, coins: l_aarr, name: req.user.name});
		return l_aarr;
	}
	if (leng===0)
		response.send({auth:req.user, "name":req.user.name, coins: []});

	Cryptos.forEach((coin)=>{
		console.log(getCoinInfo(coin));
	});
})


app.listen(process.env.PORT || 5000, function() {
	console.log("server Running at specified Port" + process.env.PORT);
})

app.get("/", (req, res) => {
	res.send({greet: "server working"});
})



// --> Add this
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080
app.listen(PORT, (req, res) => {
    console.log(`server listening on port: ${PORT}`)
  });
