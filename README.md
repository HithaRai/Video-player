This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
### Usage
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
| src              |Url     |''             |Url of the video to be played of mp4 or m3u8 format only|
| adSrc            |Object  | -             |Object containing advertisement details-with url(mandatory),skippable,showSkipAdAfter,firstAdOccurence as keys|
|->(key) url          |Array     |''             |Array of URLs of the Advertisement videoes to be played of mp4 or m3u8 format only(preferably duration less than 1 minute)|
|->(key) skippable        |Boolean |true           |Whether the Ad can be skippede or not|
|->(key)showSkipAdAfter  |Number   |5              |If it is a skippable Ad,then the skip can be enabled after this time|
|->(key)firstAdOccurence |Number   |0              |First Ad can be played at this instance of time of the main video|
| title            |String   |''             |Title of the video to be displayed in pause state|
| description      |String   |''             |description of the video to be displayed in pause state|
| poster           |Url      |''             |poster of the video to be displayed in pause state|
| isAutoPlay            |Boolean   |false           |Whether autoplay should be enabled or not|
| isControls          |Boolean   |true           |Wheter the control panel should be visible or not|
| onPlay            |Function   |function=()=>{console.log('Video is playing')}           |Callback funtion at the start of the video after pause|
| onEnded            |Function   |function=()=>{console.log('Video ended')}            |Callback funtion at the end of the video|
| onPause            |Function   |function=()=>{console.log('Video paused')}           |Callback funtion while the video is paused|
| onDoubleClickCapture            |Function   |function=()=>{console.log('Double click captured')}            |Callback funtion on double click capture|
| configurations            |Object   |  {width: '600px',left: '0px',right: '0px',top: '0px',bottom: '0px',iconColor: 'white',controlBarBgColor: 'black',seekBarColor: 'red',fontSize: '20px',minHeight: '100px',maxHeight: '600px'}         |Configurations to change the width and positioning of the video player and to change the colour of the seek bar, control panel and the icons|
|->(key) width        |Number(px)/String(px,%) |  600         |changes the width of the video player|
|->(key) left        |Number(px)/String(px,%) |0           ||
|->(key) right        |Number(px)/String(px,%) |0           ||
|->(key) top        |Number(px)/String(px,%) |0           ||
|->(key) bottom        |Number(px)/String(px,%) |0           ||
|->(key) iconColor        |String |'white'           |changes the icon colour of the control panel|
|->(key) controlBarBgColor        |String |'black'           |changes the control bar colour of the control panel|
|->(key) seekBarColor        |String |'red'           |changes the seek bar colour|
|->(key) fontSize        |Number(px)/String(px,%) |20           |changes the font of the icon|
|->(key) minHeight        |Number(px)/String(px,%) |100           |sets the minimum height to the video player|
|->(key) maxHeight        |Number(px)/String(px,%) |600           |sets the maximum height to the video player|



