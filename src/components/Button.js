// external dependencies
import React, {
  PropTypes
} from 'react';
import {
  pure
} from 'recompose';

// icons
import {
  icons
} from '../icons';

const ICON_STYLE = {
  fontSize: 20
};

const Button = pure(({children, icon, label, onClick, style = {}}) => {
  const Icon = icons[icon];
  
  return (
    <div
      aria-label={label}
      onClick={onClick}
      role="button"
      style={style}
    >
      <Icon style={ICON_STYLE}/>

      {children}
    </div>
  ); 
});

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default Button;
