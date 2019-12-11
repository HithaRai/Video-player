import React from 'react';
import './OverLay.css';
const overlayStyles = {
	height: '100%',
	width: '100%',
	objectFit: 'cover'
};
const Overlay = (props) => (
	<div onClick={props.clickHandler}>
		<div className='overlay' id='overlay'>
			{props.poster && <img src={props.poster} alt='movie-poster' style={overlayStyles} />}
			<div className='overlay_text_content' id='overlay-text-content'>
				<h1 className='overlay-title' id='overlay_title'>
					{props.title}
				</h1>
				<h2 className='overlay-description' id='overlay_description'>
					{props.description}
				</h2>
			</div>
		</div>
	</div>
);

export default Overlay;
