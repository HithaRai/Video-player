import React from 'react';
import VideoPlayer from './index';

export default { title: 'VideoPlayer' };
export const withVideo = () => <VideoPlayer src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' />;
export const withVideo_title_and_description = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		title='Playing First Video'
		description='This is a demo video of m3u8 format '
	/>
);
export const withVideoAdvertisement = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10
		}}
	/>
);
export const withVideoAdvertisement_Title_Description_Poster = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
	/>
);

export const withAutoplayEnabled = () => (
	<VideoPlayer src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' isAutoPlay={true} />
);

export const withAutoplayAndAd = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={true}
		isControls={true}
	/>
);
export const withAutoplay_And_AdTimeOfOccurence_is_25Secs = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 25,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={true}
	/>
);
export const withControlsDisabled_and_ad_at_10th_sec = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		adSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={true}
		isControls={false}
	/>
);

export const withVideo_Style_configurations_with_ad = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '600px',
			minHeight: '300px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			seekBarColor: 'red'
		}}
	/>
);

export const withVideo_Style_configurations_width_700_minHeight_400_changed = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			minHeight: '400px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			seekBarColor: 'red'
		}}
	/>
);

export const withVideo_Style_configurations_seek_bar_color_changed_to_blue = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 25,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			minHeight: '400px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'black',
			controlBarBgColor: 'white',
			seekBarColor: 'blue'
		}}
	/>
);
export const withVideo_control_bar_background_changed_to_037F8C_icon_color_is_white = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			minHeight: '400px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'white',
			controlBarBgColor: '#037F8C',
			seekBarColor: 'red'
		}}
	/>
);

export const withVideo_Style_configurations_control_bar_background_037F8C_changed_icon_color_black = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={true}
		configurations={{
			width: '700px',
			minHeight: '400px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'black',
			controlBarBgColor: '#037F8C',
			seekBarColor: 'red'
		}}
	/>
);

export const withVideo_Style_configurations_control_bar_background_changed_icon_color_black_seekBar_black = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={true}
		isControls={true}
		configurations={{
			width: '700px',
			minHeight: '400px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'black',
			controlBarBgColor: '#037F8C',
			seekBarColor: 'black'
		}}
	/>
);

export const withVideo_fwd_rewind_time_changed_to_20 = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		addSrc={{
			url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
			timeOfOccurence: 10,
			showSkipAdEnable: 10
		}}
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		FWD_REV_TIME={20}
		isAutoPlay={true}
		isControls={true}
		configurations={{
			width: '700px',
			minHeight: '400px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'black',
			controlBarBgColor: '#037F8C',
			seekBarColor: 'red'
		}}
	/>
);
export const withVideo_poster_without_autoplay_and_controls_withoutAd = () => (
	<VideoPlayer
		src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
		description='This is a demo video of m3u8 format '
		poster='https://www.themarysue.com/wp-content/uploads/2016/02/sale_3342_special_banner_background.jpg'
		title='Playing First Video'
		isAutoPlay={false}
		isControls={false}
		configurations={{
			width: '600px',
			minHeight: '300px',
			left: '100px',
			right: '200px',
			top: '100px',
			bottom: '200px',
			iconColor: 'white',
			controlBarBgColor: 'black',
			seekBarColor: 'red'
		}}
	/>
);
