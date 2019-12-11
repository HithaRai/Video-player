import React, { Component } from 'react';
import VideoPlayer from '../../containers/VideoPlayer';
import './VideoContainer.css';

class VideoContainer extends Component {
	render() {
		return (
			<div>
				<VideoPlayer
					src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
					adSrc={{
						url: [
							'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
							'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
							'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
							'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
							'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
						],
						skippable: true,
						showSkipAdAfter: 5,
						firstAdOccurence: 20
					}}
					title='Playing First Video'
					description='This is a demo video of m3u8 format '
					forward_rewind_time={5}
					isAutoPlay={false}
					isControls={true}
					configurations={{
						width: 700,
						left: 100,
						top: 100,
						iconColor: 'white',
						controlBarBgColor: 'black',
						fontSize: '25px',
						seekBarColor: 'red',
						minHeight: 300,
						maxHeight: 600
					}}
				/>
			</div>
		);
	}
}

export default VideoContainer;
