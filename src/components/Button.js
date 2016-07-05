// external dependencies
import React, {
  PropTypes
} from 'react';
import {
  pure
} from 'recompose';

const Button = pure(({children, icon, label, onClick, style = {}}) => {
  return (
    <div
      aria-label={label}
      onClick={onClick}
      role="button"
      style={style}
    >
      <i className={icon}/>

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
