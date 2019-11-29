import React from 'react';
import VideoPlayer from './index';

export default { title: 'VideoPlayer' };
export const withoutVideoSrc = () => <VideoPlayer />;
export const withVideoSrc = () => <VideoPlayer src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' />;
export const withVideo_title_and_description = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
	/>
);
export const withVideo_title_and_description_autoplay = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={true}
	/>
);
export const Video_with_autoplay_without_ControlBar = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={true}
		isControls={false}
	/>
);
export const Video_without_autoplay_without_ControlBar = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={false}
	/>
);

export const Video_without_autoplay_with_ControlBar_and_Configurations_defaults = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '600px',
			left: '0px',
			right: '0px',
			top: '0px',
			bottom: '0px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '20px',
			minHeight: '100px',
			maxHeight: '600px'
		}}
	/>
);
export const Video_without_autoplay_with_ControlBar_and_Configurations_width_maxHeight_and_minheight_changed = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '800px',
			left: '0px',
			right: '0px',
			top: '0px',
			bottom: '0px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '20px',
			minHeight: '200px',
			maxHeight: '400px'
		}}
	/>
);

export const Video_without_autoplay_with_ControlBar_and_Configurations_with_positioning = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			left: '200px',
			top: '200px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '20px',
			minHeight: '200px',
			maxHeight: '500px'
		}}
	/>
);

export const Video_without_autoplay_with_ControlBar_and_Configurations_iconColor_ControlBarBgColor_changed = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			left: '100px',
			top: '100px',
			iconColor: 'black',
			controlBarBgColor: '#037F8C',
			fontSize: '20px',
			seekBarColor: 'red',
			minHeight: '200px',
			maxHeight: '500px'
		}}
	/>
);
export const Video_without_autoplay_with_ControlBar_and_Configurations_seekbar_color_changed = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '20px',
			seekBarColor: 'blue',
			minHeight: '200px',
			maxHeight: '500px'
		}}
	/>
);

export const Video_without_autoplay_with_ControlBar_and_Configurations_controlbar_seekbar_color_changed = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '900px',
			left: '100px',
			top: '100px',
			iconColor: 'black',
			controlBarBgColor: '#037F8C',
			fontSize: '20px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '400px'
		}}
	/>
);

export const Video_without_autoplay_with_ControlBar_and_Configurations_of_icon_color_controlbar_seekbar_color_and_font_size_changed = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '900px',
			left: '100px',
			top: '100px',
			iconColor: '#037F8C',
			controlBarBgColor: 'black',
			fontSize: '30px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '400px'
		}}
	/>
);

export const Video_with_one_Ad = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		adSrc={{
			url: [ 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' ],
			showSkipAdEnable: 5,
			skippable: true
		}}
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '600px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '22px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '700px'
		}}
	/>
);

export const Video_with_Ad_and_skipAd_enabled_after_10seconds = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		adSrc={{
			url: [ 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' ],
			showSkipAdEnable: 10,
			skippable: true
		}}
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '600px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '22px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '700px'
		}}
	/>
);
export const Video_with_Ad_and_skipAd_disabled_first_AD_at_equally_divided_time = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		adSrc={{
			url: [ 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' ],
			skippable: false
		}}
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '600px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '22px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '700px'
		}}
	/>
);
export const Video_with_Ad_and_skipAd_enabled_after_5secs_first_AD_at_0_seconds = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		adSrc={{
			url: [ 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' ],
			skippable: true,
			showSkipAdAfter: 5,
			firstAdOccurence: 0
		}}
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '25px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '600px'
		}}
	/>
);
export const Video_with_Ad_and_skipAd_enabled_after_5secs_first_AD_at_20_seconds = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		adSrc={{
			url: [ 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' ],
			skippable: true,
			showSkipAdAfter: 5,
			firstAdOccurence: 20
		}}
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '25px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '600px'
		}}
	/>
);

export const Video_with_array_of_Ad_and_skipAd_enabled_after_5secs_first_AD_at_0_seconds = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		adSrc={{
			url: [
				'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
				'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
				'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
				'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
				'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
				'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
			],
			skippable: true,
			showSkipAdAfter: 5,
			firstAdOccurence: 0
		}}
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			left: '100px',
			top: '100px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			fontSize: '25px',
			seekBarColor: 'red',
			minHeight: '300px',
			maxHeight: '600px'
		}}
	/>
);
