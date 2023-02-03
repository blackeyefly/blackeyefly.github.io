import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';


const Layout: FC = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default Layout;
