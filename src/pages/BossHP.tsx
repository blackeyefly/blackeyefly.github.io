import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Card, Container, IconButton, Modal, Stack, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import BossHPTable from '../components/BossHPTable/BossHPTable';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function BossHP() {
    const [boss, setBoss] = useState('Bloonarius');
    const [multiplier, setMultiplier] = useState(1);
    const [players, setPlayers] = useState(1);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const setOptions = (boss: string, multiplier: number, players: number) => {
        setBoss(boss);
        setMultiplier(multiplier);
        setPlayers(players);
    }
  
    return (
      <>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              BTD6 Calculators
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginBottom: "100px" }} maxWidth="xl">
          <Stack
            spacing={2}
            justifyContent="center"
          >
            <Typography variant="h2" align="center">
              Boss HP Calculator
              <IconButton color="primary" aria-label="help" component="label" onClick={handleOpen}>
                <HelpIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Card sx={style}>
                  <Typography variant="body1" align="center">
                    This page is designed to help calculate the HP of bosses in Bloons TD 6.
                  </Typography>
                </Card>
              </Modal>
            </Typography>
            <BossHPTable />
          </Stack>
        </Container>
      </>
    );  
}

export default BossHP;