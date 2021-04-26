import React from "react"
import Nav from "./Nav"
import proxy from "./Links"

function Login() {
	
	return (<div>
		<Nav function="Register" path="/register"/>
		<h1 class="text-center mt-4 mb-5">Welcome to Crypto Market Info</h1>
		<div class="row">
			<center>
				<div class="card col-lg-6 card-custom">
					<form class="form" action="/login" method="post">
						<center>
							<h4 class="mt-5 mp-3">Login to Access your Account</h4>
							<div class="col-lg-4 mt-4">
								<input class="form-control" name="username" placeholder="Enter Your Username"/><br />
								<input class="form-control" type="password" name="password" placeholder="Enter Your Password"/><br />
							</div>
							<button class="btn-dark btn">Login</button>
						</center>
					</form>
					<p class="text-center mt-3 mb-5">New User? <a href="/register">Register Here</a></p>
				</div>
			</center>
		</div>
	</div>);
}

export default Login;