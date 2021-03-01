import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserPage from './pages/User';
import Landing from './pages/Landing';
import Leaderboard from './pages/Leaderboard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navButton: {
    textTransform: 'none',
    margin: '0px 10px',
    fontSize: '14px'
  }
}));

function App() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <div className="{classes.root}">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Study Together
          </Typography>
          {/* <Typography>Leaderboard</Typography>
              <Typography>Leaderboard</Typography>
              <Typography>Leaderboard</Typography> */}
          {/* <Link component="button" href="/leaderboard" onClick={preventDefault}>Leaderboard</Link>
              <Link component="button" href="/users" onClick={preventDefault}>Users</Link>
              <Link component="button" href="/rules" onClick={preventDefault}>Rules</Link> */}
          <Button component={Link} to="/leaderboard" className={classes.navButton}>Leaderboard</Button>
          <Button component={Link} to="/users" className={classes.navButton}>User Stats</Button>
          <Button component={Link} to="/rules" className={classes.navButton}>Rules</Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/leaderboard"
          component={Leaderboard}
        />
      </Switch>
    </div>

  );
}

export default App;
