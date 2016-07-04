// external dependencies
import elementResize from 'element-resize-event';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';
import React, {
  Component,
  PropTypes
} from 'react';
import pure from 'recompose/pure';
import shallowEqual from 'recompose/shallowEqual';
import vidz from 'vidz';

import {
  getControlsContainerStyle,
  getControlStyle,
  getFullscreenProperties,
  getPercentPlayed,
  getTimeFormatFromCurrentTime,
  getTransformProperty,
  getVolumeChangeStyle,
  getVolumeIcon
} from './utils';

import {
  allStyles,
  darkStyles,
  lightStyles
} from './styles';

const THEMES = [
  'dark',
  'light'
];

const PLAYBACK_SPEEDS = [1, 2, 4, 8, 16];

const ICON_PREFIX = '__vidz_player__';

const {
  exitFullscreen,
  fullscreen,
  fullscreenchange,
  fullscreenEnabled,
  requestFullscreen
} = getFullscreenProperties();

const transformProperty = getTransformProperty();

@pure
class VidzPlayer extends Component {
  static propTypes = {
    autoHideControls: PropTypes.bool,
    autoplay: PropTypes.bool,
    controlsBackgroundColor: PropTypes.string,
    controlsFontColor: PropTypes.string,
    controlsTrackColor: PropTypes.string,
    height: PropTypes.number,
    loop: PropTypes.bool,
    mp4: PropTypes.string,
    muted: PropTypes.bool,
    ogg: PropTypes.string,
    onCanPlay: PropTypes.func,
    onCanPlayType: PropTypes.func,
    onDurationChange: PropTypes.func,
    onEmptied: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadedData: PropTypes.func,
    onLoadedMetadata: PropTypes.func,
    onLoadStart: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onProgress: PropTypes.func,
    onSeeked: PropTypes.func,
    onSeeking: PropTypes.func,
    onStalled: PropTypes.func,
    onSuspend: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onWaiting: PropTypes.func,
    playOnClick: PropTypes.bool,
    preload: PropTypes.string,
    theme: PropTypes.oneOf(THEMES),
    webm: PropTypes.string,
    width: PropTypes.number
  };

  static defaultProps = {
    autoHideControls: true,
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    playOnClick: false,
    theme: THEMES[0]
  };

  state = {
    autoHideTimeout: null,
    canUseFullscreen: true,
    controlsVisible: true,
    currentTime: 0,
    duration: 0,
    isDraggingDurationTrackButton: false,
    isDraggingVolumeTrackButton: false,
    isFullscreen: false,
    isLoaded: false,
    isMuted: false,
    isPlaying: false,
    isVolumeChangeActive: false,
    playbackRateIndex: 0,
    queuedOnVolumeSet: [],
    volume: 1
  };

  componentWillMount() {
    const canUseFullscreen = document[fullscreenEnabled];

    this.setState({
      canUseFullscreen
    });
  }

  componentDidMount() {
    this.setVidzInstance();

    elementResize(this.refs.container, this.debounceSetPlayerDimensions);

    document.addEventListener(fullscreenchange, this.onFullscreenChange);
    window.addEventListener('resize', this.debounceSetPlayerDimensionsOnResize);
  }

  componentDidUpdate(previousProps) {
    if (!shallowEqual(this.props, previousProps) || !this.state.isLoaded) {
      this.setVidzInstance();
    }
  }

  componentWillUnmount() {
    document.removeEventListener(fullscreenchange, this.onFullscreenChange);
    window.removeEventListener('resize', this.debounceSetPlayerDimensionsOnResize);
  }

  vidzInstance = null;

  debounceSetPlayerDimensionsOnResize = debounce(() => {
    const {
      isFullscreen
    } = this.state;

    if (isFullscreen) {
      this.debounceSetPlayerDimensions();
    }
  }, 50);

  debounceSetPlayerDimensions = debounce(() => {
    const dimensions = this.getHeightAndWidth();

    this.vidzInstance.setPlayerDimensions(dimensions);
  }, 50);

  getHeightAndWidth = () => {
    const {
      height: heightFromProps,
      width: widthFromProps
    } = this.props;
    const {
      isFullscreen
    } = this.state;

    let width = widthFromProps;

    if (isFullscreen) {
      width = window.innerWidth;
    } else if (isUndefined(width)) {
      width = Math.round(this.refs.container.clientWidth);
    }

    let height = heightFromProps;

    if (isUndefined(height)) {
      if (this.vidzInstance) {
        const naturalHeight = this.vidzInstance.player.videoHeight;
        const naturalWidth = this.vidzInstance.player.videoWidth;
        const multiplier = this.vidzInstance.player.width / naturalWidth;

        height = Math.round(naturalHeight * multiplier);
      } else {
        height = Math.round(width * 0.6);
      }
    }

    if (isFullscreen) {
      const maxHeight = window.innerHeight;

      if (height > maxHeight) {
        height = maxHeight;
      }
    }

    return {
      height,
      width
    };
  };

  onClickDurationTrack = (e) => {
    const left = this.refs.duration.getBoundingClientRect().left;
    const offset = e.pageX - left;
    const percentage = offset / this.refs.duration.clientWidth;

    this.setDurationTrackButtonPosition(percentage, true);
  };

  onClickFastForward = () => {
    const {
      isPlaying,
      playbackRateIndex
    } = this.state;

    if (isPlaying) {
      const newIndex = playbackRateIndex === PLAYBACK_SPEEDS.length - 1 ? 0 : playbackRateIndex + 1;

      this.setState({
        playbackRateIndex: newIndex
      });

      this.vidzInstance.setPlaybackRate(PLAYBACK_SPEEDS[newIndex]);
    }
  };

  onClickPlayPauseButton = () => {
    const {
      isPlaying
    } = this.state;

    if (this.vidzInstance.playbackRate !== 1) {
      this.vidzInstance.setPlaybackRate(1);

      this.setState({
        playbackRateIndex: 0
      });
    }

    if (isPlaying) {
      this.vidzInstance.pause();
    } else {
      this.vidzInstance.play();
    }
  };

  onClickToggleFullscreen = () => {
    const {
      isFullscreen
    } = this.state;

    if (isFullscreen) {
      document[exitFullscreen]();
    } else {
      this.refs.container[requestFullscreen]();
    }
  };

  onClickVolumeChange = () => {
    const {
      isMuted
    } = this.state;

    if (isMuted) {
      this.setState({
        isMuted: false
      });

      this.vidzInstance.unmute();
    } else {
      this.setState({
        isMuted: true
      });

      this.vidzInstance.mute();
    }
  };
  
  onClickVolumeTrack = (e) => {
    const top = this.refs.volume.getBoundingClientRect().top;
    const offset = e.pageY - top;
    const percentage = offset / this.refs.volume.clientHeight;

    this.setVolumeTrackButtonPosition(percentage, true);
  };

  onDragDurationTrackButton = (e) => {
    const left = this.refs.duration.getBoundingClientRect().left;

    let offset = e.pageX - left;

    let percentage = offset / this.refs.duration.clientWidth;

    if (percentage > 1) {
      percentage = 1;
    } else if (percentage < 0) {
      percentage = 0;
    }

    this.setDurationTrackButtonPosition(percentage, true);
  };

  onDragVolumeTrackButton = (e) => {
    const top = this.refs.volumeTrack.getBoundingClientRect().top;

    let offset = e.pageY - top;

    let percentage = offset / this.refs.volumeTrack.clientHeight;

    if (percentage > 1) {
      percentage = 1;
    } else if (percentage < 0) {
      percentage = 0;
    }

    this.setVolumeTrackButtonPosition(percentage, true);
  };

  onDragEndDurationTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingDurationTrackButton: false
    });

    window.removeEventListener('mouseup', this.onDragEndDurationTrackButton);
    window.removeEventListener('mousemove', this.onDragDurationTrackButton);
  };

  onDragEndVolumeTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const {
      queuedOnVolumeSet
    } = this.state;

    this.setState({
      isDraggingVolumeTrackButton: false
    });

    queuedOnVolumeSet.forEach((fn) => {
      fn();
    });

    this.setState({
      queuedOnVolumeSet: []
    });

    window.removeEventListener('mouseup', this.onDragEndVolumeTrackButton);
    window.removeEventListener('mousemove', this.onDragVolumeTrackButton);
  };

  onDragStartDurationTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingDurationTrackButton: true
    });

    window.addEventListener('mouseup', this.onDragEndDurationTrackButton);
    window.addEventListener('mousemove', this.onDragDurationTrackButton);
  };

  onDragStartVolumeTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingVolumeTrackButton: true
    });

    window.addEventListener('mouseup', this.onDragEndVolumeTrackButton);
    window.addEventListener('mousemove', this.onDragVolumeTrackButton);
  };

  onFullscreenChange = () => {
    this.setState({
      isFullscreen: document[fullscreen]
    });

    const dimensions = this.getHeightAndWidth();

    this.vidzInstance.setPlayerDimensions(dimensions);
  };

  onLoadedMetadata = (e, instance) => {
    const {
      onLoadedMetadata
    } = this.props;

    this.setPercentLoaded(instance.percentLoaded);
    this.setTimeRepresentation({
      duration: instance.duration
    });

    if (onLoadedMetadata) {
      onLoadedMetadata.call(instance, e, instance);
    }
  };

  onMouseEnterVolumeChange = () => {
    const {
      queuedOnVolumeSet
    } = this.state;

    if (queuedOnVolumeSet.length) {
      this.setState({
        queuedOnVolumeSet: []
      });
    }

    this.setVolumeChangeState(true);
  };

  onMouseLeaveContainer = () => {
    const {
      autoHideControls
    } = this.props;
    const {
      isPlaying
    } = this.state;

    if (autoHideControls && isPlaying) {
      this.setTimeoutToHideControls();
    }
  };

  onMouseLeaveVolumeChange = () => {
    const {
      isDraggingVolumeTrackButton
    } = this.state;

    if (isDraggingVolumeTrackButton) {
      const queuedOnVolumeSet = [
        this.setVolumeChangeState
      ];

      this.setState({
        queuedOnVolumeSet
      });
    } else {
      this.setVolumeChangeState();
    }
  };

  setVolumeChangeState = (isActive = false) => {
    this.setState({
      isVolumeChangeActive: isActive
    });
  };

  onMouseMoveContainer = () => {
    const {
      autoHideTimeout,
      controlsVisible,
      isPlaying
    } = this.state;

    clearTimeout(autoHideTimeout);

    if (!controlsVisible) {
      this.setState({
        controlsVisible: true
      });
    }

    if (isPlaying) {
      this.setTimeoutToHideControls();
    }
  };

  onPause = (e, instance) => {
    const {
      onPause
    } = this.props;
    const {
      autoHideTimeout
    } = this.state;

    clearTimeout(autoHideTimeout);

    this.setState({
      controlsVisible: true,
      isPlaying: false
    });

    if (onPause) {
      onPause.call(instance, e, instance);
    }

    this.setPercentLoaded(instance.percentLoaded);
  };

  onPlay = (e, instance) => {
    const {
      autoHideControls,
      onPlay
    } = this.props;
    const {
      controlsVisible
    } = this.state;

    this.setState({
      isPlaying: true
    });

    if (onPlay) {
      onPlay.call(instance, e, instance);
    }

    this.setPercentLoaded(instance.percentLoaded);

    if (autoHideControls && controlsVisible) {
      this.setTimeoutToHideControls();
    }
  };

  onTimeUpdate = (e, instance) => {
    const {
      onTimeUpdate
    } = this.props;

    this.setPercentPlayed(instance.currentTime, instance.duration);
    this.setPercentLoaded(instance.percentLoaded);
    this.setTimeRepresentation({
      currentTime: instance.currentTime
    });

    if (onTimeUpdate) {
      onTimeUpdate.call(instance, e, instance);
    }
  };

  onVolumeChange = (e, instance) => {
    const {
      onVolumeChange
    } = this.props;

    const volume = this.vidzInstance.getVolume();

    this.setState({
      volume
    });

    if (onVolumeChange) {
      onVolumeChange.call(instance, e, instance);
    }
  };

  setDurationTrackButtonPosition = (percentage, setTime = false) => {
    const marginLeft = Math.round(percentage * 12);
    const percentInPixels = Math.round(percentage * this.refs.duration.clientWidth);
    const left = percentInPixels - marginLeft;

    if (transformProperty) {
      this.refs.durationTrackButton.style.transform = `translate3d(${left}px, 0, 0)`;
    } else {
      this.refs.durationTrackButton.style.left = `${left}px`;
    }

    if (setTime) {
      this.setTime(percentage);
    }
  };

  setPercentLoaded = (percentLoaded) => {
    this.refs.durationTrack.style.width = `${percentLoaded}%`;
  };

  setPercentPlayed = (currentTime, duration) => {
    const percentPlayed = getPercentPlayed(currentTime, duration);

    this.setDurationTrackButtonPosition(percentPlayed / 100);
  };

  setTime = debounce((percentage) => {
    this.vidzInstance.setCurrentTime(percentage * this.vidzInstance.duration);
  }, 50);

  setTimeRepresentation = ({currentTime, duration}) => {
    if (!isUndefined(currentTime)) {
      this.setState({
        currentTime
      });
    }

    if (!isUndefined(duration)) {
      this.setState({
        duration
      });
    }
  };

  setTimeoutToHideControls = () => {
    const autoHideTimeout = setTimeout(() => {
      this.setState({
        controlsVisible: false
      });
    }, 2500);

    this.setState({
      autoHideTimeout
    });
  };

  setVidzInstance = () => {
    if (this.refs.container.parentNode.clientWidth === 0) {
      this.debounceSetPlayerDimensions();
    }

    const {
      autoplay,
      muted
    } = this.props;

    const {
      height,
      width
    } = this.getHeightAndWidth();

    this.vidzInstance = vidz(this.refs.playerContainer, {
      ...this.props,
      controls: false,
      height,
      onLoadedMetadata: this.onLoadedMetadata,
      onPause: this.onPause,
      onPlay: this.onPlay,
      onTimeUpdate: this.onTimeUpdate,
      onVolumeChange: this.onVolumeChange,
      width
    });

    this.vidzInstance.player.style.display = 'block';

    if (autoplay) {
      this.setState({
        isPlaying: true
      });
    }

    if (muted) {
      this.setState({
        isMuted: true
      });
    }

    this.setState({
      isLoaded: true
    });
  };

  setVolume = debounce((percentage) => {
    this.vidzInstance.setVolume(percentage);
  }, 50);

  setVolumeTrackButtonPosition = (percentage, setVolume = false) => {
    const top = Math.round(percentage * this.refs.volumeTrack.clientHeight);

    if (transformProperty) {
      this.refs.volumeTrackButton.style.transform = `translate3d(0, ${top}px, 0)`;
    } else {
      this.refs.volumeTrackButton.style.top = `${top}px`;
    }

    if (setVolume) {
      this.setVolume(1 - percentage);
    }
  };

  render() {
    const {
      controlsBackgroundColor,
      controlsFontColor,
      playOnClick,
      controlsTrackColor,
      theme
    } = this.props;
    const {
      canUseFullscreen,
      controlsVisible,
      currentTime,
      duration,
      isFullscreen,
      isMuted,
      isPlaying,
      isVolumeChangeActive,
      playbackRateIndex
    } = this.state;

    const volume = this.vidzInstance ? this.vidzInstance.getVolume() : 1;
    const volumeIcon = getVolumeIcon(volume, isMuted);

    let styles;

    switch (theme) {
      case THEMES[1]:
        styles = lightStyles;
        break;

      default:
        styles = darkStyles;
        break;
    }

    const controlsStyle = getControlsContainerStyle(styles.controlsContainer, controlsVisible);
    const durationTrackStyle = getControlStyle(styles.durationTrack, controlsTrackColor);
    const durationTrackButtonStyle = getControlStyle(styles.durationTrackButton, controlsFontColor);
    const playPauseButtonStyle = getControlStyle(styles.playPauseButton, controlsBackgroundColor, controlsFontColor);
    const volumeButtonStyle = getControlStyle(styles.volumeButton, controlsBackgroundColor, controlsFontColor);
    const informationContainerStyle = getControlStyle(styles.informationContainer, controlsBackgroundColor, controlsFontColor);
    const fastForwardButtonStyle = getControlStyle(styles.fastForwardButton, controlsBackgroundColor, controlsFontColor);
    const fullscreenButtonStyle = getControlStyle(styles.fullscreenButton, controlsBackgroundColor, controlsFontColor);
    const volumeChangeStyle = getVolumeChangeStyle(styles.volumeChange, allStyles.volumeChangeActive,
      isVolumeChangeActive, controlsBackgroundColor, controlsFontColor);
    const volumeChangeTrackStyle = getControlStyle(styles.volumeChangeTrack, controlsTrackColor);
    const volumeTrackButtonStyle = getControlStyle(styles.volumeTrackButton, controlsFontColor);

    return (
      <div
        onMouseLeave={this.onMouseLeaveContainer}
        onMouseMove={this.onMouseMoveContainer}
        ref="container"
        style={styles.container}
      >
        <div
          onClick={playOnClick && this.onClickPlayPauseButton}
          ref="playerContainer"
        />

        <div
          ref="controlsContainer"
          style={controlsStyle}
        >
          <div
            onClick={this.onClickDurationTrack}
            ref="duration"
            style={styles.durationSlider}
          >
            <div
              ref="durationTrack"
              style={durationTrackStyle}
            />

            <span
              onMouseDown={this.onDragStartDurationTrackButton}
              ref="durationTrackButton"
              style={durationTrackButtonStyle}
            />
          </div>
          
          <div style={styles.actionsContainer}>
            <div
              onClick={this.onClickPlayPauseButton}
              ref="playPauseButton"
              role="button"
              style={playPauseButtonStyle}
            >
              <i className={`${ICON_PREFIX}${isPlaying ? 'pause' : 'play'}`}/>
            </div>
            
            <div
              style={informationContainerStyle}
            >
              {getTimeFormatFromCurrentTime(currentTime)} / {getTimeFormatFromCurrentTime(duration)}
            </div>

            <div
              onClick={this.onClickFastForward}
              ref="fastForward"
              role="button"
              style={fastForwardButtonStyle}
            >
              <i className={`${ICON_PREFIX}forward`}/>

              <span style={styles.speedIdentifier}>
                {PLAYBACK_SPEEDS[playbackRateIndex]}x
              </span>
            </div>
  
            <div
              className="__vidz_volume_change__"
              onMouseEnter={this.onMouseEnterVolumeChange}
              onMouseLeave={this.onMouseLeaveVolumeChange}
              role="button"
              style={styles.volumnChangeContainer}
            >
              <div
                onClick={this.onClickVolumeChange}
                style={volumeButtonStyle}
              >
                <i className={volumeIcon}/>
              </div>
              
              <div
                onClick={this.onClickVolumeTrack}
                ref="volume"
                style={volumeChangeStyle}
              >
                <div
                  ref="volumeTrack"
                  style={volumeChangeTrackStyle}
                />

                <span
                  onMouseDown={this.onDragStartVolumeTrackButton}
                  ref="volumeTrackButton"
                  style={volumeTrackButtonStyle}
                />
              </div>
            </div>
  
            {canUseFullscreen && (
              <div
                onClick={this.onClickToggleFullscreen}
                ref="fullscreen"
                role="button"
                style={fullscreenButtonStyle}
              >
                <i className={`${ICON_PREFIX}${isFullscreen ? 'shrink' : 'enlarge'}`}/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default VidzPlayer;
