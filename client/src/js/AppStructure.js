import React from 'react';
import Header from './Header';

const AppStructure = props =>
  <div>
    <Header />
    {props.children}
  </div>;

export default AppStructure;