import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Farm from '../../models/Farm';
import FarmInfoTable from './FarmInfoTable';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  // ReactDOM.render(<FarmInfoTable />, div);
  root.render(<FarmInfoTable towers={[new Farm()]}/>);
  // ReactDOM.unmountComponentAtNode(div);
  root.unmount();
});