import React, {useState} from "react";

function Button(props) {

	return (<a href={props.href} className="btn btn-dark mr-3">{props.show}</a>)
}

export default Button;