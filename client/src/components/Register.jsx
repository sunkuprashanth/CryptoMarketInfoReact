import React from "react"
import Nav from "./Nav"
import Links from "./Links"

function Register() {
	
	return (<div>
		<Nav function="LogIn" path="/login"/>
		<h1 class="text-center mt-5 mb-5">Welcome to Crypto Market Info</h1>
		<div class="row">
		<center>
			<div class="card col-lg-6 pb-5 card-custom" >
				<form class="form" action="/register" method="post">
					<center>
						<h4 class="mt-5 mp-3">Register to Crypto Stats</h4>
						<div class="col-lg-4 mt-4">
							<input class="form-control" name="name" placeholder="Full Name"/><br/>
							<input class="form-control" name="username" placeholder="username"/><br/>
							<input class="form-control" type="password" name="password" placeholder="Password"/><br/>
							<input class="form-control" type="password" name="c_password" placeholder="Confirm Your Password"/><br/>
						</div>
						<button class="btn btn-dark">Register</button>
					</center>
				</form>
			</div>
		</center>
	</div>
	</div>
	);
}

export default Register;