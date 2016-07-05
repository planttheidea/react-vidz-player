// external dependencies
import IoExpand from 'react-icons/lib/io/arrow-expand';
import IoFastForward from 'react-icons/lib/io/ios-fastforward';
import IoPause from 'react-icons/lib/io/pause';
import IoPlay from 'react-icons/lib/io/play';
import IoShrink from 'react-icons/lib/io/arrow-shrink';
import IoVolumeHigh from 'react-icons/lib/io/volume-high';
import IoVolumeLow from 'react-icons/lib/io/volume-low';
import IoVolumeMedium from 'react-icons/lib/io/volume-medium';
import IoVolumeMute from 'react-icons/lib/io/volume-mute';

const AVAILABLE_ICONS = {
  EXPAND: 'EXPAND',
  FAST_FORWARD: 'FAST_FORWARD',
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  SHRINK: 'SHRINK',
  VOLUME_HIGH: 'VOLUME_HIGH',
  VOLUME_LOW: 'VOLUME_LOW',
  VOLUME_MEDIUM: 'VOLUME_MEDIUM',
  VOLUME_MUTE: 'VOLUME_MUTE'
};

const ICON_MAP = {
  EXPAND: IoExpand,
  FAST_FORWARD: IoFastForward,
  PAUSE: IoPause,
  PLAY: IoPlay,
  SHRINK: IoShrink,
  VOLUME_HIGH: IoVolumeHigh,
  VOLUME_LOW: IoVolumeLow,
  VOLUME_MEDIUM: IoVolumeMedium,
  VOLUME_MUTE: IoVolumeMute
};

export {AVAILABLE_ICONS as availableIcons};
export {ICON_MAP as icons};

export default {
  availableIcons: AVAILABLE_ICONS,
  icons: ICON_MAP
};
