const TEST_DIV = document.createElement('div');
const VOLUME_ICON_PREFIX = '__vidz_player__volume-';

const getControlsContainerStyle = (defaultControlsStyle, isControlsVisible) => {
  if (isControlsVisible) {
    return defaultControlsStyle;
  }

  return {
    ...defaultControlsStyle,
    opacity: 0,
    visibility: 'hidden'
  };
};

const getControlStyle = (defaultStyle, backgroundColor, fontColor) => {
  if (!backgroundColor && !fontColor) {
    return defaultStyle;
  }

  let mergedStyle = {};

  if (backgroundColor) {
    mergedStyle.backgroundColor = backgroundColor;
  }

  if (fontColor) {
    mergedStyle.color = fontColor;
  }

  return {
    ...defaultStyle,
    ...mergedStyle
  };
};

const getFullscreenProperties = () => {
  if ('requestFullscreen' in TEST_DIV) {
    const fullscreen = 'webkitIsFullscreen' in TEST_DIV ? 'webkitIsFullScreen' : 'fullscreen';

    return {
      exitFullscreen: 'exitFullscreen',
      fullscreen,
      fullscreenchange: 'fullscreenchange',
      fullscreenEnabled: 'fullscreenEnabled',
      requestFullscreen: 'requestFullscreen'
    };
  }

  if ('webkitRequestFullscreen' in TEST_DIV) {
    return {
      exitFullscreen: 'webkitExitFullscreen',
      fullscreen: 'webkitIsFullScreen',
      fullscreenchange: 'webkitfullscreenchange',
      fullscreenEnabled: 'webkitFullscreenEnabled',
      requestFullscreen: 'webkitRequestFullscreen'
    };
  }

  if ('mozRequestFullScreen' in TEST_DIV) {
    return {
      exitFullscreen: 'mozCancelFullScreen',
      fullscreen: 'mozFullScreen',
      fullscreenchange: 'mozfullscreenchange',
      fullscreenEnabled: 'mozFullScreenEnabled',
      requestFullscreen: 'mozRequestFullScreen'
    };
  }

  return {
    exitFullscreen: 'exitFullscreen',
    fullscreen: 'fullscreen',
    fullscreenchange: 'fullscreenchange',
    fullscreenEnabled: 'fullscreenEnabled',
    requestFullscreen: 'requestFullscreen'
  };
};

const getPercentPlayed = (currentTime, duration) => {
  return Math.round((currentTime / duration) * 10000) / 100;
};

const getTimeFormatFromCurrentTime = (currentTime, showHours = false) => {
  const integerValue = parseInt(currentTime, 10);
  const hours = Math.floor(integerValue / 3600);
  const minutes = Math.floor((integerValue - (hours * 3600)) / 60);
  const seconds = integerValue - (hours * 3600) - (minutes * 60);
  const hoursDisplay = hours < 10 ? `0${hours}` : hours;
  const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
  const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
  
  if (showHours) {
    return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
  }

  return `${minutesDisplay}:${secondsDisplay}`;
};

const getTransformProperty = () => {
  if ('transform' in TEST_DIV.style) {
    return 'transform';
  }

  if ('WebkitTransform' in TEST_DIV.style) {
    return 'WebkitTransform';
  }

  if ('MozTransform' in TEST_DIV.style) {
    return 'MozTransform';
  }

  if ('OTransform' in TEST_DIV.style) {
    return 'OTransform';
  }

  if ('msTransform' in TEST_DIV.style) {
    return 'msTransform';
  }

  return 'transform';
};

const getVolumeChangeStyle = (defaultVolumeChange, volumeChangeActive, isVolumeChangeActive, backgroundColor, fontColor) => {
  if (!isVolumeChangeActive) {
    return defaultVolumeChange;
  }

  if (backgroundColor || fontColor) {
    let mergedStyle = {};

    if (backgroundColor) {
      mergedStyle.backgroundColor = backgroundColor;
    }

    if (fontColor) {
      mergedStyle.color = fontColor;
    }

    return {
      ...defaultVolumeChange,
      ...volumeChangeActive,
      ...mergedStyle
    };
  }

  return {
    ...defaultVolumeChange,
    ...volumeChangeActive
  };
};

const getVolumeIcon = (volume, isMuted) => {
  switch (true) {
    case isMuted:
      return `${VOLUME_ICON_PREFIX}mute2`;

    case volume >= 0.67:
      return `${VOLUME_ICON_PREFIX}high`;

    case volume >= 0.33:
      return `${VOLUME_ICON_PREFIX}medium`;

    case volume > 0:
      return `${VOLUME_ICON_PREFIX}low`;

    default:
      return `${VOLUME_ICON_PREFIX}mute`;
  }
};

export {getControlsContainerStyle};
export {getControlStyle};
export {getFullscreenProperties};
export {getTimeFormatFromCurrentTime};
export {getPercentPlayed};
export {getTransformProperty};
export {getVolumeChangeStyle};
export {getVolumeIcon};

export default {
  getControlsContainerStyle,
  getControlStyle,
  getFullscreenProperties,
  getTimeFormatFromCurrentTime,
  getPercentPlayed,
  getTransformProperty,
  getVolumeIcon
};
