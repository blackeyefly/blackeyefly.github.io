import { Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useState } from 'react';
import Buccaneer from '../../models/Buccaneer';
import { Buff, createBuff } from '../../models/Buff';
import Difficulty from '../../models/Difficulty';
import Farm from '../../models/Farm';
import MK from '../../models/MK';
import { Tower } from '../../models/Tower';
import Utils, { TowerType } from '../../models/utils';
import styles from './FarmInsert.module.css';

interface FarmInsertProps {
  addTower?: (tower: Tower) => void,
}

const FarmInsert: FC<FarmInsertProps> = ({ addTower }) => {
  const [type, setType] = useState(TowerType.Farm);
  const [path1, setPath1] = useState(0);
  const [path2, setPath2] = useState(0);
  const [path3, setPath3] = useState(0);
  const [buffs, setBuffs] = useState(createBuff());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (addTower) {
      if (type === TowerType.Farm) {
        addTower(new Farm(
          [path1, path2, path3],
          MK.On,
          Difficulty.Medium,
          buffs
        ));
      } else if (type === TowerType.Buccaneer) {
        addTower(new Buccaneer(
          [path1, path2, path3],
          MK.On,
          Difficulty.Medium,
          buffs
        ));
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Container>
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
                  sx={{ width: "20%" }}
                >
                  <MenuItem value="Farm">Farm</MenuItem>
                  <MenuItem value="Buccaneer">Buccaneer</MenuItem>
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
                      max: (path1 > 0 && path3 > 0 ? 0 : 2), min: 0 
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
                    Add Farm
                  </Typography>
                </Button>
              </Stack>
              <Stack spacing={4} sx={{marginTop: "10px"}} direction="row">
                <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, overclock: e.target.checked})} disabled={type !== TowerType.Farm}/>} label="Overclock" />
                <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, city: e.target.checked})} />} label="Monkey City" />
                <FormControlLabel control={<Checkbox onChange={(e) => setBuffs({...buffs, fertilizer: e.target.checked})} disabled={path2 > 2 || path3 > 2 || type !== TowerType.Farm} />} label="Fertilizer" />
                <FormControlLabel control={<Checkbox onChange={(e) => setBuffs(type === TowerType.Farm ? 
                  {
                    ...buffs,
                    firstFarm: e.target.checked,
                  } : {
                    ...buffs,
                    firstMilitary: e.target.checked
                  }
                  )} />} label="First Farm or First Military Tower" />
              </Stack>
            </FormControl>
          </form>
        </Container>
      </CardContent>
    </Card>
  )
};

export default FarmInsert;
