import React from 'react';
import ReactDOM from 'react-dom';
import TowerInsert from './TowerInsert';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TowerInsert />, div);
  ReactDOM.unmountComponentAtNode(div);
});