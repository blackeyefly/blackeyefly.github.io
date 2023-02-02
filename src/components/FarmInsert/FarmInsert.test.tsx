import React from 'react';
import ReactDOM from 'react-dom';
import FarmInsert from './FarmInsert';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FarmInsert />, div);
  ReactDOM.unmountComponentAtNode(div);
});