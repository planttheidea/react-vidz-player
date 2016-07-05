// external dependencies
import React, {
  PropTypes
} from 'react';
import {
  pure
} from 'recompose';

const Track = pure(({style = {}}) => {
  return (
    <div style={style}/>
  );
});

Track.propTypes = {
  style: PropTypes.object
};

export default Track;
