import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-sphere
    {...props}
    lock-on-target='points:-1'
    color='lightblue'
  />
)