// @flow
import * as React from 'react';
import './index.css';

type Props = {
  message: string
}

export const Message = (props: Props) => {
  const { message } = props;
  return (
    <div
      className="Message"
    >
      <p>{message}</p>
    </div>
  );
};
