import React from 'react-dom'
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import axios from 'axios';

function RouterFunc() {

	return (
	<div className="App">
		<Router>
			<Switch>
			<Route path="/" exact component={() => <Login />} />
			<Route path="/login" exact component={() => <Login />} />
			<Route path="/register" exact component={() => <Register />} />
			<Route path="/home" exact component={() => <Home />} />
			<Route path="/logout" exact component={() => {
				axios.get("/logout").then(() => console.log("Logged Out"));
				return <Login />
			}} />
			</Switch>
		</Router>
	</div>
	);
}

export default RouterFunc;

// export default (<Route path="/" component={Login}>
// 	<Route path="/register" component={Register} />
// 	<Route path="/home" component={Home}/>
// 	</Route>
// );