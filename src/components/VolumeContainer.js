// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {pure} from 'recompose';

const VolumeContainer = pure(({children, onMouseEnter, onMouseLeave, style = {}}) => (
  <div
    className="__vidz_volume_change__"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    role="button"
    style={style}
  >
    {children}
  </div>
));

VolumeContainer.propTypes = {
  children: PropTypes.node,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  style: PropTypes.object,
};

export default VolumeContainer;
