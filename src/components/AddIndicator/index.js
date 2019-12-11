import React from 'react';
import './AddIndicator.css';
const AddIndicator = (props) => (
	<span
		className='add_indicator'
		id='add-indicator'
		style={{
			left: props.left
		}}
	/>
);
AddIndicator.propTypes = {
	left: propTypes.string
};

export default AddIndicator;
