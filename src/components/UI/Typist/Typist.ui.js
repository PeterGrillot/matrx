// @flow
import React from 'react';
import Typist from 'react-typist';

export default (props: {children: string}) => (
  <Typist
    cursor={{ element: '▒' }}
  >{props.children}</Typist>
);
