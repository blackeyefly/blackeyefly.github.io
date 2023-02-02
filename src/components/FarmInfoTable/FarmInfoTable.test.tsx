import { createRoot } from 'react-dom/client';
import Farm from '../../models/Farm';
import FarmInfoTable from './FarmInfoTable';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<FarmInfoTable towers={[new Farm()]}/>);
  root.unmount();
});