import axios from "axios";
import React, {useEffect, useState} from "react"
//import CryptoView from "./CryptoView"
import Nav from "./Nav";
import Login from "./Login";
import $ from "jquery";
import ReactDom from "react-dom"

function Home() {
	
	var [coins_arr, setCoins_arr] = useState([]);
	var [fullName, setFullName] = useState("Customer");

	
	function removeCoin(event) {
		console.log(coins_arr);
		const coin = event.target.value;
		 axios.post("/deleteCoin", {
			coin_slug: coin
		}).then( (resp) => {
			console.log(resp.data);
			// var leng = coins_arr;
			// console.log(coins_arr, leng);
			// ReactDom.render(leng, document.getElementById("coin_table"));
			// setCoins_arr(leng);
			axios.get("/coins").then( (resp) => {
					var coins_data_arr = [];
					coins_data_arr = resp.data.coins;
					var leng = [];
					coins_data_arr.forEach(coins_data => {
						leng.push(<CryptoView key={coins_data.id} name={coins_data.name} symbol={coins_data.symbol} 
							price={coins_data.price} market_supply={coins_data.market_supply} slug={coins_data.slug}/>);			
					});
					console.log(leng);
					ReactDom.render(leng, document.getElementById("coin_table"));
					setCoins_arr(leng);
					console.log(leng, coins_arr);
				
			});

		});
		
	}

	function addCoin() {
		var coin = $("#coinSelected").val();
		// console.log(coin)
		document.getElementById("coinSelected").selectedIndex = "0";
		console.log(coins_arr, coin);
		if (coin==="null") {
			return;
		}
		axios.post("/addCoin", {
			coinSelected: coin
		}).then( (resp) => {
			const coins_data = resp.data;
			var leng = coins_arr;
			const new_coin = <CryptoView key={coins_data.id} name={coins_data.name} symbol={coins_data.symbol} 
				price={coins_data.price} market_supply={coins_data.market_supply} slug={coins_data.slug}/>
			leng.push(new_coin);
			ReactDom.render(
				leng.filter((coin) => {
					return coin;
				})
				, document.getElementById("coin_table"))
			setCoins_arr(leng);
			console.log(coins_arr);
		});
	}

	useEffect(() => {
			axios.get("/coins").then( (resp) => {
				console.log(resp.data);
				setFullName(resp.data.name);
				console.log(resp.data.auth===undefined);
				if (resp.data.auth === undefined) {
					console.log("Lol");
					return <Login />;
				} else {
					var coins_data_arr = [];
					coins_data_arr = resp.data.coins;
					var leng = [];
					coins_data_arr.forEach(coins_data => {
						leng.push(<CryptoView key={coins_data.id} name={coins_data.name} symbol={coins_data.symbol} 
							price={coins_data.price} market_supply={coins_data.market_supply} slug={coins_data.slug}/>);			
					});
					console.log(leng);
					ReactDom.render(leng, document.getElementById("coin_table"));
					setCoins_arr(leng);
					console.log(leng, coins_arr);
				}
			});
	}, []);
	

		
	function CryptoView(props) {


		return (
			<div className="col-lg-3 card card-custom m-5">
				<div className="card-body">
				<h4 className="text-center pb-3">{props.name}</h4>
				<p className="card-text">Symbol:  {props.symbol}</p>
				<p className="card-text">Value:  {Math.floor(props.price)} INR</p>
				<p className="card-text pb-2">Market Supply:  {props.market_supply}</p>
				</div>
				<form className="form" method="POST" action="/deleteCoin">
					<button id="coin_slug" className="close btn btn-warning text-center mb-3 del_btn" onClick={removeCoin} type="button" value={props.slug} aria-label="Close">
						Remove
					</button>
				</form>
			</div>
		)
	}

	return (<div>
		<Nav function="Logout" path="/logout"/>
		<h2 class="text-center mt-2 mb-4">Welcome {fullName}</h2>
		<h4 class="text-center">{coins_arr.leng!==0? "Your Selected Crypto Currency Stats": null}</h4>
		<div class="row" id="coin_table"></div>
		<center>
			<form action="/addCoin" method="post" class="form mt-4 mb-5 pb-5">
				<p>Add Crypto to your Collection</p>
				<div class="row">
					<center>
						<div class="col-lg-4">
							<select class="form-select form-select-md col-lg-3" name="coinSelected" id="coinSelected" aria-label="Default select example">
								<option selected value="null">Open this select menu</option>
								<option value="bitcoin">Bitcoin</option>
								<option value="dogecoin">Dogecoin</option>
								<option value="basic-attention-token">Basic attention token</option>
								<option value="ethereum">Ethereum</option>
								<option value="litecoin">Litecoin</option>
								<option value="enjin-coin">Enjin Coin</option>
								<option value="binance-coin">Binance Coin</option>
								<option value="ripple">Ripple</option>
								<option value="bitcoin-cash">Bitcoin Cash</option>
							</select>
						</div>
					</center>
					<div>
						<button class="btn-dark btn mt-3 pl-4 pr-4" id="addCoin" onClick={addCoin} type="button">Add</button>
					</div>
				</div>
			</form>
		</center>
	</div>);
}

export default Home;