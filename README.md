This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<h1 align='center'>
  React-video-player
</h1>

<p align='center'>
  A React component for playing  mp4 and m3U8 format videoes using Hls.js , with advertisements at diffrent intervals of time. This component is  customisable per user requirements.
</p>

### Usage

```bash
npm install react-video-player --save
# or
yarn add react-video-player
```
The most basic react-video-player can be described with:
```js
import React, { Component } from 'react';
import VideoPlayer from 'containers/VideoPlayer';

class VideoContainer extends Component {
	render() {
		return (
			<div>
				<VideoPlayer src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' />
			</div>
		);
	}
}

export default VideoContainer;
```
The basic react-video-player with advertisement can be implemented with :
```js
import React, { Component } from 'react';
import VideoPlayer from 'containers/VideoPlayer';

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

```

### Properties 

| Props            |Type     | Default Value | Description |
| :--------------- |:-----   | :-------------| :----------|
| `src`              |Url     |''             |Url of the video to be played of mp4 or m3u8 format only|
| `adSrc`            |Object  | -             |Object containing advertisement details-with url(mandatory),skippable,showSkipAdAfter,firstAdOccurence as keys|
|->(key) `url`          |Array     |''             |Array of URLs of the Advertisement videoes to be played of mp4 or m3u8 format only(preferably duration less than 1 minute)|
|->(key) `skippable`        |Boolean |true           |Whether the Ad can be skippede or not|
|->(key)`showSkipAdAfter`  |Number   |5              |If it is a skippable Ad,then the skip can be enabled after this time|
|->(key)`firstAdOccurence` |Number   |0              |First Ad can be played at this instance of time of the main video|
| `title`            |String   |''             |Title of the video to be displayed in pause state|
| `description`      |String   |''             |description of the video to be displayed in pause state|
| `poster`           |Url      |''             |poster of the video to be displayed in pause state|
|`isAutoPlay`            |Boolean   |false           |Whether autoplay should be enabled or not|
| `isControls`          |Boolean   |true           |Whether the control panel should be visible or not|
| `forward_rewind_time`          |Number   |10           |changes the forward and rewing time interval of the player|
| `onPlay`            |Function   |function=()=>{console.log('Video is playing')}           |Called when media starts or resumes playing after pausing or buffering|
| `onEnded`            |Function   |function=()=>{console.log('Video ended')}            |Callback funtion at the end of the video|
| `onPause`            |Function   |function=()=>{console.log('Video paused')}           |Callback funtion while the video is paused|
| `onDoubleClickCapture`            |Function   |function=()=>{console.log('Double click captured')}            |Callback funtion on double click capture|
| `configurations`            |Object   |  {width: '600px',left: '0px',right: '0px',top: '0px',bottom: '0px',iconColor: 'white',controlBarBgColor: 'black',seekBarColor: 'red',fontSize: '20px',minHeight: '100px',maxHeight: '600px'}         |Configurations to change the width and positioning of the video player and to change the colour of the seek bar, control panel and the icons|
|->(key) `width`        |Number(px)/String(px,%) |  600         |changes the width of the video player|
|->(key) `left`        |Number(px)/String(px,%) |0           ||
|->(key) `right`      |Number(px)/String(px,%) |0           ||
|->(key) `top`        |Number(px)/String(px,%) |0           ||
|->(key) `bottom`        |Number(px)/String(px,%) |0           ||
|->(key) `iconColor`        |String |'white'           |changes the icon colour of the control panel|
|->(key)  `controlBarBgColor`       |String |'black'           |changes the control bar colour of the control panel|
|->(key) `seekBarColor`        |String |'red'           |changes the seek bar colour|
|->(key) `fontSize`        |Number(px)/String(px,%) |20           |changes the font of the icon|
|->(key) `minHeight`        |Number(px)/String(px,%) |100           |sets the minimum height to the video player|
|->(key) `maxHeight`        |Number(px)/String(px,%) |600           |sets the maximum height to the video player|


| Key            |Options | 
| :--------------|:-------|
|`adSrc`|`url`:Array of URLs of the Advertisement videoes to be played of mp4 or m3u8 format only(preferably duration less than 1 minute)
`skippable`:Whether the Ad can be skippede or not
`showSkipAdAfter`:If it is a skippable Ad,then the skip can be enabled after this time
`firstAdOccurence`:First Ad can be played at this instance of time of the main video
|`configurations`|`width`:changes the width of the video player`left`:overrides default player left positioning`right`:overrides default player right positioning`top`:overrides default player top positioning`bottom`:overrides default player bottom positioning`iconColor`:overrides default player iconColor positioning`controlBarBgColor`:overrides default player controlBarBgColor positioning`seekBarColor`:overrides default player seekBarColor positioning`fontSize`:overrides default player fontSize positioning`minHeight`:overrides default player minHeight positioning`maxHeight`:overrides default player maxHeight positioning|
