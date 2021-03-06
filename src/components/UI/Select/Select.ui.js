// @flow
import * as React from 'react';
import './Select.css';

type Props = {
  options: Array<{
    value: string | number,
    label: string
  }>,
  handleChange: (event: SyntheticEvent<HTMLSelectElement>) => void
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
