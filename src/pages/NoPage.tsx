import { AppBar, Container, Toolbar, Typography } from '@mui/material';

function NoPage() {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                    BTD6 Calculators
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography>
                    No page here!
                </Typography>
            </Container>
        </>
    );
}

export default NoPage;