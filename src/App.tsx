import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import UserPage from './pages/User'
// import Landing from './pages/Landing'
import Leaderboard from './pages/Leaderboard'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Titillium Web',
  },
  navButton: {
    textTransform: 'none',
    margin: '0px 10px',
    fontSize: '16px',
    color: 'white',
  },
}))

// style={{ backgroundColor: '#20232A' }}

function App() {
  const classes = useStyles()
  const preventDefault = event => event.preventDefault()

  return (
    <div className="{classes.root}">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              </IconButton> */}
          <div className={classes.title}>
            <Button component={Link} to="/" className={classes.navButton}>
              <Typography variant="h6" className={classes.title}>
                <Box fontWeight="fontWeightBold">
                  Study Together Dashboard (Beta)
                </Box>
              </Typography>
            </Button>
          </div>

          {/* <Typography>Leaderboard</Typography>
              <Typography>Leaderboard</Typography>
              <Typography>Leaderboard</Typography> */}
          {/* <Link component="button" href="/leaderboard" onClick={preventDefault}>Leaderboard</Link>
              <Link component="button" href="/users" onClick={preventDefault}>Users</Link>
              <Link component="button" href="/rules" onClick={preventDefault}>Rules</Link> */}
          {/* <Button
            component={Link}
            to="/leaderboard"
            className={classes.navButton}
          >
            <Box fontWeight={600}>Leaderboard</Box>
          </Button> */}
          <Button component={Link} to="/users" className={classes.navButton}>
            <Box fontWeight={600}>User Search</Box>
          </Button>
          {/* <Button component={Link} to="/rules" className={classes.navButton}>
            <Box fontWeight={600}>Rules</Box>
          </Button> */}
          <Button
            target="_blank"
            href="https://forms.gle/6AKTsMDz2DmJVAvy5"
            className={classes.navButton}
          >
            <Box fontWeight={600}>Feedback Form</Box>
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/" component={Leaderboard} />
        <Route path="/users" component={UserPage} />
        <Route path="/leaderboard" component={Leaderboard} />
      </Switch>
    </div>
  )
}

export default App
