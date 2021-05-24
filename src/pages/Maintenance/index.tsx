import React from 'react'
import { Container, Typography } from '@material-ui/core'
import HeaderNav from 'components/HeaderNav'

const Maintenance = () => {
  return (
    <>
      <HeaderNav />
      <Container maxWidth="lg" style={{ marginTop: '200px' }}>
        <div style={{ width: '60%' }}>
          <Typography variant="h1" style={{ fontSize: '140px' }}>
            Down for maintenance.
          </Typography>
          <Typography variant="h4" style={{ marginTop: '100px' }}>
            The Study Together Dashboard is down for maintenance. Please check
            back later.
          </Typography>
        </div>
      </Container>
    </>
  )
}

export default Maintenance
