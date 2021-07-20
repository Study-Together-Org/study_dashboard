import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { api as axios } from '../../services'
import { Redirect } from 'react-router-dom'

const delay = 1

function UserPage() {
  useEffect(() => {
    let timer1 = setTimeout(
      () => window.location.replace(`${axios.defaults.baseURL}/login`),
      delay * 1500
    )

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  return <Typography>Redirecting to login...</Typography>
}

export default UserPage
