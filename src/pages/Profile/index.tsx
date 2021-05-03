import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { api as axios } from '../../services'

function UserPage() {
  const getData = async () => {
    const { data } = await axios.get('/me')
    console.log(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return <div></div>
}

export default UserPage
