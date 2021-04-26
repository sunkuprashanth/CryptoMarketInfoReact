import axios from "axios";
import React, {useState} from "react";
import Button from "./Button";
import {Route, IndexRoute} from "react-router";

function Header() {

	return (<Button path="/" label="Register" href="./register" />)
}

export default Header;