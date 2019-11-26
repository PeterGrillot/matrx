import * as React from 'react';
import './Button.css';

export const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.handleClick}
      data-num={props.number}
      data-vector={props.vector}
      key={props.index}
      style={{
        flexBasis: `${100 / props.width}%`,
        height: `${100 / props.height}%`
      }}
    >{props.label}</button>
  );
};
