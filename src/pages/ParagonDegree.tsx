import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Card, Container, IconButton, Modal, Stack, Toolbar, Typography } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import { Tower, TowerType } from '../models/Tower';
import ParagonDegreeCalculator from '../components/ParagonDegreeCalculator/ParagonDegreeCalculator';
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

function ParagonDegree() {
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
              Paragon Degree Calculator
              <IconButton color="primary" aria-label="help" component="label" onClick={handleOpen}>
                <HelpIcon />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Card sx={style}>
                  <Typography variant="body1" align="center">
                    This page is designed to help calculate the degree of a paragon.
                  </Typography>
                </Card>
              </Modal>
            </Typography>
            <ParagonDegreeCalculator />
          </Stack>
        </Container>
      </>
    );  
}

export default ParagonDegree;