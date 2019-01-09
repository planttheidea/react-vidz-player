// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {pure} from 'recompose';

const TrackButton = pure(({label, onMouseDown, style = {}}) => (
  // eslint workaround
  <span
    aria-label={label}
    onMouseDown={onMouseDown}
    role="button"
    style={style}
  />
));

TrackButton.propTypes = {
  onMouseDown: PropTypes.func,
  style: PropTypes.object,
};

export default TrackButton;
