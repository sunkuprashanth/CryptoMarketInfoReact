import React from "react";
import Home from "./Home"

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
				<button id="coin_slug" className="close btn btn-warning text-center mb-3 del_btn" onClick="" type="button" value={props.slug} aria-label="Close">
					Remove
				</button>
			</form>
		</div>
	)
}

export default CryptoView;