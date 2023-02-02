import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));