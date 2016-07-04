const DARK_COLOR = 'rgb(63, 63, 63)';
const DARK_COLOR_BACKGROUND = 'rgba(63, 63, 63, 0.7)';
const LIGHT_COLOR = 'rgb(243, 243, 243)';
const LIGHT_COLOR_BACKGROUND = 'rgba(243, 243, 243, 0.7)';
const TRACK_BUTTON_SIZE = 12;
const BOX_SHADOW_SIZE = '0 0 3px';

const ALL_STYLES = {
  actionsContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  button: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexWrap: 'nowrap',
    fontSize: 16
  },
  container: {
    position: 'relative'
  },
  control: {
    height: 40,
    lineHeight: '40px',
    padding: '0 10px'
  },
  controlsContainer: {
    bottom: 0,
    left: 0,
    opacity: 1,
    position: 'absolute',
    right: 0,
    transition: 'opacity 150ms ease-in-out, visibility 150ms ease-in-out',
    visibility: 'visible'
  },
  durationSlider: {
    cursor: 'pointer',
    position: 'relative'
  },
  durationTrack: {
    height: 2,
    marginTop: -1,
    position: 'relative',
    top: '50%',
    width: 0
  },
  fullscreenButton: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0
  },
  informationContainer: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 12,
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 1
  },
  playPauseButton: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0
  },
  speedIdentifier: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 11
  },
  trackButton: {
    borderRadius: '50%',
    display: 'block',
    height: TRACK_BUTTON_SIZE,
    position: 'absolute',
    width: TRACK_BUTTON_SIZE
  },
  video: {
    objectFit: 'fill'
  },
  volumeButton: {
    boxSizing: 'border-box',
    textAlign: 'center',
    width: 40
  },
  volumeChange: {
    backgroundColor: 'inherit',
    bottom: '100%',
    boxSizing: 'border-box',
    color: 'inherit',
    cursor: 'pointer',
    display: 'none',
    height: 100,
    left: 0,
    padding: '10px 0',
    position: 'absolute',
    width: '100%'
  },
  volumeChangeActive: {
    display: 'block'
  },
  volumnChangeContainer: {
    backgroundColor: 'inherit',
    color: 'inherit',
    position: 'relative',
    zIndex: 1000
  },
  volumeChangeTrack: {
    height: '100%',
    left: '50%',
    marginLeft: -1,
    position: 'relative',
    width: 2
  }
};

let darkStyles = {
  ...ALL_STYLES,
  control: {
    ...ALL_STYLES.control,
    backgroundColor: DARK_COLOR_BACKGROUND,
    color: LIGHT_COLOR
  },
  durationSlider: {
    ...ALL_STYLES.durationSlider
  },
  durationTrack: {
    ...ALL_STYLES.durationTrack,
    backgroundColor: LIGHT_COLOR
  },
  durationTrackButton: {
    ...ALL_STYLES.trackButton,
    backgroundColor: LIGHT_COLOR,
    boxShadow: `${BOX_SHADOW_SIZE} ${DARK_COLOR}`,
    left: 0,
    marginTop: -1 * ((TRACK_BUTTON_SIZE / 2) + 1),
    top: '50%'
  },
  volumeChange: {
    ...ALL_STYLES.volumeChange,
    backgroundColor: DARK_COLOR_BACKGROUND
  },
  volumeChangeTrack: {
    ...ALL_STYLES.volumeChangeTrack,
    backgroundColor: LIGHT_COLOR
  },
  volumeTrackButton: {
    ...ALL_STYLES.trackButton,
    backgroundColor: LIGHT_COLOR,
    boxShadow: `${BOX_SHADOW_SIZE} ${DARK_COLOR}`,
    left: '50%',
    marginLeft: -1 * (TRACK_BUTTON_SIZE / 2),
    top: 6
  }
};

darkStyles = {
  ...darkStyles,
  fastForwardButton: {
    ...ALL_STYLES.button,
    ...darkStyles.control,
    ...ALL_STYLES.fastForwardButton
  },
  fullscreenButton: {
    ...ALL_STYLES.button,
    ...darkStyles.control,
    ...ALL_STYLES.fullscreenButton
  },
  informationContainer: {
    ...ALL_STYLES.informationContainer,
    ...darkStyles.control
  },
  playPauseButton: {
    ...ALL_STYLES.button,
    ...darkStyles.control,
    ...ALL_STYLES.playPauseButton
  },
  volumeButton: {
    ...ALL_STYLES.button,
    ...darkStyles.control,
    ...ALL_STYLES.volumeButton
  }
};

let lightStyles = {
  ...ALL_STYLES,
  control: {
    ...ALL_STYLES.control,
    backgroundColor: LIGHT_COLOR_BACKGROUND,
    color: DARK_COLOR
  },
  durationSlider: {
    ...ALL_STYLES.durationSlider
  },
  durationTrack: {
    ...ALL_STYLES.durationTrack,
    backgroundColor: DARK_COLOR
  },
  durationTrackButton: {
    ...ALL_STYLES.trackButton,
    backgroundColor: DARK_COLOR,
    boxShadow: `${BOX_SHADOW_SIZE} ${LIGHT_COLOR}`,
    left: 0,
    marginTop: -1 * ((TRACK_BUTTON_SIZE / 2) + 1),
    top: '50%'
  },
  volumeChange: {
    ...ALL_STYLES.volumeChange,
    backgroundColor: LIGHT_COLOR_BACKGROUND
  },
  volumeChangeTrack: {
    ...ALL_STYLES.volumeChangeTrack,
    backgroundColor: DARK_COLOR
  },
  volumeTrackButton: {
    ...ALL_STYLES.trackButton,
    backgroundColor: LIGHT_COLOR,
    boxShadow: `${BOX_SHADOW_SIZE} ${DARK_COLOR}`,
    left: '50%',
    marginLeft: -1 * ((TRACK_BUTTON_SIZE / 2) + 1),
    top: 0
  }
};

lightStyles = {
  ...lightStyles,
  fastForwardButton: {
    ...ALL_STYLES.button,
    ...lightStyles.control,
    ...ALL_STYLES.fastForwardButton
  },
  fullscreenButton: {
    ...ALL_STYLES.button,
    ...lightStyles.control,
    ...ALL_STYLES.fullscreenButton
  },
  informationContainer: {
    ...ALL_STYLES.informationContainer,
    ...lightStyles.control
  },
  playPauseButton: {
    ...ALL_STYLES.button,
    ...lightStyles.control,
    ...ALL_STYLES.playPauseButton
  },
  volumeButton: {
    ...ALL_STYLES.button,
    ...lightStyles.control,
    ...ALL_STYLES.volumeButton
  }
};

export {ALL_STYLES as allStyles};
export {darkStyles as darkStyles};
export {lightStyles};

export default {
  allStyles: ALL_STYLES,
  darkStyles: darkStyles,
  lightStyles: lightStyles
};
