import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
          <Button className={classes.navButton}>Leaderboard</Button>
          <Button className={classes.navButton}>User Stats</Button>
          <Button className={classes.navButton}>Rules</Button>
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
