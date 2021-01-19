import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Landing() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography>Let's Study Together!</Typography>
      </Box>
    </Container>
  );
}

export default Landing;
