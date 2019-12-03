import React from 'react';
import './OverLay.css';

const Overlay = (props) => (
	<div onClick={props.clickHandler}>
		<div className='overlay'>
			{props.poster ? (
				<img
					src={props.poster}
					alt='movie-poster'
					style={{
						height: '98%',
						width: '100%',
						objectFit: 'cover'
					}}
				/>
			) : (
				''
			)}
			<div className='text-content'>
				<h1 className='title'>{props.title}</h1>
				<h2 className='description'>{props.description}</h2>
			</div>
		</div>
	</div>
);

export default Overlay;
