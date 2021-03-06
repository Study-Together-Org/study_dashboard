import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

function Landing() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '150px' }}>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Typography
            variant="h1"
            style={{
              fontFamily: 'Titillium Web',
              fontWeight: 700,
              fontSize: '8rem',
            }}
          >
            Study <br />
            Together!
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          <img
            src="https://cdn.discord.me/server/242e19c565f0a2f2c1fd5c91337d177972d431c4b2763d4640bdf5b5c179d354/icon_657f44bfff192ccc748efdacfdfbb59e8d233be8217d2d66aa40e1bbba523f40.jpg"
            style={{ height: 250 }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Landing
