// @flow
import * as React from 'react';
import _ from 'lodash';
import Typist from 'react-typist';

import './Console.css';

const MAX_LENGTH = 8;
const USER_NAME = 'cnsle@Matrx~ $ ';

type Props = {
  message: Array<string>,
  expanded: boolean
}

export const Console = (props: Props) => {
  const { message, expanded } = props;
  const dynamicOpacity = (length: number, index: number) => {
    return (1 / (length - index)).toFixed(1);
  };
  return (
    <div className="Console" active={expanded ? 'active' : null}>
      {message.map((text, index) => {
        if (index === message.length - 1) {
          return (
            <span key={index}>
              {USER_NAME}&nbsp;<Typist cursor={{ element: '▒' }} key={index}>{text}</Typist>
            </span>
          );
        }
        if (index >= message.length - MAX_LENGTH) {
          return (
            <span
              key={index}
              style={{
                opacity: dynamicOpacity(message.length, index)
              }}><span>{USER_NAME}&nbsp;</span> {text}
            </span>
          );
        }
      })}
    </div>
  );
};
