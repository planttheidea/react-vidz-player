// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {pure} from 'recompose';

const Display = pure(({children, onClick, style = {}}) => (
  <div
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
));

Display.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Display;
