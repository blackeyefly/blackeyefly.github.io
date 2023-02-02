import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.css';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default Layout;
