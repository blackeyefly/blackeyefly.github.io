import React, { FC } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Farm from '../../models/Farm';
import Utils from '../../models/utils';

interface FarmInfoTableProps {
  farms: Farm[],
}

const FarmInfoTable: FC<FarmInfoTableProps> = ({ farms }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small">
      <TableHead>
        <TableRow>
          {Object.keys(new Farm()).slice(1).map(x => 
          <TableCell align={["upgrades", "buffs"].includes(x) ? "left" : "right"}>
            <Typography sx={{fontWeight: 'bold'}}>
              {Utils.toTitleCase(x)}
            </Typography>
          </TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {farms.map((farm) => (
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">{farm.showUpgrades()}</TableCell>
            <TableCell align="left">Buffs</TableCell>
            <TableCell align="right">${farm.cost.toLocaleString()}</TableCell>
            <TableCell align="right">${farm.income.toLocaleString()}</TableCell>
            <TableCell align="right">{farm.efficiency.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FarmInfoTable;
