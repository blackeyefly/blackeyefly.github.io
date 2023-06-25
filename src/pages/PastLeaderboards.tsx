import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Card, Container, IconButton, Modal, Stack, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable/LeaderboardTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function PastLeaderboards() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Farming Calculators
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginBottom: "100px" }} maxWidth="xl">
          <Stack
            spacing={2}
            justifyContent="center"
          >
            <Typography variant="h2" align="center">
              Past Boss Leaderboards
              <IconButton color="primary" aria-label="help" component="label" onClick={handleOpen}>
                <HelpIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Card sx={style}>
                  <Typography variant="body1" align="center">
                    This page is designed to show past boss leaderboards. It only displays solo times, currently.
                  </Typography>
                </Card>
              </Modal>
            </Typography>
            <LeaderboardTable bossId="" />
          </Stack>
        </Container>
      </>
    );  
}

export default PastLeaderboards;