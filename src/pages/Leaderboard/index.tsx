import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Leaderboard from './Leaderboard'

function UserPage() {
  return (
    <Container maxWidth="md">
      <Box my={15}>
        <Leaderboard />
      </Box>
    </Container>
  )
}

export default UserPage
