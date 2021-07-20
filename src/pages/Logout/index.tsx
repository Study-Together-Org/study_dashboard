import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { api as axios } from '../../services'
import { useHistory } from 'react-router'
import { UserContext } from 'contexts/UserContext'

function Logout() {
  // need to call logout at api
  // then redirect to home

  const history = useHistory()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    axios
      .get('/logout')
      .then(res => {
        setUser(null)
        history.push('/')
      })
      .catch(e => {
        console.log(e)
      })
  })

  return <p>Logging out</p>
}

export default Logout
