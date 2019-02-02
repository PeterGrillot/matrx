// @flow
import * as React from 'react';
import './index.css';

type Props = {
  options: Array<{
    value: string | number,
    label: string
  }>
}

export const Select = (props: Props) => {
  return (
    <select
      className="Select"
      onChange={props.handleChange}
      defaultValue={props.options[0].value}>
      {props.options.map((option, index) => {
        return (
          <option
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
