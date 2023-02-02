import React, { FC } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import Farm from '../../models/Farm';
import Utils from '../../models/utils';
import _ from 'lodash';
import { Tower } from '../../models/Tower';
import { Delete } from '@mui/icons-material';

interface FarmInfoTableProps {
  towers: Tower[],
  removeTower?: (index: number) => void,
}

const FarmInfoTable: FC<FarmInfoTableProps> = ({ towers, removeTower }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small">
      <TableHead>
        <TableRow>
          {Object.keys(new Farm()).map(x => 
          <TableCell align={["type", "upgrades", "buffs"].includes(x) ? "left" : "right"}>
            <Typography sx={{fontWeight: 'bold'}}>
              {_.startCase(x)}
            </Typography>
          </TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {towers.map((tower, towerIndex) => (
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">{tower.type}</TableCell>
            <TableCell align="left">{tower.showUpgrades()}</TableCell>
            <TableCell align="left">{tower.showBuffs()}</TableCell>
            <TableCell align="right">${tower.cost.toLocaleString()}</TableCell>
            <TableCell align="right">${tower.income.toLocaleString()}</TableCell>
            <TableCell align="right">{tower.efficiency.toFixed(2)}</TableCell>
            <TableCell align="right">{tower.sellEfficiency.toFixed(2)}</TableCell>
            <TableCell align="right">{tower.favoredSellEfficiency.toFixed(2)}</TableCell>
            <TableCell>
              <IconButton color="primary" aria-label="delete entry" onClick={() => {if (removeTower) removeTower(towerIndex) }}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell align="left"><Typography>Total</Typography></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right">${_.sum(_.map(towers, (tower) => tower.cost)).toLocaleString()}</TableCell>
        <TableCell align="right">${_.sum(_.map(towers, (tower) => tower.income)).toLocaleString()}</TableCell>
        <TableCell align="right"><Typography>{(_.sum(_.map(towers, (tower) => tower.cost)) / _.sum(_.map(towers, (tower) => tower.income))).toLocaleString()}</Typography></TableCell>
        <TableCell align="right"><Typography>-</Typography></TableCell>
        <TableCell align="right"><Typography>-</Typography></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export default FarmInfoTable;
