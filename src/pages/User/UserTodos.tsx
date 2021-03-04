import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'

interface ParamTypes {
  userId: string
}

function UserTodos() {
  const { userId } = useParams<ParamTypes>()

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography>This is the user todos page for {userId}</Typography>
      </Box>
    </Container>
  )
}

export default UserTodos
