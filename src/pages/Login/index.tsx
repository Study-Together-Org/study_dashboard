import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#FF6F61',
    height: '100vh',
    width: '100vw',
  },
  infoCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '400px',
    height: '300px',
    marginTop: '-150px',
    marginLeft: '-200px',
  },
  cardContent: {
    height: '100%',
  },
}))

function UserPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.infoCard}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h4" component="h1">
            Log in
          </Typography>
          <Typography gutterBottom variant="caption">
            Log in to view the study together dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: '300px',
              display: 'block',
              margin: '100px auto 0px auto',
            }}
            href="https://api.discordstudy.com/login"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserPage
