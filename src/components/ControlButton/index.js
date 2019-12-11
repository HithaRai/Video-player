import React from 'react';
import PropTypes from 'prop-types';

import './ControlButton.css';
const ControlButton = (props) => (
	<div className='control-button-container' id='control_button_container'>
		<button id={props.id} className='custom-button' onClick={props.clickHandler} style={props.styleComponent}>
			{props.placeHolder}
		</button>
	</div>
);
ControlButton.propTypes = {
	id: PropTypes.string,
	clickHandler: PropTypes.func,
	placeHolder: PropTypes.string
};
ControlButton.defaultProps = {
	placeHolder: 'button',
	id: 'button',
	clickHandler: () => {}
};

export default ControlButton;
