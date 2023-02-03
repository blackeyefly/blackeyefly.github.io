import { ThemeProvider } from '@emotion/react';
import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Card, Container, createTheme, CssBaseline, IconButton, Modal, Stack, Toolbar, Typography } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import FarmInfoTable from '../components/FarmInfoTable/FarmInfoTable';
import FarmInsert from '../components/FarmInsert/FarmInsert';
import GlobalOptions from '../components/GlobalOptions/GlobalOptions';
import Buccaneer from '../models/Buccaneer';
import Difficulty from '../models/Difficulty';
import Farm from '../models/Farm';
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

function Home() {
    const [mk, setMk] = useState(MK.On);
    const [difficulty, setDifficulty] = useState(Difficulty.Medium);
    const [towers, setTowers] = useState<any[]>([]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {setOpen(true); console.log(towers)};
    const handleClose = () => setOpen(false);

    const updateTowers = (towers: Tower[]) => {
      var buccaneersBuffed = 0;
      return towers.map(
        tower => {
          if (tower.type === TowerType.Farm && tower.upgrades[0] === 4) {
            tower = new Farm(
              tower.upgrades,
              mk,
              difficulty,
              {
                ...tower.buffs,
                central: towers.some(
                  x => x.type === TowerType.Farm && x.upgrades[0] === 5
                )
              }
            )
          }

          if (tower.type === TowerType.Buccaneer && tower.upgrades[2] >= 3) {
            tower = new Buccaneer(
              tower.upgrades,
              mk,
              difficulty,
              {
                ...tower.buffs,
                centralMarkets: Math.min(towers.filter(x => x.type === TowerType.Farm && x.upgrades[2] >= 4).length, 10)
              }
            )

            const tradeEmpires = towers.filter(x => x.type === TowerType.Buccaneer && x.upgrades[2] === 5).length;
            if (tradeEmpires && tower.upgrades[2] < 5 && buccaneersBuffed <= 20 * tradeEmpires) {
              const merchantmen = towers.filter(x => x.type === TowerType.Buccaneer && x.upgrades[2] === 3).length;
              const favored = towers.filter(x => x.type === TowerType.Buccaneer && x.upgrades[2] === 4).length;
              tower = new Buccaneer(
                tower.upgrades,
                mk,
                difficulty,
                {
                  ...tower.buffs,
                  tradeEmpireMerchantmen: Math.min(merchantmen + favored, 20),
                  tradeEmpireFavored: Math.min(favored, 20),
                }
              )
              buccaneersBuffed++;
            } else {
              tower = new Buccaneer(
                tower.upgrades,
                mk,
                difficulty,
                {
                  ...tower.buffs,
                  tradeEmpireMerchantmen: 0,
                  tradeEmpireFavored: 0,
                }
              )
            }
          }

          return tower;
        }
      )
    }
  
    const addTower = (tower: Tower, sacrifice = false) => {
      let newTowers = [...(sacrifice ? towers.filter(tower => tower.type !== TowerType.Farm || tower.upgrades.some((x: number) => x === 5)) : towers), tower];
      newTowers = updateTowers(newTowers);
      setTowers(newTowers);
    }

    const removeTower = (index: number) => {
      let newTowers = towers.slice(0, index).concat(towers.slice(index + 1));
      newTowers = updateTowers(newTowers);
      setTowers(newTowers);
    }
  
    const setOptions = (mk: MK, difficulty: Difficulty) => {
      setMk(mk);
      setDifficulty(difficulty);
      setTowers(towers.map(
        tower => {
          if (tower.type === TowerType.Farm) {
            return new Farm(tower.upgrades, mk, difficulty, tower.buffs);
          } else if (tower.type === TowerType.Buccaneer){
            return new Buccaneer(tower.upgrades, mk, difficulty, tower.buffs);
          }
        }
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
              Round-Based Income
              <IconButton color="primary" aria-label="help" component="label" onClick={handleOpen}>
                <HelpIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Card sx={style}>
                  <Typography variant="body1" align="center">
                    This page is designed to help calculate various metrics for simple round-based income sources.
                    <br/>
                    <br/>
                    Banks, bloon trap, ability-based income, or other income that varies per round are not considered here. Some numbers may be off by small amounts due to rounding weirdness, especially with discounts and non-Medium difficulties.
                  </Typography>
                </Card>
              </Modal>
            </Typography>
            <GlobalOptions setOptions={setOptions} />
            <FarmInsert
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
            <FarmInfoTable towers={towers} removeTower={removeTower}/>
          </Stack>
        </Container>
      </ThemeProvider>
    );  
}

export default Home;