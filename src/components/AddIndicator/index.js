import React from 'react';
import './AddIndicator.css';
const AddIndicator = (props) => (
	<span
		className='add-indicator'
		style={{
			left: props.left
		}}
	/>
);

export default AddIndicator;
