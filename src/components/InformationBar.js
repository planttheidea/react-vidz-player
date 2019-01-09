// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {pure} from 'recompose';

// utils
import {getTimeFormatFromCurrentTime} from '../utils';

const InformationBar = pure(({currentTime, duration, style}) => {
  const currentTimeDisplay = getTimeFormatFromCurrentTime(currentTime);
  const durationDisplay = getTimeFormatFromCurrentTime(duration);

  return (
    <div
      aria-label={`${currentTimeDisplay} out of ${duration} has passed`}
      style={style}
    >
      {currentTimeDisplay} / {durationDisplay}
    </div>
  );
});

InformationBar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
};

export default InformationBar;
