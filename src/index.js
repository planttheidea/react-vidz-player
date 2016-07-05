// external dependencies
import elementResize from 'element-resize-event';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';
import React, {
  Component,
  PropTypes
} from 'react';
import {
  findDOMNode
} from 'react-dom';
import {
  pure
} from 'recompose';
import shallowEqual from 'recompose/shallowEqual';
import vidz from 'vidz';

// components
import Button from './components/Button';
import Display from './components/Display';
import InformationBar from './components/InformationBar';
import Track from './components/Track';
import TrackButton from './components/TrackButton';
import VolumeContainer from './components/VolumeContainer';

import {
  getControlsContainerStyle,
  getControlStyle,
  getFullscreenProperties,
  getPercentPlayed,
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
    preventAutoHideControls: PropTypes.bool,
    theme: PropTypes.oneOf(THEMES),
    webm: PropTypes.string,
    width: PropTypes.number
  };

  static defaultProps = {
    autoplay: false,
    controls: false,
    loop: false,
    muted: false,
    playOnClick: false,
    preventAutoHideControls: false,
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

  duration = null;
  durationTrack = null;
  durationTrackButton = null;
  vidzInstance = null;
  volume = null;
  volumeTrack = null;
  volumeTrackButton = null;

  /**
   * if in fullscreen mode, resize the player because it isn't handled by the
   * element resize
   */
  debounceSetPlayerDimensionsOnResize = debounce(() => {
    const {
      isFullscreen
    } = this.state;

    if (isFullscreen) {
      this.debounceSetPlayerDimensions();
    }
  }, 50);

  /**
   * resize the Vidz instance dimensions
   */
  debounceSetPlayerDimensions = debounce(() => {
    const dimensions = this.getHeightAndWidth();

    this.vidzInstance.setPlayerDimensions(dimensions);
  }, 50);

  /**
   * get the intended height and width
   * 
   * the width is either the explicit width passed as a prop, the width of the 
   * parent container, or if in fullscreen mode the width of the window
   * 
   * the height is either the explicit height passed as a prop or the aspect
   * ratio of the video based on its metadata (with a generic default until
   * metadata has loaded)
   * 
   * @return {{height: number, width: number}}
   */
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

  /**
   * set the currentTime of the video based on the location clicked
   * 
   * @param {Event} e
   */
  onClickDurationTrack = (e) => {
    const left = this.duration.getBoundingClientRect().left;
    const offset = e.pageX - left;
    const percentage = offset / this.duration.clientWidth;

    this.setDurationTrackButtonPosition(percentage, true);
  };

  /**
   * increase the playback rate in increments in PLAYBACK_SPEEDS
   */
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

  /**
   * toggle between play and pause
   */
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

  /**
   * toggle between fullscreen mode and standard mode
   */
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

  /**
   * toggle between muted and unmuted
   */
  onClickToggleVolumeMuted = () => {
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

  /**
   * set the volume based on the location clicked
   *
   * @param {Event} e
   */
  onClickVolumeTrack = (e) => {
    const top = this.volume.getBoundingClientRect().top;
    const offset = e.pageY - top;
    const percentage = offset / this.volume.clientHeight;

    this.setVolumeTrackButtonPosition(percentage, true);
  };

  /**
   * based on where the button was dragged, calculate the percentage
   * of the total video length and jump to that time location
   *
   * @param {Event} e
   */
  onDragDurationTrackButton = (e) => {
    const left = this.duration.getBoundingClientRect().left;

    let offset = e.pageX - left;

    let percentage = offset / this.duration.clientWidth;

    if (percentage > 1) {
      percentage = 1;
    } else if (percentage < 0) {
      percentage = 0;
    }

    this.setDurationTrackButtonPosition(percentage, true);
  };

  /**
   * based on where the button was dragged, calculate the percentage
   * of the total volume length and apply that volume
   *
   * @param {Event} e
   */
  onDragVolumeTrackButton = (e) => {
    const top = this.volumeTrack.getBoundingClientRect().top;

    let offset = e.pageY - top;

    let percentage = offset / this.volumeTrack.clientHeight;

    if (percentage > 1) {
      percentage = 1;
    } else if (percentage < 0) {
      percentage = 0;
    }

    this.setVolumeTrackButtonPosition(percentage, true);
  };

  /**
   * when finished dragging the button, remove the listeners
   *
   * @param {Event} e
   */
  onDragEndDurationTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingDurationTrackButton: false
    });

    window.removeEventListener('mouseup', this.onDragEndDurationTrackButton);
    window.removeEventListener('mousemove', this.onDragDurationTrackButton);
  };

  /**
   * when finished dragging the button, remove the listeners and if there
   * are functions in the queue to fire, fire them
   *
   * @param {Event} e
   */
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

  /**
   * when you start dragging, add listeners to update the currentTime
   * onDrag
   *
   * @param {Event} e
   */
  onDragStartDurationTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingDurationTrackButton: true
    });

    window.addEventListener('mouseup', this.onDragEndDurationTrackButton);
    window.addEventListener('mousemove', this.onDragDurationTrackButton);
  };

  /**
   * when you start dragging, add listeners to update the volume
   * onDrag
   *
   * @param {Event} e
   */
  onDragStartVolumeTrackButton = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isDraggingVolumeTrackButton: true
    });

    window.addEventListener('mouseup', this.onDragEndVolumeTrackButton);
    window.addEventListener('mousemove', this.onDragVolumeTrackButton);
  };

  /**
   * when the fullscreen state changes, reset the dimensions of the video
   */
  onFullscreenChange = () => {
    this.setState({
      isFullscreen: document[fullscreen]
    });

    const dimensions = this.getHeightAndWidth();

    this.vidzInstance.setPlayerDimensions(dimensions);
  };

  /**
   * when metadata has loaded, update the percentLoaded and the
   * time displayed, and fire the function passed by props if exists
   *
   * @param {Event} e
   * @param {Vidz} instance
   */
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

  /**
   * show the volume bar on mouseenter
   */
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

  /**
   * hide the volume bar on mouseleave unless a drag is in effect,
   * else queue up the closure of it
   */
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

  /**
   * set the active state of the volume bar
   * 
   * @param {boolean} isActive
   */
  setVolumeChangeState = (isActive = false) => {
    this.setState({
      isVolumeChangeActive: isActive
    });
  };

  /**
   * when mouse movement occurs over the container, clear
   * the timeout of hiding the controls and set a new one
   */
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

  /**
   * on pause set the controls to be visible and the isPlaying state,
   * plus the function passed by props if it exists
   * 
   * @param {Event} e
   * @param {instance} instance
   */
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

  /**
   * on play set the hde controls timeout and the isPlaying state,
   * plus the function passed by props if it exists
   *
   * @param {Event} e
   * @param {instance} instance
   */
  onPlay = (e, instance) => {
    const {
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

    if (controlsVisible) {
      this.setTimeoutToHideControls();
    }
  };

  /**
   * on time update set the currentTime and percent loaded,
   * plus the function passed by props if it exists
   *
   * @param {Event} e
   * @param {instance} instance
   */
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

  /**
   * on volume change set the volume in state,
   * plus the function passed by props if it exists
   *
   * @param {Event} e
   * @param {instance} instance
   */
  onVolumeChange = (e, instance) => {
    const {
      onVolumeChange
    } = this.props;

    const volume = this.vidzInstance.volume;

    this.setState({
      volume
    });

    if (onVolumeChange) {
      onVolumeChange.call(instance, e, instance);
    }
  };

  /**
   * update the position of the durationTrackButton,
   * and the currentTime if setTime is true
   * 
   * @param {number} percentage
   * @param {boolean} setTime=false
   */
  setDurationTrackButtonPosition = (percentage, setTime = false) => {
    const marginLeft = Math.round(percentage * 12);
    const percentInPixels = Math.round(percentage * this.duration.clientWidth);
    const left = percentInPixels - marginLeft;

    if (transformProperty) {
      this.durationTrackButton.style.transform = `translate3d(${left}px, 0, 0)`;
    } else {
      this.durationTrackButton.style.left = `${left}px`;
    }

    if (setTime) {
      this.setTime(percentage);
    }
  };

  /**
   * update the width of the duration track with the new percent loaded
   * 
   * @param {number} percentLoaded
   */
  setPercentLoaded = (percentLoaded) => {
    this.durationTrack.style.width = `${percentLoaded}%`;
  };

  /**
   * set the position of the duration track button based on the percent played
   * 
   * @param {number} currentTime
   * @param {number} duration
   */
  setPercentPlayed = (currentTime, duration) => {
    const percentPlayed = getPercentPlayed(currentTime, duration);

    this.setDurationTrackButtonPosition(percentPlayed / 100);
  };

  /**
   * set the currentTime on the Vidz instance based on the percentage of the duration
   */
  setTime = debounce((percentage) => {
    this.vidzInstance.setCurrentTime(percentage * this.vidzInstance.duration);
  }, 50);

  /**
   * set the currentTime and duration in state so they can be reflected
   * in the visual display
   * 
   * @param {number} currentTime
   * @param {number} duration
   */
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

  /**
   * set the timeout to hide the controls from inactivity
   */
  setTimeoutToHideControls = () => {
    const {
      preventAutoHideControls
    } = this.props;

    if (!preventAutoHideControls) {
      const autoHideTimeout = setTimeout(() => {
        this.setState({
          controlsVisible: false
        });
      }, 3000);

      this.setState({
        autoHideTimeout
      });
    }
  };

  /**
   * create a new Vidz instance and save it to the class' instance
   */
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

  /**
   * update the volume of the Vidz instance based on the percentage passed
   */
  setVolume = debounce((percentage) => {
    this.vidzInstance.setVolume(percentage);
  }, 50);

  /**
   * update the position of the volume track button based on the percentage passed,
   * and set the volume if setVolume is true
   * 
   * @param {number} percentage
   * @param {boolean} setVolume=false
   */
  setVolumeTrackButtonPosition = (percentage, setVolume = false) => {
    const top = Math.round(percentage * this.volumeTrack.clientHeight);

    if (transformProperty) {
      this.volumeTrackButton.style.transform = `translate3d(0, ${top}px, 0)`;
    } else {
      this.volumeTrackButton.style.top = `${top}px`;
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

    const volume = this.vidzInstance ? this.vidzInstance.volume : 1;
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
        onMouseMove={this.onMouseMoveContainer}
        ref="container"
        style={styles.container}
      >
        <div
          onClick={playOnClick && this.onClickPlayPauseButton}
          ref="playerContainer"
        />

        <div style={controlsStyle}>
          <Display
            onClick={this.onClickDurationTrack}
            ref={(component) => {
              this.duration = findDOMNode(component);
            }}
            style={styles.durationSlider}
          >
            <Track
              ref={(component) => {
                this.durationTrack = findDOMNode(component);
              }}
              style={durationTrackStyle}
            />

            <TrackButton
              label="Seek to a different time in the video"
              onMouseDown={this.onDragStartDurationTrackButton}
              ref={(component) => {
                this.durationTrackButton = findDOMNode(component);
              }}
              style={durationTrackButtonStyle}
            />
          </Display>
          
          <div style={styles.actionsContainer}>
            <Button
              onClick={this.onClickPlayPauseButton}
              icon={`${ICON_PREFIX}${isPlaying ? 'pause' : 'play'}`}
              label="Toggle playing the video"
              style={playPauseButtonStyle}
            />

            <InformationBar
              currentTime={currentTime}
              duration={duration}
              style={informationContainerStyle}
            />

            <Button
              icon={`${ICON_PREFIX}forward`}
              onClick={this.onClickFastForward}
              label="Increase the playback speed"
              style={fastForwardButtonStyle}
            >
              <span style={styles.speedIdentifier}>
                {PLAYBACK_SPEEDS[playbackRateIndex]}x
              </span>
            </Button>

            <VolumeContainer
              onMouseEnter={this.onMouseEnterVolumeChange}
              onMouseLeave={this.onMouseLeaveVolumeChange}
              style={styles.volumnChangeContainer}
            >
              <Button
                icon={volumeIcon}
                onClick={this.onClickToggleVolumeMuted}
                label="Toggle the video being muted"
                style={volumeButtonStyle}
              />

              <Display
                onClick={this.onClickVolumeTrack}
                ref={(component) => {
                  this.volume = findDOMNode(component);
                }}
                style={volumeChangeStyle}
              >
                <Track
                  ref={(component) => {
                    this.volumeTrack = findDOMNode(component);
                  }}
                  style={volumeChangeTrackStyle}
                />

                <TrackButton
                  label="Change the volume"
                  onMouseDown={this.onDragStartVolumeTrackButton}
                  ref={(component) => {
                    this.volumeTrackButton = findDOMNode(component);
                  }}
                  style={volumeTrackButtonStyle}
                />
              </Display>
            </VolumeContainer>

            {canUseFullscreen && (
              <Button
                icon={`${ICON_PREFIX}${isFullscreen ? 'shrink' : 'enlarge'}`}
                label="Toggle fullscreen mode"
                onClick={this.onClickToggleFullscreen}
                style={fullscreenButtonStyle}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default VidzPlayer;
