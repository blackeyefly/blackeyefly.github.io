import React from 'react';
import ReactDOM from 'react-dom';
import ActionFigureTable from './ActionFigureTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActionFigureTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});