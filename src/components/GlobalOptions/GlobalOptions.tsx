import { Button, Card, CardContent, Checkbox, Container, FormControlLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import Difficulty from '../../models/Difficulty';
import MK from '../../models/MK';
import {HintTypes, Hints} from '../../models/ItemHints';

interface GlobalOptionsProps {
  setOptions?: (mk: MK, difficulty: Difficulty) => void,
  includeMK?: boolean,
}

const GlobalOptions: FC<GlobalOptionsProps> = ({ setOptions, includeMK = true }) => {
  const [mk, setMk] = useState(MK.On);
  const [difficulty, setDifficulty] = useState("Medium");

  const difficultyDict: Record<string, Difficulty> = {
    "Easy": Difficulty.Easy,
    "Medium": Difficulty.Medium,
    "Hard": Difficulty.Hard,
    "Impoppable": Difficulty.Impoppable,
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (setOptions) {
      setOptions(mk, difficultyDict[difficulty]);
    }
  }

  return (
    <Card>
      <CardContent>
        <Container maxWidth="xl">
          <Stack spacing={4} direction="row">
            {includeMK &&
              <FormControlLabel control={
                <Checkbox defaultChecked onChange={(e) => {
                  setMk(e.target.checked ? MK.On : MK.Off);
                  if (setOptions) {
                    setOptions(e.target.checked ? MK.On : MK.Off, difficultyDict[difficulty]);
                  }
                }} />
              } label="Monkey Knowledge"  title={Hints.getHint(HintTypes.MonkeyKnowledge)} />}
            <TextField
              label="Difficulty"
              value={difficulty}
              sx={{ width: "20%" }}
              onChange={(e) => {
                setDifficulty(e.target.value);
                if (setOptions) {
                  setOptions(mk, difficultyDict[e.target.value]);
                }
              }}
              select
            >
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
              <MenuItem value="Impoppable">Impoppable</MenuItem>
            </TextField>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  )
};

export default GlobalOptions;
