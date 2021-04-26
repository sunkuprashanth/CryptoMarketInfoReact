import axios from "axios";
import React, {useEffect, useState} from "react"
import CryptoView from "./CryptoView"
import Nav from "./Nav";
import Login from "./Login";

function Home() {
	
	var [coins_arr, setCoins_arr] = useState([]);
	var [fullName, setFullName] = useState("Customer");

	useEffect(() => {
			axios.get("/coins").then( (resp) => {
			setFullName(resp.data.name);
			console.log(resp.data.auth===null);
			if (resp.data.auth === null) {
				return <Login />;
			} else {
				var coins_data_arr = [];
				coins_data_arr = resp.data.coins;
				var leng=[];
				coins_data_arr.forEach(coins_data => {
					leng.push(<CryptoView name={coins_data.name} symbol={coins_data.symbol} 
						price={coins_data.price} market_supply={coins_data.market_supply} slug={coins_data.slug}/>);			
				});
				console.log(leng);
				setCoins_arr(leng);
			}
		});
	}, []);
	

	return (<div>
		<Nav function="Logout" path="/logout"/>
		<h2 class="text-center mt-2 mb-4">Welcome {fullName}</h2>
		<h4 class="text-center">{coins_arr.leng!==0? "Your Selected Crypto Currency Stats": null}</h4>
		<table class="row">{coins_arr}</table>
		<center>
			<form action="/addCoin" method="post" class="form mt-4 mb-5 pb-5">
				<p>Add Crypto to your Collection</p>
				<div class="row">
					<center>
						<div class="col-lg-4">
							<select class="form-select form-select-md col-lg-3" name="coinSelected" aria-label="Default select example">
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
						<button class="btn-dark btn mt-3 pl-4 pr-4">Add</button>
					</div>
				</div>
			</form>
		</center>
	</div>);
}

export default Home;