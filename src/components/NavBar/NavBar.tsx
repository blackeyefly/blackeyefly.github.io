import React, { FC, useState } from 'react';
import styles from './NavBar.module.css';

import { AppBar, Box, CssBaseline, Drawer, IconButton, Link, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => 
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  }

  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton href="/">
                  Farms
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding>
                <ListItemButton href="/nopage">
                  NoPage
                </ListItemButton>
              </ListItem> */}
            </List>
          </Box>
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farming Calculators
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
}

export default NavBar;
