import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlButton from '../../components/ControlButton';
import AddIndicator from '../../components/AddIndicator';
import './VideoPlayer.css';
import { Icon } from 'antd';
import moment from 'moment';
import Overlay from '../../components/OverLay';
import cx from 'classnames';
import Hls from 'hls.js';

class VideoPlayer extends Component {
	state = {
		isPlayStatus: false,
		isVolume: false,
		isControlsVisibility: false,
		initialTime: '',
		timeInsecs: '',
		isAddPlayed: false,
		addPassed: false,
		isAdVideoFetched: false,
		timeStop: '',
		skipAdAfter: 5,
		isSkipAdd: false,
		skippable: false,
		timeOfOccurence: '',
		initialData: false,
		allOccurences: [],
		adIndex: 0
	};
	static propTypes = {
		forward_rewind_time: PropTypes.number,
		isAutoPlay: PropTypes.bool,
		isControls: PropTypes.bool,
		className: PropTypes.string,
		src: PropTypes.string,
		adSrc: PropTypes.object,
		description: PropTypes.string,
		poster: PropTypes.string,
		title: PropTypes.string,
		onEnded: PropTypes.func,
		onPlay: PropTypes.func,
		onPause: PropTypes.func,
		onDoubleClickCapture: PropTypes.func,
		configurations: PropTypes.object
	};

	playPauseHandler = () => {
		this.state.isPlayStatus ? this.myVideo.pause() : this.myVideo.play();
		this.setState((prevState) => ({ isPlayStatus: !prevState.isPlayStatus }));
	};
	timeIncrementHandler = () => {
		this.myVideo.currentTime += this.props.forward_rewind_time;
	};

	timeDecrementHandler = () => {
		this.myVideo.currentTime -= this.props.forward_rewind_time;
	};

	audioHandler = () => {
		this.myVideo.muted = !this.myVideo.muted;
		this.setState((prevState) => ({
			isVolume: !prevState.isVolume
		}));
	};
	screenResizeHandler = () => {
		if (this.myVideo.requestFullscreen) {
			this.myVideo.requestFullscreen();
		} else if (this.myVideo.mozRequestFullScreen) {
			this.myVideo.mozRequestFullScreen();
		} else if (this.myVideo.webkitRequestFullscreen) {
			this.myVideo.webkitRequestFullscreen();
		} else this.myVideo.msRequestFullscreen();

		this.myVideo.controls = false;
	};

	getTime = (givenSeconds) => moment.utc(givenSeconds * 1000).format('HH:mm:ss');

	onProgressClick = (e) => {
		let viewportOffset = this.myVideo.getBoundingClientRect();
		let percent = (e.clientX - viewportOffset.left) / e.currentTarget.clientWidth;
		this.myVideo.currentTime = percent * this.myVideo.duration;
		this.progressBarHandler();
	};

	bufferBarHandler = () => {
		let duration = this.myVideo.duration;

		if (duration > 0) {
			for (let i = 0; i < this.myVideo.buffered.length; i++) {
				if (
					this.myVideo.buffered.start(this.myVideo.buffered.length - 1 - i) < this.myVideo.currentTime &&
					this.bufferBar
				) {
					this.bufferBar.style.width = `${this.myVideo.buffered.end(this.myVideo.buffered.length - 1 - i) /
						duration *
						100}%`;
					break;
				}
			}
		}
	};
	checkVideoEnded = () => {
		if (this.myVideo.ended) {
			this.fetchVideo(this.props.src);
			if (this.props.isControls)
				this.props.configurations.seekBarColor
					? (this.ProgressBar.style.backgroundColor = this.props.configurations.seekBarColor)
					: (this.ProgressBar.style.backgroundColor = 'red');
			if (this.props.adSrc && this.props.isControls) this.AdIndicator.style.display = 'block';
			this.props.adSrc
				? this.setState({
						addPassed: true,
						skippable: false,
						isSkipAdd: false
					})
				: this.setState({
						addPassed: false,
						skippable: false,
						isSkipAdd: false
					});
		}
	};
	progressBarHandler = () => {
		let duration = this.myVideo.duration;
		if (duration > 0 && this.props.isControls && !this.state.isAddPlayed) {
			this.ProgressBar.style.width = `${this.myVideo.currentTime / duration * 100}%`;
			this.ProgressBarInd.style.left = `${this.myVideo.currentTime / duration * 100}%`;
		}
		this.timeDisplayHandler();
		this.adFetchHandler();
		this.checkVideoEnded();
	};

	timeDisplayHandler = () => {
		let currentTime = this.getTime(this.myVideo.currentTime),
			totalTime = this.getTime(this.myVideo.duration),
			presentTime;
		if (totalTime === 'Invalid date') presentTime = `${currentTime}  /  ${this.state.totalTime}`;
		else presentTime = `${currentTime}  /  ${totalTime}`;
		this.setState(
			{
				initialTime: presentTime,
				timeInsecs: Math.floor(this.myVideo.currentTime),
				totalTime: totalTime
			},
			() => {
				return !this.state.initialData ? this.initialCalculations() : '';
			}
		);
	};

	controlVisibilityHandler = (status) => {
		this.setState({
			isControlsVisibility: status
		});
	};

	videoOnLoadHandler = () => {
		if (this.state.isAdVideoFetched) {
			if (this.myVideo.duration > 61) console.warn('ad is too long');
		}
		this.timeDisplayHandler(this.myVideo.duration);
	};

	beforeAdFetch = () => {
		const { addPassed, isAddPlayed, isAdVideoFetched, timeInsecs, allOccurences } = this.state;
		return addPassed && !isAddPlayed && !isAdVideoFetched && allOccurences.includes(timeInsecs);
	};

	adFetchHandler = () => {
		if (this.beforeAdFetch()) {
			let index = this.state.adIndex;
			this.state.adIndex === this.props.adSrc.url.length - 1 ? (index = 0) : (index = index + 1);
			this.setState(
				{
					timeStop: this.myVideo.currentTime,
					skippable: this.props.adSrc.skippable,
					adIndex: index
				},
				this.fetchAdVideo(this.state.adIndex)
			);
		}
		if (this.state.isAdVideoFetched) {
			if (this.state.timeInsecs >= this.state.skipAdAfter) {
				this.setState({
					isSkipAdd: true
				});
			}
		}
	};

	fetchAdVideo = (index) => {
		this.fetchVideo(this.props.adSrc.url[index]);
		if (this.props.adSrc && this.props.isControls) {
			this.ProgressBar.style.backgroundColor = 'yellow';
			this.AdIndicator.style.display = 'none';
			this.player.style.pointerEvents = 'none';
		}

		this.setState(
			{
				isAddPlayed: false,
				isPlayStatus: false,
				isAdVideoFetched: true,
				skipAdAfter: this.props.adSrc.showSkipAdEnable ? this.props.adSrc.showSkipAdEnable : 5,
				timeInsecs: 0
			},
			this.playPauseHandler
		);
	};
	onScreenIncDec_OverlayHandler = () => {
		const { isControlsVisibility, isAdVideoFetched, isAddPlayed, isPlayStatus, timeInsecs } = this.state;
		const styleIconOnScreen = {
			fontSize: '50px',
			color: this.props.configurations.iconColor,
			outline: 'none'
		};
		return this.props.isControls && isPlayStatus ? isAddPlayed ? (
			<div />
		) : (
			<div
				className={`videoPlayer_animate  ${isControlsVisibility && !isAdVideoFetched
					? 'visible'
					: 'hidden videoPlayer_inc_dec'} `}
				id='videoPlayer-on-screen-inc-dec'
			>
				<div className='videoPlayer_child_inc_dec videoPlayer_decrement' id='videoPlayer-child-inc-dec'>
					<Icon type='backward' onClick={this.timeDecrementHandler} style={styleIconOnScreen} />
				</div>
				<div className='videoPlayer_child_inc_dec videoPlayer_increment'>
					<Icon type='forward' onClick={this.timeIncrementHandler} style={styleIconOnScreen} />
				</div>
			</div>
		) : !isPlayStatus ? isAdVideoFetched ? (
			<div />
		) : (
			<Overlay
				title={this.props.title}
				description={this.props.description}
				poster={timeInsecs === 0 ? this.props.poster : ''}
				clickHandler={this.playPauseHandler}
			/>
		) : (
			<div />
		);
	};

	handleAdSkipButton = () => {
		let { timeInsecs, skipAdAfter, skippable } = this.state;
		return skippable ? (
			<div className='videoPlayer_skip'>
				<div onClick={this.handleAdSkip}>
					Skip Ad {timeInsecs < skipAdAfter ? `in ${skipAdAfter - timeInsecs}` : ''}
					<div className='videoPlayer_skip_forward'>
						{<Icon type='step-forward' style={{ ...this.iconStyle, fontSize: '18px' }} />}
					</div>
				</div>
			</div>
		) : (
			<div />
		);
	};
	handleAdSkip = () => {
		if (this.state.isSkipAdd) {
			this.myVideo.currentTime = this.myVideo.duration;
		}
	};

	renderAdIndicator = () => {
		return this.props.adSrc ? (
			<div
				className='videoPlayer_renderAdIndicator'
				id='videoPlayer-renderAdIndicator'
				ref={(AdIndicator) => {
					this.AdIndicator = AdIndicator;
				}}
			>
				{this.state.allOccurences.map(
					(time) =>
						time !== undefined ? (
							<AddIndicator key={Math.random()} left={`${(time + 1) / this.myVideo.duration * 100}%`} />
						) : (
							''
						)
				)}
			</div>
		) : (
			<div />
		);
	};
	renderControlsVisibility = () => {
		return 'videoPlayer_animate ' + (this.state.isControlsVisibility ? 'visible' : 'hidden') + ' controlBar';
	};
	renderControlBar = () => {
		return (
			<div
				id='player-content'
				className='videoPlayer_player_content'
				style={{ backgroundColor: this.controlBarBgColor }}
			>
				<div className='videoPlayer_buffered' id='videoPlayer-buffered'>
					<span
						id='videoPlayer-buffered-amount'
						className='videoPlayer_buffered_amount'
						ref={(bufferBar) => {
							this.bufferBar = bufferBar;
						}}
					/>
				</div>
				<div className='videoPlayer_progress' id='videoPlayer-progress' onClick={this.onProgressClick}>
					<span
						id='videoPlayer-progress-amount'
						className='videoPlayer_progress_amount'
						ref={(progressBar) => {
							this.ProgressBar = progressBar;
						}}
						style={{ backgroundColor: this.props.configurations.seekBarColor }}
					>
						{<div />}
						<div
							className='videoPlayer_progress_amount_indicator'
							id='videoPlayer-progress-amount-indicator'
							ref={(progressBarInd) => {
								this.ProgressBarInd = progressBarInd;
							}}
						/>
						<div>{this.renderAdIndicator()}</div>
					</span>
				</div>
			</div>
		);
	};

	renderControlBarButtons = () => {
		const { iconColor, controlBarBgColor, fontSize } = this.props.configurations;

		const iconStyle = {
			color: iconColor,
			backgroundColor: controlBarBgColor,
			fontSize: fontSize
		};
		return (
			<div>
				<ControlButton
					id='play'
					clickHandler={this.playPauseHandler}
					placeHolder={
						this.state.isPlayStatus ? (
							<Icon type='pause' style={iconStyle} />
						) : (
							<Icon type='play-circle' style={iconStyle} />
						)
					}
					styleComponent={{
						backgroundColor: controlBarBgColor
					}}
				/>
				<ControlButton
					id='dec'
					clickHandler={this.timeDecrementHandler}
					placeHolder={<Icon type='backward' style={iconStyle} />}
					styleComponent={{
						backgroundColor: controlBarBgColor
					}}
				/>
				<ControlButton
					id='inc'
					clickHandler={this.timeIncrementHandler}
					placeHolder={<Icon type='forward' style={iconStyle} />}
					styleComponent={{
						backgroundColor: controlBarBgColor
					}}
				/>
				<div
					id='time-display'
					className='videoPlayer_time_display'
					style={{
						backgroundColor: controlBarBgColor,
						color: iconColor
					}}
				>
					{this.state.initialTime}
				</div>
				<span className='videoPlayer_right_controls' id='videoPlayer-right-controls'>
					<ControlButton
						clickHandler={this.audioHandler}
						placeHolder={
							this.state.isVolume ? (
								<Icon type='stop' style={iconStyle} />
							) : (
								<Icon type='sound' style={iconStyle} />
							)
						}
						styleComponent={{
							backgroundColor: controlBarBgColor
						}}
					/>
					<ControlButton
						clickHandler={this.screenResizeHandler}
						placeHolder={<Icon type='fullscreen' style={iconStyle} />}
						styleComponent={{
							backgroundColor: controlBarBgColor
						}}
					/>
				</span>
			</div>
		);
	};
	setTime = (autoPlayStatus) => {
		if (this.state.addPassed && this.state.isAdVideoFetched) {
			this.myVideo.currentTime = this.state.timeStop + 1;

			if (this.props.isControls) this.player.style.pointerEvents = 'auto';
			this.setState(
				{
					isPlayStatus: false,
					isAddPlayed: false,
					isAdVideoFetched: false
				},
				this.playPauseHandler
			);
		} else {
			this.myVideo.currentTime = 0;
			this.setState(
				{
					isPlayStatus: true,
					isAddPlayed: false
				},
				this.playPauseHandler
			);
		}

		if (autoPlayStatus) {
			this.playPauseHandler();
		}
	};

	fetchVideo = (source, autoPlayStatus = false) => {
		let hls = '';
		if (Hls.isSupported() && !source.includes('.mp4')) {
			try {
				if (hls !== '') {
					hls.destroy();
				}
				hls = new Hls();
				hls.loadSource(source);
				hls.attachMedia(this.myVideo);
				hls.on(Hls.Events.ERROR, function(event, data) {
					if (data.details === 'bufferAppendError') {
						hls.destroy();
					}
				});
			} catch (e) {
				console.log(`error caught at fetchVideo function in VideoPlayer componen : ${e}`);
			}
		} else {
			if (hls !== '') {
				hls.destroy();
			}
			this.myVideo.src = source;
			this.myVideo.type = 'video/mp4';
		}

		this.setTime(autoPlayStatus);
	};

	initialCalculations = () => {
		const noOfAdVideoes = Math.round(this.myVideo.duration / 300),
			occurenceTime = this.myVideo.duration / (noOfAdVideoes + 1);
		let allOccurences = [];
		if (this.state.addPassed) allOccurences.push(this.props.adSrc.firstAdOccurence);

		for (let i = 1; i < (allOccurences[0] === undefined ? noOfAdVideoes + 1 : noOfAdVideoes); i++) {
			allOccurences.push(Math.round(occurenceTime * i));
		}

		this.setState({
			initialData: true,
			noOfAdVideoes,
			occurenceTime,
			allOccurences
		});
	};
	componentDidMount() {
		if (this.props.src) {
			if (this.props.isAutoPlay && !this.state.isPlayStatus) {
				this.fetchVideo(this.props.src, true);
			} else {
				this.fetchVideo(this.props.src);
			}
		}
		if (this.props.adSrc) {
			this.setState({
				addPassed: true
			});
		}
	}
	renderClassName = () => cx([ this.props.className, 'videoPlayer_common_video' ]);
	render() {
		const {
			iconColor,
			controlBarBgColor,
			fontSize,
			minHeight,
			maxHeight,
			seekBarColor,
			...STYLE_CONFIG
		} = this.props.configurations;

		return (
			<div
				id='player'
				className='videoPlayer_player'
				onMouseOver={this.controlVisibilityHandler.bind(this, true)}
				onMouseOut={this.controlVisibilityHandler.bind(this, false)}
				style={STYLE_CONFIG}
			>
				{this.onScreenIncDec_OverlayHandler()}

				<video
					id={this.props.id}
					ref={(video) => {
						this.myVideo = video;
					}}
					className={this.renderClassName()}
					onLoadedData={this.loadedData}
					autoPlay={!this.props.isAutoPlay}
					onProgress={this.bufferBarHandler}
					onTimeUpdate={this.progressBarHandler}
					onCanPlayThrough={this.videoOnLoadHandler}
					onClick={this.playPauseHandler}
					onEnded={this.props.onEnded}
					onPlay={this.props.onPlay}
					onPause={this.props.onPause}
					onDoubleClickCapture={this.props.onDoubleClickCapture}
					style={this.props.adSrc ? { minHeight: minHeight, maxHeight } : { minHeight: minHeight }}
				/>

				{this.handleAdSkipButton()}
				{this.props.isControls && (
					<div
						className={this.renderControlsVisibility()}
						ref={(player) => {
							this.player = player;
						}}
					>
						{this.renderControlBar()}
						<div
							id='videoPlayer-custom-controls'
							className='videoPlayer_custom_controls'
							style={{
								backgroundColor: controlBarBgColor
							}}
						>
							{this.renderControlBarButtons()}
						</div>
					</div>
				)}
			</div>
		);
	}
}

VideoPlayer.defaultProps = {
	forward_rewind_time: 10,
	isAutoPlay: false,
	controls: true,
	src: '',
	description: '',
	poster: '',
	title: '',
	isControls: true,

	onEnded: () => {},
	onPlay: () => {},
	onPause: () => {},
	onDoubleClickCapture: () => {},
	configurations: {
		width: 600,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		iconColor: 'white',
		controlBarBgColor: 'black',
		fontSize: 20,
		minHeight: 100,
		maxHeight: 600
	}
};
export default VideoPlayer;
