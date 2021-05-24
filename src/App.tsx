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
import VerticalNav from 'components/VerticalNav'
import Maintenance from 'pages/Maintenance'
import Login from './pages/Login'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Source Sans Pro',
  },
  navButton: {
    textTransform: 'none',
    margin: '0px 10px',
    fontSize: '16px',
    color: 'white',
  },
  logo: {
    height: '30px',
  },
}))

// style={{ backgroundColor: '#20232A' }}

function App() {
  const classes = useStyles()
  const preventDefault = event => event.preventDefault()

  // check if user is signed in
  // add the user info to redux?
  // naw just check if they have a session

  // return <Login />

  return (
    <div className="{classes.root}">
      <Maintenance />
      {/* <VerticalNav>
        <Switch>
          <Route exact path="/" component={Leaderboard} />
          <Route path="/users" component={UserPage} />
          <Route path="/leaderboard" component={Leaderboard} />
        </Switch>
      </VerticalNav> */}
    </div>
  )
}

export default App
