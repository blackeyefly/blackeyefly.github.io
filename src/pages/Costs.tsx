import { ThemeProvider } from '@emotion/react';
import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Card, Container, createTheme, CssBaseline, IconButton, Modal, Stack, Toolbar, Typography } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import GlobalOptions from '../components/GlobalOptions/GlobalOptions';
import TowerInfoTable from '../components/TowerInfoTable/TowerInfoTable';
import TowerInsert from '../components/TowerInsert/TowerInsert';
import Difficulty from '../models/Difficulty';
import MK from '../models/MK';
import { Tower, TowerType } from '../models/Tower';


const theme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Costs() {
    const [mk, setMk] = useState(MK.On);
    const [difficulty, setDifficulty] = useState(Difficulty.Medium);
    const [towers, setTowers] = useState<any[]>([]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const addTower = (tower: Tower, sacrifice = false) => {
      const newTowers = [...(sacrifice ? towers.filter(tower => tower.type !== TowerType.Farm || tower.upgrades.some((x: number) => x === 5)) : towers), tower];
      setTowers(newTowers);
    }

    const removeTower = (index: number) => {
      const newTowers = towers.slice(0, index).concat(towers.slice(index + 1));
      setTowers(newTowers);
    }
  
    const setOptions = (mk: MK, difficulty: Difficulty) => {
      setMk(mk);
      setDifficulty(difficulty);
      setTowers(towers.map(
        tower => new Tower(tower.type, tower.upgrades, mk, difficulty, tower.buffs)
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
        <Container sx={{ marginBottom: "100px" }} maxWidth="xl">
          <Stack
            spacing={2}
            justifyContent="center"
          >
            <Typography variant="h2" align="center">
              Cost Calculator
              <IconButton color="primary" aria-label="help" component="label" onClick={handleOpen}>
                <HelpIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Card sx={style}>
                  <Typography variant="body1" align="center">
                    This page is designed to help calculate costs of towers.
                  </Typography>
                </Card>
              </Modal>
            </Typography>
            <GlobalOptions setOptions={setOptions} />
            <TowerInsert
              addTower={addTower}
              mk={mk}
              difficulty={difficulty}
              sacrificedValue={
                _.sum(towers.filter(tower => {
                  return tower.type === TowerType.Farm && tower.upgrades.every((x: number) => x < 5);
                }).map((tower) => tower.farmCost))
              }
              farmsSacrificed={
                towers.filter(tower => {
                  return tower.type === TowerType.Farm && tower.upgrades.every((x: number) => x < 5);
                }).length
              }
            />
            <TowerInfoTable towers={towers} removeTower={removeTower}/>
          </Stack>
        </Container>
      </ThemeProvider>
    );  
}

export default Costs;