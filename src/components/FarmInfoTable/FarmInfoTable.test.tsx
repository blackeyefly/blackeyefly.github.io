import { createRoot } from 'react-dom/client';
import { Tower } from '../../models/Tower';
import { TowerType } from '../../models/utils';
import FarmInfoTable from './FarmInfoTable';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<FarmInfoTable towers={[new Tower(TowerType.Farm)]}/>);
  root.unmount();
});