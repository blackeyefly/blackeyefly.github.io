import { Button, Card, CardContent, Checkbox, Container, FormControlLabel, InputLabel, Menu, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import Difficulty from '../../models/Difficulty';
import MK from '../../models/MK';
import styles from './GlobalOptions.module.css';

interface GlobalOptionsProps {
  setOptions?: (mk: MK, difficulty: Difficulty) => void,
}

const GlobalOptions: FC<GlobalOptionsProps> = ({ setOptions }) => {
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
        <Container>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} sx={{marginTop: "10px"}} direction="row">
              <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setMk(e.target.checked ? MK.On : MK.Off)} />} label="Monkey Knowledge" />
              <Select
                labelId="difficulty-label"
                id="difficulty-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Impoppable">Impoppable</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                <Typography>
                  Set Options
                </Typography>
              </Button>
                
            </Stack>
          </form>
        </Container>
      </CardContent>
    </Card>
  )
};

export default GlobalOptions;
