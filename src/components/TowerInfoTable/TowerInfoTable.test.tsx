import ReactDOM from 'react-dom';
import TowerInfoTable from './TowerInfoTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TowerInfoTable towers={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});