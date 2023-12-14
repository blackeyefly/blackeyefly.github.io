import { Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { createBuff } from '../../models/Buff';
import Difficulty from '../../models/Difficulty';
import MK from '../../models/MK';
import { Tower } from '../../models/Tower';
import Utils, { TowerType } from '../../models/utils';
import {HintTypes, Hints} from '../../models/ItemHints';

interface TowerInsertProps {
  addTower?: (tower: Tower, sacrifice?: boolean, oc?: Tower[]) => void,
  mk?: MK,
  difficulty?: Difficulty,
  sacrificedValue?: number,
  farmsSacrificed?: number,
  validTowers?: TowerType[],
  farmingModifiers?: boolean,
  abilityFarmingModifiers?: boolean,
}

const TowerInsert: FC<TowerInsertProps> = ({
  addTower,
  mk = MK.On,
  difficulty = Difficulty.Medium,
  sacrificedValue = 0,
  farmsSacrificed = 0,
  validTowers = Object.values(TowerType).filter((item) => {
      return isNaN(Number(item)) && item !== TowerType.None;
  }),
  farmingModifiers = false,
  abilityFarmingModifiers = false,
}) => {
  const [type, setType] = useState(validTowers[0]);
  const [path1, setPath1] = useState(0);
  const [path2, setPath2] = useState(0);
  const [path3, setPath3] = useState(0);
  const [paragon, setParagon] = useState(false);
  const [buffs, setBuffs] = useState(createBuff());
  const [remove, setRemove] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (addTower) {
      if (type === TowerType.Village) {
        addTower(new Tower(
            type,
            [path1, path2, path3],
            mk,
            difficulty,
            buffs,
            sacrificedValue,
            farmsSacrificed,
          ), remove && path3 === 5
        )
    } else {
        const oc = new Tower(
          TowerType.Engineer,
          [0, 4, 0],
          mk,
          difficulty,
          buffs
        )
        addTower(new Tower(
          type,
          [path1, path2, path3],
          mk,
          difficulty,
          buffs
        ), false, buffs.overclock ? [oc] : []);
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Container maxWidth="xl">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Stack spacing={4} direction="row">
                <TextField
                  label="Tower"
                  id="towertype-select"
                  required
                  value={type}
                  defaultValue="Farm"
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
                  id="path1"
                  label="Path 1"
                  type="number"
                  defaultValue={0}
                  value={path1}
                  InputProps={{
                    inputProps: { 
                      max: (path2 > 0 && path3 > 0 ? 0 : (path2 > 2 || path3 > 2 ? 2 : 5)), min: 0
                    }
                  }}
                  onChange={(e) => setPath1(parseInt(e.target.value))}
                  sx={{ width: "10%" }}
                />
                <TextField
                  required
                  id="path2"
                  label="Path 2"
                  type="number"
                  defaultValue={0}
                  value={path2}
                  InputProps={{
                    inputProps: { 
                      max: (path1 > 0 && path3 > 0 ? 0 : (path1 > 2 || path3 > 2 ? 2 : 5)), min: 0
                    }
                  }}
                  onChange={(e) => setPath2(parseInt(e.target.value))}
                  sx={{ width: "10%" }}
                />
                <TextField
                  required
                  id="path3"
                  label="Path 3"
                  type="number"
                  defaultValue={0}
                  value={path3}
                  InputProps={{
                    inputProps: { 
                      max: (path1 > 0 && path2 > 0 ? 0 : (path1 > 2 || path2 > 2 ? 2 : 5)), min: 0
                    }
                  }}
                  onChange={(e) => setPath3(parseInt(e.target.value))}
                  sx={{ width: "10%" }}
                />
                <TextField
                  required
                  id="discounts"
                  label="Discount Villages"
                  type="number"
                  defaultValue={0}
                  title={Hints.getHint(HintTypes.DiscountVillages)}
                  value={buffs.discountVillage}
                  InputProps={{
                    inputProps: { 
                      max: 3, min: 0 
                    }
                  }}
                  onChange={(e) => setBuffs({...buffs, discountVillage: parseInt(e.target.value)})}
                  sx={{ width: "15%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <Typography>
                    Add Tower
                  </Typography>
                </Button>
              </Stack>
              <Stack spacing={4} sx={{marginTop: "10px"}} direction="row">
                <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({
                  ...buffs,
                  firstFarm: e.target.checked,
                  firstMilitary: e.target.checked,
                  firstSpike: e.target.checked,
                })} />} label="First of its type of: Farm, Military Tower, or Spike" title={Hints.getHint(HintTypes.FirstOfType)} />
                {farmingModifiers &&
                  <>
                    <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, overclock: e.target.checked})}/>} label="Overclock/Ultraboost" title={Hints.getHint(HintTypes.OverclockUltraboost)} />
                    <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, city: e.target.checked})} />} label="Monkey City" title={Hints.getHint(HintTypes.MonkeyCity)} />
                    <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, fertilizer: e.target.checked})} disabled={path2 > 2 || path3 > 2 || type !== TowerType.Farm} />} label="Fertilizer" />
                  </>
                }
                {abilityFarmingModifiers &&
                  <>
                    <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, city: e.target.checked})} />} label="Monkey City" title={Hints.getHint(HintTypes.MonkeyCity)} />
                    <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, energizer: e.target.checked})} />} label="Energizer" />
                    {type === TowerType.Druid && <TextField
                      required
                      id="farms"
                      label="Farms in Range"
                      type="number"
                      defaultValue={0}
                      value={buffs.farmsInRange}
                      InputProps={{
                        inputProps: { 
                          min: 0 
                        }
                      }}
                      onChange={(e) => setBuffs({...buffs, farmsInRange: parseInt(e.target.value)})}
                      sx={{ width: "15%" }}
                    />}
                  </>
                }
                {[TowerType.Engineer, TowerType.Buccaneer].includes(type) &&
                  <FormControlLabel control={<Checkbox onChange={(e) => setParagon(e.target.checked)} />} label="Paragon" />
                }
                  {
                    type === TowerType.Village && path3 === 5 ?
                    <FormControlLabel control={<Checkbox onChange={(e) => setRemove(e.target.checked)} />} label="Remove Sacrifices from Table" /> :
                    null
                  }
              </Stack>
            </FormControl>
          </form>
        </Container>
      </CardContent>
    </Card>
  )
};

export default TowerInsert;
