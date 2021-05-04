import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { api as axios } from '../../services'

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))

function UserPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.infoCard}>
        <CardContent className={classes.cardContent}>
          {/* <Typography gutterBottom variant="h4" component="h1">
            Study Together Dashboard
          </Typography> */}
          {/* <Typography gutterBottom variant="caption">
            Log in to view the study together dashboard
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            style={{
              width: '300px',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
            }}
            href={axios.defaults.baseURL + 'login'}
          >
            {/* <img src="/discord_icon.png" style={{ height: '30px' }} /> */}
            <Typography variant="h6">Login with Discord</Typography>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserPage
