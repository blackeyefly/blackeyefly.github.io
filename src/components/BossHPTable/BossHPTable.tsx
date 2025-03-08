import React, { FC, useState } from 'react';

import Utils, { BossType, TowerType } from '../../models/utils';
import { Card, CardContent, Container, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import _ from 'lodash';

interface BossHPTableProps { }

const BossHPTable: FC<BossHPTableProps> = () => {
  const [boss, setBoss] = useState('Bloonarius');
  const [elite, setElite] = useState("Normal");
  const [percentage, setPercentage] = useState(100);
  const [players, setPlayers] = useState(1);

  const validBosses = Object.keys(BossType).filter(boss => {return isNaN(Number(boss))});

  return (
    <Card>
      <CardContent>
        <Stack spacing="10px">
          <Container maxWidth="xl">
            <Stack spacing="10px" direction="row">
              <TextField
                required
                id="boss"
                label="Boss"
                select
                value={boss}
                onChange={(e) => setBoss(e.target.value)}
                sx={{ width: "15%" }}
              >
                {
                  validBosses.map(type => <MenuItem value={type}>{type}</MenuItem>)
                }
              </TextField>
              <TextField
                required
                id="elite"
                label="Normal or Elite"
                select
                value={elite}
                onChange={(e) => setElite(e.target.value)}
                sx={{ width: "15%" }}
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Elite">Elite</MenuItem>
              </TextField>
              <TextField
                required
                id="percentage"
                label="Boss Health Percentage"
                type="number"
                defaultValue={100}
                value={percentage}
                InputProps={{
                  inputProps: { 
                    min: 0
                  }
                }}
                onChange={(e) => setPercentage(parseInt(e.target.value) || 1)}
                sx={{ width: "15%" }}
              />
              <TextField
                required
                id="players"
                label="Number of Players"
                type="number"
                defaultValue={1}
                value={players}
                InputProps={{
                  inputProps: { 
                    min: 1,
                    max: 4
                  }
                }}
                onChange={(e) => setPlayers(parseInt(e.target.value))}
                sx={{ width: "15%" }}
              />
            </Stack>
          </Container>
          <Container>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography sx={{fontWeight: 'bold'}} noWrap>
                        Tier
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{fontWeight: 'bold'}} noWrap>
                        Total HP
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{fontWeight: 'bold'}} noWrap>
                        HP Per Skull
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    _.range(1, 6).map((tier) => (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          {tier}
                        </TableCell>
                        <TableCell>
                          {Utils.bossHP(boss as BossType, elite === "Elite", tier, percentage, players).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {Utils.bossSegmentHP(boss as BossType, elite === "Elite", tier, percentage, players).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default BossHPTable;
