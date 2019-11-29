import React, { Component } from 'react';
import VideoPlayer from 'containers/VideoPlayer';
import './VideoContainer.css';

class VideoContainer extends Component {
	render() {
		return (
			<div>
				<VideoPlayer
					src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
					addSrc={{
						url: [
							'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
							'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
							// 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
							// 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
							// 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
							// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
							// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
							'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
						],
						showSkipAdEnable: 5,
						skippable: true
					}}
					description='This is a demo video of m3u8 format '
					poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
					title='Playing First Video'
					isAutoPlay={false}
					isControls={true}
					configurations={{
						width: '300px',
						minHeight: '100px',
						maxHeight: '700px',
						// left: '100px',
						// right: '20px',
						// top: '100px',
						// bottom: '20px',
						iconColor: 'white',
						controlBarBgColor: 'black',
						seekBarColor: 'red',
						fontSize: '20px'
					}}
				/>
			</div>
		);
	}
}

export default VideoContainer;
