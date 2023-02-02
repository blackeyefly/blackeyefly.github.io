import { AppBar, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';

const theme = createTheme();

function NoPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                    Farming Calculators
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography>
                    No page here!
                </Typography>
            </Container>
      </ThemeProvider>
    );
}

export default NoPage;