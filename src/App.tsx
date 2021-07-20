import React, { useState, useEffect } from 'react'
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
import Profile from './pages/Profile'
import Login from './pages/Login'
import { api as axios } from './services'
import { UserContext } from './contexts/UserContext'
import YourUserStats from 'pages/User/YourUserStats'
import Logout from 'pages/Logout'

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
  const [user, setUser] = useState(null)
  // const [user, setUser] = useState({
  //   id: 234,
  //   username: 'ruborcalor',
  //   discriminator: 2344,
  //   avatar_url: 'https://colekillian.com',
  // })

  // const getData = async () => {
  //   const { data } = await axios.get('/me')
  //   console.log(data)
  //   if
  // }

  useEffect(() => {
    axios
      .get('/me')
      .then(res => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(e => {
        // user not signed in
        console.log(e)
      })
  }, [])

  // check if user is signed in
  // add the user info to redux?
  // naw just check if they have a session

  console.log(user)

  if (user == null) {
    return <Login />
  }

  return (
    <div className="{classes.root}">
      <UserContext.Provider value={{ user, setUser }}>
        <VerticalNav>
          <Switch>
            <Route exact path="/" component={Leaderboard} />
            <Route path="/users" component={UserPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/userstats" component={YourUserStats} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </VerticalNav>
      </UserContext.Provider>
    </div>
  )
}

export default App
