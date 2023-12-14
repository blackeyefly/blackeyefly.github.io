import React, { FC, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';


const NavBar: FC = () => {
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
                  Round-Based Income
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/#/abilityincome">
                  Ability-Based Income
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/#/costs">
                  Tower Costs
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/#/actionfigure">
                  Action Figure Income
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding>
                <ListItemButton href="/#/bossleaderboards">
                  Past Boss Leaderboards
                </ListItemButton>
              </ListItem> */}
              <ListItem disablePadding>
                <ListItemButton href="/#/paragondegree">
                  Paragon Degree
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
          BTD6 Calculators
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
}

export default NavBar;
