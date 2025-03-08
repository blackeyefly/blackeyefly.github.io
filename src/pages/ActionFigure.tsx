import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Card, Container, IconButton, Modal, Stack, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import ActionFigureTable from '../components/ActionFigureTable/ActionFigureTable';
import GlobalOptions from '../components/GlobalOptions/GlobalOptions';
import Difficulty from '../models/Difficulty';
import MK from '../models/MK';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function ActionFigure() {
    const [mk, setMk] = useState(MK.On);
    const [difficulty, setDifficulty] = useState(Difficulty.Medium);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
    const setOptions = (mk: MK, difficulty: Difficulty) => {
      setMk(mk);
      setDifficulty(difficulty);
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
              Action Figure Calculator
              <IconButton color="primary" aria-label="help" component="label" onClick={handleOpen}>
                <HelpIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Card sx={style}>
                  <Typography variant="body1" align="center">
                    This page is designed to help calculate the profit of Geraldo's action figure.
                  </Typography>
                </Card>
              </Modal>
            </Typography>
            <GlobalOptions setOptions={setOptions} />
            <ActionFigureTable mk={mk} difficulty={difficulty}/>
          </Stack>
        </Container>
      </>
    );  
}

export default ActionFigure;