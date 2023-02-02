import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default Layout;
