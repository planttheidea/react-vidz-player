// external dependencies
import React, {
  PropTypes
} from 'react';
import {
  pure
} from 'recompose';

const Display = pure(({children, onClick, style = {}}) => {
  return (
    <div
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
});

Display.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default Display;
