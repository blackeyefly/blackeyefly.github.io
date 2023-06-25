import React from 'react';
import ReactDOM from 'react-dom';
import LeaderboardTable from './LeaderboardTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LeaderboardTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});