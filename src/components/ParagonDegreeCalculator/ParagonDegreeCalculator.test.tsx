import React from 'react';
import ReactDOM from 'react-dom';
import ParagonDegreeCalculator from './ParagonDegreeCalculator';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ParagonDegreeCalculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});