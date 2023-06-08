import { Card, CardContent, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { FC, useState } from 'react';
import Difficulty from '../../models/Difficulty';
import MK from '../../models/MK';
import Utils from '../../models/utils';

interface ActionFigureTableProps {
  mk?: MK,
  difficulty?: Difficulty,
}

const ActionFigureTable: FC<ActionFigureTableProps> = ({
  mk = MK.On,
  difficulty = Difficulty.Medium,
}) => {
  const [placementRound, setPlacementRound] = useState(1);
  
  return <Card>
    <CardContent>
      <Stack spacing="10px">
        <Container maxWidth="xl">
          <TextField
            required
            id="placementRound"
            label="Geraldo Placement Round"
            type="number"
            defaultValue={1}
            value={placementRound}
            InputProps={{
              inputProps: { 
                min: 1
              }
            }}
            onChange={(e) => setPlacementRound(parseInt(e.target.value))}
            sx={{ width: "15%" }}
          />
        </Container>
        <Container maxWidth="xl">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography sx={{fontWeight: 'bold'}} noWrap>
                      Round
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{fontWeight: 'bold'}} noWrap>
                      Purchase Value
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{fontWeight: 'bold'}} noWrap>
                      Sell Value
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_.range(placementRound, Utils.actionFigureMaxValueRound(placementRound, difficulty, mk) + 1).map((round) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {round}
                    </TableCell>
                    <TableCell>
                      {Utils.actionFigureSellValue(placementRound, round, difficulty, mk, true).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {Utils.actionFigureSellValue(placementRound, round, difficulty, mk).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Stack>
    </CardContent>
  </Card>
}

export default ActionFigureTable;
