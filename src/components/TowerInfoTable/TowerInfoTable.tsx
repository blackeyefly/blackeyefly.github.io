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

import { Tower } from '../../models/Tower';

const cell = (label: string, tower?: Tower, towers: Tower[] = []) => {
  if (label === "type") {
    return <TableCell align="left"><Typography>{tower ? tower.type : "Total"}</Typography></TableCell>;
  } else if (label === "upgrades") {
    return <TableCell align="left"><Typography>{tower ? tower.showUpgrades() : ""}</Typography></TableCell>;
  } else if (label === "buffs") {
    return <TableCell align="left"><Typography>{tower ? tower.showBuffs() : ""}</Typography></TableCell>;
  } else if (label === "cost") {
    return <TableCell align="right"><Typography>${tower ? tower.cost.toLocaleString() : _.sum(_.map(towers, (tower) => tower.cost)).toLocaleString()}</Typography></TableCell>;
  } else if (label === "sellValue") {
    return <TableCell align="right"><Typography>${tower ? tower.sellValue.toLocaleString() : _.sum(_.map(towers, (tower) => tower.sellValue)).toLocaleString()}</Typography></TableCell>;
  } else if (label === "favoredSellValue") {
    return <TableCell align="right"><Typography>${tower ? tower.favoredSellValue.toLocaleString() : _.sum(_.map(towers, (tower) => tower.favoredSellValue)).toLocaleString()}</Typography></TableCell>;
  } else if (label === "income") {
    return <TableCell align="right"><Typography>${tower ? tower.income.toLocaleString() : _.sum(_.map(towers, (tower) => tower.income)).toLocaleString()}</Typography></TableCell>;
  } else if (label === "efficiency") {
    return <TableCell align="right"><Typography>{tower ? (isFinite(tower.efficiency) ? tower.efficiency.toFixed(2) : "-") : (_.sum(_.map(towers, (tower) => tower.income)) ? (_.sum(_.map(towers, (tower) => tower.cost)) / _.sum(_.map(towers, (tower) => tower.income))).toFixed(2) : "-")}</Typography></TableCell>;
  } else if (label === "sellEfficiency") {
    return <TableCell align="right"><Typography>{tower ? (isFinite(tower.efficiency) ? tower.sellEfficiency.toFixed(2) : "-") : (_.sum(_.map(towers, (tower) => tower.income)) ? ((_.sum(_.map(towers, (tower) => tower.cost)) - _.sum(_.map(towers, (tower) => tower.sellValue))) / _.sum(_.map(towers, (tower) => tower.income))).toFixed(2) : "-")}</Typography></TableCell>;
  } else if (label === "favoredSellEfficiency") {
    return <TableCell align="right"><Typography>{tower ? (isFinite(tower.efficiency) ? tower.favoredSellEfficiency.toFixed(2) : "-") : (_.sum(_.map(towers, (tower) => tower.income)) ? ((_.sum(_.map(towers, (tower) => tower.cost)) - _.sum(_.map(towers, (tower) => tower.favoredSellValue))) / _.sum(_.map(towers, (tower) => tower.income))).toFixed(2) : "-")}</Typography></TableCell>;
  } else if (label === "abilityIncome") {
    return <TableCell align="right"><Typography>${tower ? tower.abilityIncome.toLocaleString() : _.sum(_.map(towers, (tower) => tower.abilityIncome)).toLocaleString()}</Typography></TableCell>;
  } else if (label === "abilityCooldown") {
    return <TableCell align="right"><Typography>{tower ? tower.abilityCooldown.toLocaleString() : "-"}</Typography></TableCell>;
  } else if (label === "abilityEfficiency") {
    return <TableCell align="right"><Typography>{tower ? (isFinite(tower.abilityEfficiency) ? `${tower.abilityEfficiency.toFixed(2)} uses (${(tower.abilityCooldown * tower.abilityEfficiency / 60).toFixed(2)} minutes)` : "-") : "-"}</Typography></TableCell>;
  } else if (label === "abilitySellEfficiency") {
    return <TableCell align="right"><Typography>{tower ? (isFinite(tower.abilitySellEfficiency) ? `${tower.abilitySellEfficiency.toFixed(2)} uses (${(tower.abilityCooldown * tower.abilitySellEfficiency / 60).toFixed(2)} minutes)` : "-") : "-"}</Typography></TableCell>;
  } else if (label === "abilityFavoredSellEfficiency") {
    return <TableCell align="right"><Typography>{tower ? (isFinite(tower.abilityFavoredSellEfficiency) ? `${tower.abilityFavoredSellEfficiency.toFixed(2)} uses (${(tower.abilityCooldown * tower.abilityFavoredSellEfficiency / 60).toFixed(2)} minutes)` : "-") : "-"}</Typography></TableCell>;
  } else {
    return <TableCell align="right" />
  }
}

interface TowerInfoTableProps {
  towers: Tower[],
  columns?: string[],
  removeTower?: (index: number) => void,
}

const TowerInfoTable: FC<TowerInfoTableProps> = ({
  towers,
  columns = ["type", "upgrades", "buffs", "cost", "sellValue", "favoredSellValue"],
  removeTower
}) => (
  <Card>
    <CardContent>
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                {/* {["type", "upgrades", "buffs", "cost", "sellValue", "favoredSellValue"].map(x =>  */}
                {columns.map(x =>  
                <TableCell align={["type", "buffs", "upgrades"].includes(x) ? "left" : "right"}>
                  <Typography sx={{fontWeight: 'bold'}} noWrap>
                    {_.startCase(x).replace("Ability ", "")}
                  </Typography>
                </TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {towers.map((tower, towerIndex) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    columns.map(column => cell(column, tower))
                  }
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
                {columns.map(column => cell(column, undefined, towers))}
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </CardContent>
  </Card>
);

export default TowerInfoTable;
