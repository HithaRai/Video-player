import React from 'react';
import './ControlButton.css';
const ControlButton = (props) => (
	<div id='controlButtonContainer'>
		<button id={props.id} className='custom-button' onClick={props.clickHandler} style={props.styleComponent}>
			{props.placeHolder}
		</button>
	</div>
);

export default ControlButton;
