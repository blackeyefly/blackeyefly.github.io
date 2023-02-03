import { Delete } from '@mui/icons-material';
import { Card, CardContent, Container, IconButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import { FC } from 'react';

import Farm from '../../models/Farm';
import { Tower } from '../../models/Tower';

interface FarmInfoTableProps {
  towers: Tower[],
  removeTower?: (index: number) => void,
}

const FarmInfoTable: FC<FarmInfoTableProps> = ({ towers, removeTower }) => (
  <Card>
    <CardContent>
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                {Object.keys(new Farm()).filter(x => x !== "farmCost").map(x => 
                <TableCell align={["type", "upgrades", "buffs"].includes(x) ? "left" : "right"}>
                  <Typography sx={{fontWeight: 'bold'}} noWrap>
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
                  <TableCell align="left"><Typography>{tower.type}</Typography></TableCell>
                  <TableCell align="left"><Typography>{tower.showUpgrades()}</Typography></TableCell>
                  <TableCell align="left"><Typography>{tower.showBuffs()}</Typography></TableCell>
                  <TableCell align="right"><Typography>${tower.cost.toLocaleString()}</Typography></TableCell>
                  <TableCell align="right"><Typography>${tower.income.toLocaleString()}</Typography></TableCell>
                  <TableCell align="right"><Typography>{isFinite(tower.efficiency) ? tower.efficiency.toFixed(2) : "-"}</Typography></TableCell>
                  <TableCell align="right"><Typography>${tower.sellValue.toLocaleString()}</Typography></TableCell>
                  <TableCell align="right"><Typography>${tower.favoredSellValue.toLocaleString()}</Typography></TableCell>
                  <TableCell align="right"><Typography>{isFinite(tower.efficiency) ? tower.sellEfficiency.toFixed(2) : "-"}</Typography></TableCell>
                  <TableCell align="right"><Typography>{isFinite(tower.efficiency) ? tower.favoredSellEfficiency.toFixed(2) : "-"}</Typography></TableCell>
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
                <TableCell align="left">
                  <Typography>
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="left" />
                <TableCell align="left" />
                <TableCell align="right">
                  <Typography>
                    ${_.sum(_.map(towers, (tower) => tower.cost)).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    ${_.sum(_.map(towers, (tower) => tower.income)).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {_.sum(_.map(towers, (tower) => tower.income)) ? (_.sum(_.map(towers, (tower) => tower.cost)) / _.sum(_.map(towers, (tower) => tower.income))).toLocaleString() : "-"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    ${_.sum(_.map(towers, (tower) => tower.sellValue)).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    ${_.sum(_.map(towers, (tower) => tower.favoredSellValue)).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {
                      _.sum(_.map(towers, (tower) => tower.income)) ? ((_.sum(_.map(towers, (tower) => tower.cost)) - _.sum(_.map(towers, (tower) => tower.sellValue))) / _.sum(_.map(towers, (tower) => tower.income))).toFixed(2) : "-"
                    }
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {_.sum(_.map(towers, (tower) => tower.income)) ? ((_.sum(_.map(towers, (tower) => tower.cost)) - _.sum(_.map(towers, (tower) => tower.favoredSellValue))) / _.sum(_.map(towers, (tower) => tower.income))).toFixed(2) : "-"}
                  </Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </CardContent>
  </Card>
);

export default FarmInfoTable;
