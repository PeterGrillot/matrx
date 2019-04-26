// @flow
import * as React from 'react';
import Typist from 'react-typist';

import './index.css';

type Props = {
  message: string,
  expanded: boolean
}

export const Message = (props: Props) => {
  return (
    <div className="Message" active={props.expanded ? 'active' : null}>
      <span>$~ Console@Matrx</span>
      <Typist key={props.message}>{props.message}</Typist>
    </div>
  );
};
