// external dependencies
import React, {
  PropTypes
} from 'react';
import {
  pure
} from 'recompose';

const TrackButton = pure(({label, onMouseDown, style = {}}) => {
  return (
    <span
      aria-label={label}
      onMouseDown={onMouseDown}
      role="button"
      style={style}
    />
  );
});

TrackButton.propTypes = {
  onMouseDown: PropTypes.func,
  style: PropTypes.object
};

export default TrackButton;
