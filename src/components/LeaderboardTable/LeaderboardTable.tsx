import { Card, CardContent, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

interface LeaderboardTableProps {
  bossId?: string
}

const LeaderboardTable: FC<LeaderboardTableProps> = ({
  bossId = ""
}) => {
  return <Card>
  <CardContent>
    <Stack spacing="10px">
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography sx={{fontWeight: 'bold'}} noWrap>
                    Placement
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{fontWeight: 'bold'}} noWrap>
                    Player Name
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{fontWeight: 'bold'}} noWrap>
                    Time
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3].map((round) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {round}
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
};

export default LeaderboardTable;
