import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlButton from 'components/ControlButton';
import AddIndicator from 'components/AddIndicator';
import './VideoPlayer.css';
import { Icon } from 'antd';
import moment from 'moment';
import Overlay from 'components/OverLay';
import cx from 'classnames';
import Hls from 'hls.js';
const HlsSupportCheck = window.Hls || Hls;

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
		skipAdAfter: 10,
		isSkipAdd: false,
		skippable: false,
		timeOfOccurence: '',
		initialData: false,
		allOccurences: [],
		adIndex: 0
	};
	static propTypes = {
		FWD_REV_TIME: PropTypes.number,
		isAutoPlay: PropTypes.bool,
		isControls: PropTypes.bool,
		className: PropTypes.string,
		src: PropTypes.string,
		addSrc: PropTypes.object,
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
		this.myVideo.currentTime += this.props.FWD_REV_TIME;
	};

	timeDecrementHandler = () => {
		this.myVideo.currentTime -= this.props.FWD_REV_TIME;
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
		} else if (this.myVideo.msRequestFullscreen) {
			this.myVideo.msRequestFullscreen();
		}
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
	progressBarHandler = () => {
		let duration = this.myVideo.duration;
		if (duration > 0 && this.props.isControls && !this.state.isAddPlayed) {
			this.ProgressBar.style.width = `${this.myVideo.currentTime / duration * 100}%`;
			this.ProgressBarInd.style.left = `${this.myVideo.currentTime / duration * 100}%`;
		}
		this.timeDisplayHandler();
		this.onAdFetchHandler();

		if (this.myVideo.ended) {
			this.fetchVideo(this.props.src);
			if (this.props.isControls)
				this.props.configurations.seekBarColor
					? (this.ProgressBar.style.backgroundColor = this.props.configurations.seekBarColor)
					: (this.ProgressBar.style.backgroundColor = 'red');
			if (this.props.addSrc && this.props.isControls) this.AdIndicator.style.display = 'block';
			this.props.addSrc
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
				return this.state.initialData ? '' : this.initialCalculations();
			}
		);
	};

	controlVisibilityHandler = (status) => {
		this.setState({
			isControlsVisibility: status
		});
	};

	videoOnLoadHandler = () => {
		this.initialCalculations();
		this.timeDisplayHandler(this.myVideo.duration);
	};

	fetchAdVideo = (index) => {
		this.fetchVideo(this.props.addSrc.url[index]);
		if (this.props.addSrc && this.props.isControls) {
			this.ProgressBar.style.backgroundColor = 'yellow';
			this.AdIndicator.style.display = 'none';
			this.player.style.pointerEvents = 'none';
		}

		this.setState(
			{
				isAddPlayed: false,
				isPlayStatus: false,
				isAdVideoFetched: true,
				skipAdAfter: this.props.addSrc.showSkipAdEnable,
				timeInsecs: 0
			},
			this.playPauseHandler
		);
	};

	beforeAdFetch = () => {
		debugger;
		const { addPassed, isAddPlayed, isAdVideoFetched, timeInsecs, allOccurences } = this.state;
		return addPassed && !isAddPlayed && !isAdVideoFetched && allOccurences.includes(timeInsecs);
	};

	onAdFetchHandler = () => {
		if (this.beforeAdFetch()) {
			let index = this.state.adIndex;
			if (this.state.adIndex === this.props.addSrc.url.length - 1) {
				index = 0;
			} else {
				index = index + 1;
			}
			this.setState(
				{
					timeStop: this.myVideo.currentTime,
					skippable: this.props.addSrc.skippable,
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
				className={`animate  ${isControlsVisibility && !isAdVideoFetched ? 'visible' : 'hidden'}`}
				id='onScreenIncDec'
			>
				<div className='child-inc-dec decrement'>
					<Icon type='backward' onClick={this.timeIncrementHandler} style={styleIconOnScreen} />
				</div>
				<div className='child-inc-dec increment'>
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
			<div className='skip'>
				<div onClick={this.handleAdSkip}>
					Skip Ad {timeInsecs < skipAdAfter ? `in ${skipAdAfter - timeInsecs}` : ''}
					<div className='skip-forward'>
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
		return this.props.addSrc ? (
			<div
				ref={(AdIndicator) => {
					this.AdIndicator = AdIndicator;
				}}
			>
				{this.state.allOccurences.map((times) => {
					return <AddIndicator key={Math.random()} left={`${(times + 1) / this.myVideo.duration * 100}%`} />;
				})}
			</div>
		) : (
			<div />
		);
	};
	renderControlsVisibility = () => {
		return 'animate ' + (this.state.isControlsVisibility ? 'visible' : 'hidden') + ' controlBar';
	};
	renderControlBar = () => {
		return (
			<div id='playerContent' style={{ backgroundColor: this.controlBarBgColor }}>
				<div className='buffered'>
					<span
						id='buffered-amount'
						ref={(bufferBar) => {
							this.bufferBar = bufferBar;
						}}
					/>
				</div>
				<div className='progress' id='progress' onClick={this.onProgressClick}>
					<span
						id='progress-amount'
						ref={(progressBar) => {
							this.ProgressBar = progressBar;
						}}
						style={{ backgroundColor: this.props.configurations.seekBarColor }}
					>
						{<div />}
						<div
							className='progress-amount-indicator'
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
					id='timeDisplay'
					style={{
						backgroundColor: controlBarBgColor,
						color: iconColor
					}}
				>
					{this.state.initialTime}
				</div>
				<span className='right-controls'>
					<ControlButton
						id='mute'
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
						id='fullScreen'
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
				hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {});
				hls.on(Hls.Events.ERROR, function(event, data) {
					if (data.details === 'bufferAppendError') {
						hls.destroy();
					}
				});
			} catch (e) {
				console.log(e);
			}
		} else {
			if (hls !== '') {
				hls.destroy();
			}
			this.myVideo.src = source;
			this.myVideo.type = 'video/mp4';
		}

		if (autoPlayStatus) {
			this.playPauseHandler();
		}

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
	};

	initialCalculations = () => {
		const noOfAdVideoes = Math.round(this.myVideo.duration / 300),
			occurenceTime = this.myVideo.duration / (noOfAdVideoes + 1),
			allOccurences = [];
		for (let i = 0; i < noOfAdVideoes; i++) {
			allOccurences.push(Math.round(occurenceTime * i));
		}
		this.setState({
			initialData: true,
			noOfAdVideoes,
			occurenceTime,
			allOccurences
		});
		console.log(noOfAdVideoes, occurenceTime, allOccurences);
	};
	loadedData = () => {
		console.log('hi');
		if (this.myVideo.buffered.length === 0) {
			console.log('hi');
		}
	};
	componentDidMount() {
		if (this.props.src) {
			if (this.props.isAutoPlay && !this.state.isPlayStatus) {
				this.fetchVideo(this.props.src, true);
			} else {
				this.fetchVideo(this.props.src);
			}
		}
		if (this.props.addSrc) {
			this.setState({
				addPassed: true
			});
		}
	}
	renderClassName = () => cx([ this.props.className, 'common-video' ]);
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
					autoPlay={this.props.isAutoPlay}
					onProgress={this.bufferBarHandler}
					onTimeUpdate={this.progressBarHandler}
					onCanPlayThrough={this.videoOnLoadHandler}
					onSeeking={this.onSeeking}
					onClick={this.playPauseHandler}
					onEnded={this.props.onEnded}
					onPlay={this.props.onPlay}
					onPause={this.props.onPause}
					onDoubleClickCapture={this.props.onDoubleClickCapture}
					style={this.props.addSrc ? { minHeight: minHeight, maxHeight } : { minHeight: minHeight }}
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
							id='customControls'
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
	FWD_REV_TIME: 10,
	isAutoPlay: false,
	controls: true,
	src: '',
	description: '',
	poster: '',
	title: '',
	isControls: true,

	onEnded: () => {
		console.log('hello in player - ended');
	},
	onPlay: () => {
		console.log('hey in player - play');
	},
	onPause: () => {
		console.log('hey in player - pause');
	},
	onDoubleClickCapture: () => {
		console.log('hey in player - double click');
	},
	configurations: {
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
	}
};
export default VideoPlayer;
