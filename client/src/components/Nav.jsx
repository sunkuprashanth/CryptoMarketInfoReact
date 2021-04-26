import React from "react"

function Nav(props) {
	
	return (
		<nav class="row navbar navbar-light bg-secondary pt-3 pb-3">
			<div class="col-lg-6 m-4 mb-1 mt-1">
			<a class="navbar-brand">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cryptocurrency_Logo.svg/633px-Cryptocurrency_Logo.svg.png" alt="" width="30" height="30" class="d-inline-block align-text-top"/>
				Crypto Stats
			</a>
			</div>
			<div id="nav_header" class="col-lg-1">
				<a href={props.path} class="btn btn-dark mr-3">{props.function}</a>
			</div>
		</nav>
	)
}

export default Nav;