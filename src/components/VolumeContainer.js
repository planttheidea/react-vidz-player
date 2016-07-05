// external dependencies
import React, {
  PropTypes
} from 'react';
import {
  pure
} from 'recompose';

const VolumeContainer = pure(({children, onMouseEnter, onMouseLeave, style = {}}) => {
  return (
    <div
      className="__vidz_volume_change__"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      style={style}
    >
      {children}
    </div>
  );
});

VolumeContainer.propTypes = {
  children: PropTypes.node,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  style: PropTypes.object
};

export default VolumeContainer;
