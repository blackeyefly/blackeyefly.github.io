import React, { FC, useState } from 'react';
import './ParagonDegreeCalculator.css';

import Utils, { TowerType } from '../../models/utils';
import { Card, CardContent, Container, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Difficulty from '../../models/Difficulty';
import GlobalOptions from '../GlobalOptions/GlobalOptions';
import MK from '../../models/MK';

interface ParagonDegreeCalculatorProps { }

const ParagonDegreeCalculator: FC<ParagonDegreeCalculatorProps> = () => {

  const [difficulty, setDifficulty] = useState(Difficulty.Medium)

  const setOptions = (mk: MK, difficulty: Difficulty) => {
    setDifficulty(difficulty);
  }

  const validTowers = [
    TowerType.Dart,
    TowerType.Boomerang,
    TowerType.Tack,
    TowerType.Sub,
    TowerType.Buccaneer,
    TowerType.Ace,
    TowerType.Wizard,
    TowerType.Ninja,
    TowerType.Engineer
  ]
  const [type, setType] = useState(TowerType.Dart);
  const [cashSpent, setCashSpent] = useState(0);
  const [cashSpentSlider, setCashSpentSlider] = useState(0);
  const [upgrades, setUpgrades] = useState(0);
  const [pops, setPops] = useState(0);
  const [cashGenerated, setCashGenerated] = useState(0);
  const [tier5s, setTier5s] = useState(0);
  const [totems, setTotems] = useState(0);

  function requiredPower(degree: number) {
    if (degree === 1) {
      return 0;
    } else if (degree === 100) {
      return 200000; // Degree 100 is an exception, requiring 100 power
    } else {
      return Math.floor((50 * Math.pow(degree, 3) + 5025 * Math.pow(degree, 2) + 168324 * degree + 843000) / 600)
    }
  }

  function requiredPowerToNext(degree: number) {
    if (degree >= 100) {
      return 0;
    }
    return requiredPower(degree + 1) - requiredPower(degree);
  }

  function paragonPower(
    type: TowerType,
    difficulty: Difficulty,
    cashSpent: number,
    upgrades: number,
    pops: number,
    tier5s: number,
    totems: number
  ) {
    const paragonCost = Utils.paragonCost(type, difficulty);
    return Math.min(6000 * tier5s, 50000) +
    Math.min(cashSpent / (paragonCost / 20000), 60000) +
    Math.min(100 * upgrades, 10000) +
    Math.min(pops / 180, 90000) +
    2000 * totems
  }

  function degree(
    type: TowerType,
    difficulty: Difficulty,
    cashSpent: number,
    upgrades: number,
    pops: number,
    tier5s: number,
    totems: number
  ) {
    // const paragonCost = Utils.paragonCost(type, difficulty);
    // const power =
    //   Math.min(6000 * tier5s, 50000) +
    //   Math.min(cashSpent / (paragonCost / 20000), 60000) +
    //   Math.min(100 * upgrades, 10000) +
    //   Math.min(pops / 180, 90000) +
    //   2000 * totems
    const power = paragonPower(type, difficulty, cashSpent, upgrades, pops, tier5s, totems);

    if (power < requiredPower(2)) {
      return 1;
    }
    for (let degree = 1; degree <= 100; degree++) {
      if (power < requiredPower(degree)) {
        return degree - 1;
      }
    }
    return 100;
  }

  return (
    <Card>
      <CardContent>
        <Stack
          spacing="20px"
          justifyContent="center"
        >
          <Stack
            spacing="20px"
            justifyContent="center"
          >
            <GlobalOptions setOptions={setOptions} includeMK={false} />
            <Stack direction="row" spacing="10px">
              <TextField
                label="Tower"
                id="towertype-select"
                required
                value={type}
                defaultValue="Dart"
                onChange={(e) => (setType(Utils.enumFromStringValue(TowerType, e.target.value) || TowerType.None))}
                select
                sx={{ minWidth: "20%" }}
              >
                {
                  validTowers.map(type => <MenuItem value={type}>{type}</MenuItem>)
                }
              </TextField>
              <TextField
                required
                id="cashspent"
                label="Cash Spent Normally"
                type="number"
                defaultValue={0}
                value={cashSpent}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: Utils.paragonCost(type, difficulty) * 3
                  }
                }}
                onChange={(e) => setCashSpent(
                  Math.max(0, Math.min(Utils.paragonCost(type, difficulty) * 3, parseInt(e.target.value))) || 0
                )}
                sx={{ width: "15%" }}
              />
              <TextField
                required
                id="cashspentslider"
                label="Cash Spent in Slider"
                type="number"
                defaultValue={0}
                value={cashSpentSlider}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: Math.ceil(Utils.paragonCost(type, difficulty) * 3 / 0.95)
                  }
                }}
                onChange={(e) => setCashSpentSlider(
                  Math.max(0, Math.min(Math.ceil(Utils.paragonCost(type, difficulty) * 3 / 0.95), parseInt(e.target.value))) || 0
                )}
                sx={{ width: "15%" }}
              />
              <TextField
                required
                id="upgrades"
                label="Upgrades (after first 3 Tier 5s)"
                type="number"
                defaultValue={0}
                value={upgrades}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 100
                  }
                }}
                onChange={(e) => setUpgrades(
                  Math.max(0, Math.min(100, parseInt(e.target.value))) || 0
                )}
                sx={{ width: "15%" }}
              />
            </Stack>
            <Stack direction="row" spacing="10px">
              <TextField
                required
                id="pops"
                label="Combined Pops"
                type="number"
                defaultValue={0}
                value={pops}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 16200000
                  }
                }}
                onChange={(e) => setPops(
                  Math.max(0, Math.min(16200000, parseInt(e.target.value))) || 0
                )}
                sx={{ width: "15%" }}
              />
              <TextField
                required
                id="cash"
                label="Combined Cash Generated"
                type="number"
                defaultValue={0}
                value={cashGenerated}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 4050000
                  }
                }}
                onChange={(e) => setCashGenerated(
                  Math.max(0, Math.min(4050000, parseInt(e.target.value))) || 0
                )}
                sx={{ width: "15%" }}
              />
              <TextField
                required
                id="tier5"
                label="Additional Tier 5s"
                type="number"
                defaultValue={0}
                value={tier5s}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 9
                  }
                }}
                onChange={(e) => setTier5s(
                  Math.max(0, Math.min(9, parseInt(e.target.value))) || 0
                )}
                sx={{ width: "15%" }}
              />
              <TextField
                required
                id="totems"
                label="Paragon Power Totems"
                type="number"
                defaultValue={0}
                value={totems}
                InputProps={{
                  inputProps: {
                    min: 0,
                  }
                }}
                onChange={(e) => setTotems(
                  Math.max(0, parseInt(e.target.value)) || 0
                )}
                sx={{ width: "15%" }}
              />
          </Stack>
            <Typography>
              Paragon Degree: {degree(type, difficulty, cashSpent + 0.95 * cashSpentSlider, upgrades, pops + 4 * cashGenerated, tier5s, totems)}
            </Typography>
            <Typography>
              Paragon Power: {Math.floor(paragonPower(type, difficulty, cashSpent + 0.95 * cashSpentSlider, upgrades, pops + 4 * cashGenerated, tier5s, totems))}
            </Typography>
            <Typography>
              Power to Next Degree: {
                Math.floor(paragonPower(type, difficulty, cashSpent + 0.95 * cashSpentSlider, upgrades, pops + 4 * cashGenerated, tier5s, totems)) - requiredPower(degree(type, difficulty, cashSpent + 0.95 * cashSpentSlider, upgrades, pops + 4 * cashGenerated, tier5s, totems))
              } / {
                requiredPowerToNext(degree(type, difficulty, cashSpent + 0.95 * cashSpentSlider, upgrades, pops + 4 * cashGenerated, tier5s, totems))
              }
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default ParagonDegreeCalculator;
