import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import AbilityIncome from './pages/AbilityIncome';
import ActionFigure from './pages/ActionFigure';
import Costs from './pages/Costs';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import PastLeaderboards from './pages/PastLeaderboards';

export default function App() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/costs" element={<Costs />} />
            <Route path="/abilityincome" element={<AbilityIncome />} />
            <Route path="/actionfigure" element={<ActionFigure />} />
            <Route path="/bossleaderboards" element={<PastLeaderboards />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
  );
}

// ReactDOM.render(<App />, document.getElementById("root"));