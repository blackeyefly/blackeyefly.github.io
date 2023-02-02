import { Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useState } from 'react';
import { Buff } from '../../models/Buff';
import Difficulty from '../../models/Difficulty';
import Farm from '../../models/Farm';
import MK from '../../models/MK';
import styles from './FarmInsert.module.css';

interface FarmInsertProps {
  addFarm?: (farm: Farm) => void,
}

const FarmInsert: FC<FarmInsertProps> = ({ addFarm }) => {
  const [path1, setPath1] = useState(0);
  const [path2, setPath2] = useState(0);
  const [path3, setPath3] = useState(0);
  const [overclock, setOverclock] = useState(false);
  const [discountVillage, setDiscountVillage] = useState(0);
  const [firstFarm, setFirstFarm] = useState(false);
  const [ultraboosts, setUltraboosts] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (addFarm) {
      addFarm(new Farm(
        [path1, path2, path3],
        MK.On,
        Difficulty.Medium,
        new Buff(discountVillage, firstFarm, overclock, ultraboosts)
      ));
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
                  required
                  id="path1"
                  label="Path 1"
                  type="number"
                  defaultValue={0}
                  value={path1}
                  onChange={(e) => setPath1(parseInt(e.target.value))}
                />
                <TextField
                  required
                  id="path2"
                  label="Path 2"
                  type="number"
                  defaultValue={0}
                  value={path2}
                  onChange={(e) => setPath2(parseInt(e.target.value))}
                />
                <TextField
                  required
                  id="path3"
                  label="Path 3"
                  type="number"
                  defaultValue={0}
                  value={path3}
                  onChange={(e) => setPath3(parseInt(e.target.value))}
                />
                <TextField
                  required
                  id="discounts"
                  label="Discount Villages"
                  type="number"
                  defaultValue={0}
                  value={discountVillage}
                  onChange={(e) => setDiscountVillage(parseInt(e.target.value))}
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
              <Stack spacing={4} sx={{marginTop: "10px"}} width="20%">
                <FormControlLabel control={<Checkbox onChange={(e) => setOverclock(e.target.checked)} />} label="Overclock" />
              </Stack>
            </FormControl>
          </form>
        </Container>
      </CardContent>
    </Card>
  )
};

export default FarmInsert;
