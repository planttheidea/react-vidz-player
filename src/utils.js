// icons
import {availableIcons} from './icons';

const TEST_DIV = document.createElement('div');

/**
 * get the style for the controls container based on isControlsVisible
 *
 * @param {object} defaultControlsStyle
 * @param {boolean} isControlsVisible
 * @return {object}
 */
const getControlsContainerStyle = (defaultControlsStyle, isControlsVisible) => {
  if (isControlsVisible) {
    return defaultControlsStyle;
  }

  return {
    ...defaultControlsStyle,
    opacity: 0,
    visibility: 'hidden',
  };
};

/**
 * get the style for the control based on backgroundColor and fontColor
 *
 * @param {object} defaultStyle
 * @param {string} backgroundColor
 * @param {string} fontColor
 * @return {object}
 */
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
    ...mergedStyle,
  };
};

/**
 * get the vendor-prefixed properties associated with fullscreen activities
 *
 * @return {object}
 */
const getFullscreenProperties = () => {
  if ('requestFullscreen' in TEST_DIV) {
    const fullscreen = 'webkitIsFullscreen' in TEST_DIV ? 'webkitIsFullScreen' : 'fullscreen';

    return {
      exitFullscreen: 'exitFullscreen',
      fullscreen,
      fullscreenEnabled: 'fullscreenEnabled',
      fullscreenchange: 'fullscreenchange',
      requestFullscreen: 'requestFullscreen',
    };
  }

  if ('webkitRequestFullscreen' in TEST_DIV) {
    return {
      exitFullscreen: 'webkitExitFullscreen',
      fullscreen: 'webkitIsFullScreen',
      fullscreenEnabled: 'webkitFullscreenEnabled',
      fullscreenchange: 'webkitfullscreenchange',
      requestFullscreen: 'webkitRequestFullscreen',
    };
  }

  if ('mozRequestFullScreen' in TEST_DIV) {
    return {
      exitFullscreen: 'mozCancelFullScreen',
      fullscreen: 'mozFullScreen',
      fullscreenEnabled: 'mozFullScreenEnabled',
      fullscreenchange: 'mozfullscreenchange',
      requestFullscreen: 'mozRequestFullScreen',
    };
  }

  return {
    exitFullscreen: 'exitFullscreen',
    fullscreen: 'fullscreen',
    fullscreenEnabled: 'fullscreenEnabled',
    fullscreenchange: 'fullscreenchange',
    requestFullscreen: 'requestFullscreen',
  };
};

/**
 * get the percentage played rounded to two decimal places
 *
 * @param {number} currentTime
 * @param {number} duration
 * @return {number}
 */
const getPercentPlayed = (currentTime, duration) => Math.round((currentTime / duration) * 10000) / 100;

/**
 * based on the currentTime, show the string format as either
 * HH:MM:SS or MM:SS, based on showHours
 *
 * @param {number} currentTime
 * @param {boolean} showHours=false
 * @return {string}
 */
const getTimeFormatFromCurrentTime = (currentTime, showHours = false) => {
  const integerValue = parseInt(currentTime, 10);
  const hours = Math.floor(integerValue / 3600);
  const minutes = Math.floor((integerValue - hours * 3600) / 60);
  const seconds = integerValue - hours * 3600 - minutes * 60;
  const hoursDisplay = hours < 10 ? `0${hours}` : hours;
  const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
  const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

  if (showHours) {
    return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
  }

  return `${minutesDisplay}:${secondsDisplay}`;
};

/**
 * get the vendor-prefixed CSS transform property
 *
 * @return {string}
 */
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

/**
 * get the volume change style based on isVolumeChangeActive, the backgroundColor, and the fontColor
 *
 * @param {object} defaultVolumeChange
 * @param {object} volumeChangeActive
 * @param {boolean} isVolumeChangeActive
 * @param {string} backgroundColor
 * @param {string} fontColor
 * @return {object}
 */
const getVolumeChangeStyle = (
  defaultVolumeChange,
  volumeChangeActive,
  isVolumeChangeActive,
  backgroundColor,
  fontColor
) => {
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
      ...mergedStyle,
    };
  }

  return {
    ...defaultVolumeChange,
    ...volumeChangeActive,
  };
};

/**
 * get the volume icon based on the volume and isMuted
 *
 * @param {number} volume
 * @param {boolean} isMuted
 * @return {string}
 */
const getVolumeIcon = (volume, isMuted) => {
  switch (true) {
    case isMuted:
      return availableIcons.VOLUME_MUTE;

    case volume >= 0.67:
      return availableIcons.VOLUME_HIGH;

    case volume >= 0.33:
      return availableIcons.VOLUME_MEDIUM;

    default:
      return availableIcons.VOLUME_LOW;
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
  getControlStyle,
  getControlsContainerStyle,
  getFullscreenProperties,
  getPercentPlayed,
  getTimeFormatFromCurrentTime,
  getTransformProperty,
  getVolumeIcon,
};
