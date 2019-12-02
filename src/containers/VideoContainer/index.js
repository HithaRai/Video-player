import React, { Component } from 'react';
import VideoPlayer from 'containers/VideoPlayer';
import './VideoContainer.css';

class VideoContainer extends Component {
	render() {
		return (
			<div>
				<VideoPlayer
					src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
					adSrc={{
						url: [ 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' ]
					}}
				/>
			</div>
		);
	}
}

export default VideoContainer;
