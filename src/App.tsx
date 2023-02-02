import React, { useState } from 'react';

import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import FarmInfoTable from './components/FarmInfoTable/FarmInfoTable';
import Farm from './models/Farm';
import Difficulty from './models/Difficulty';
import { Buff } from './models/Buff';
import MK from './models/MK';
import FarmInsert from './components/FarmInsert/FarmInsert';
import GlobalOptions from './components/GlobalOptions/GlobalOptions';

const theme = createTheme();

function App() {
  const [mk, setMk] = useState(MK.On);
  const [difficulty, setDifficulty] = useState(Difficulty.Medium);
  const [farms, setFarms] = useState([new Farm([4, 2, 0], mk, difficulty, new Buff())]);

  const addFarm = (farm: Farm) => {
    setFarms([...farms, farm]);
  }

  const setOptions = (mk: MK, difficulty: Difficulty) => {
    setMk(mk);
    setDifficulty(difficulty);
    setFarms(farms.map(
      farm => (
        new Farm(farm.upgrades, mk, difficulty, farm.buffs)
      )
    ))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Farming Calculators
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginBottom: "100px" }}>
        <Stack
          spacing={2}
          justifyContent="center"
        >
          <Typography variant="h2" align="center">
            Farms
          </Typography>
          <GlobalOptions setOptions={setOptions} />
          <FarmInsert addFarm={addFarm}/>
          <FarmInfoTable farms={farms}/>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
