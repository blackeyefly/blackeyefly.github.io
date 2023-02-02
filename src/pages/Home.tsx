import { ThemeProvider } from '@emotion/react';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Stack, createTheme } from '@mui/material';
import React, { useState } from 'react';
import FarmInfoTable from '../components/FarmInfoTable/FarmInfoTable';
import FarmInsert from '../components/FarmInsert/FarmInsert';
import GlobalOptions from '../components/GlobalOptions/GlobalOptions';
import Buccaneer from '../models/Buccaneer';
import Difficulty from '../models/Difficulty';
import Farm from '../models/Farm';
import MK from '../models/MK';
import { Tower, TowerType } from '../models/Tower';


const theme = createTheme();

function Home() {
    const [mk, setMk] = useState(MK.On);
    const [difficulty, setDifficulty] = useState(Difficulty.Medium);
    const [towers, setTowers] = useState<any[]>([]);

    const updateTowers = (towers: Tower[]) => {
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

            var tradeEmpires = towers.filter(x => x.type === TowerType.Buccaneer && x.upgrades[2] === 5).length;
            if (tradeEmpires && tower.upgrades[2] < 5) {
              var merchantmen = towers.filter(x => x.type === TowerType.Buccaneer && x.upgrades[2] === 3).length;
              var favored = towers.filter(x => x.type === TowerType.Buccaneer && x.upgrades[2] === 4).length;
              tower = new Buccaneer(
                tower.upgrades,
                mk,
                difficulty,
                {
                  ...tower.buffs,
                  tradeEmpireMerchantmen: Math.min(merchantmen, 20 * tradeEmpires - favored),
                  tradeEmpireFavored: Math.min(favored, 20 * tradeEmpires - merchantmen),
                }
              )
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
  
    const addTower = (tower: Tower) => {
      var newTowers = [...towers, tower];
      newTowers = updateTowers(newTowers);
      setTowers(newTowers);
    }

    const removeTower = (index: number) => {
      var newTowers = towers.slice(0, index).concat(towers.slice(index + 1));
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
        <Container sx={{ marginBottom: "100px" }}>
          <Stack
            spacing={2}
            justifyContent="center"
          >
            <Typography variant="h2" align="center">
              Farms
            </Typography>
            <GlobalOptions setOptions={setOptions} />
            <FarmInsert addTower={addTower}/>
            <FarmInfoTable towers={towers} removeTower={removeTower}/>
          </Stack>
        </Container>
      </ThemeProvider>
    );  
}

export default Home;