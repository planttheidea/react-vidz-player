// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {pure} from 'recompose';

const Track = pure(({style = {}}) => <div style={style} />);

Track.propTypes = {
  style: PropTypes.object,
};

export default Track;
