import React from 'react';
import ReactDOM from 'react-dom';
import GlobalOptions from './GlobalOptions';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GlobalOptions />, div);
  ReactDOM.unmountComponentAtNode(div);
});