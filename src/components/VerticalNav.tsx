import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation, Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TableChartIcon from '@material-ui/icons/TableChart'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import { Card, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ListAltIcon from '@material-ui/icons/ListAlt'
import PersonIcon from '@material-ui/icons/Person'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import FeedbackIcon from '@material-ui/icons/Feedback'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  avatarCard: {
    display: 'flex',

    '& > *': {
      margin: theme.spacing(1),
    },
    margin: '20px 10px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function ClippedDrawer({ children }) {
  const classes = useStyles()
  const location = useLocation()

  const generalNav: [string, string, any][] = [
    ['Leaderboard', '/leaderboard/', <TableChartIcon />],
    ['Your Study Stats', '/userstats/', <EqualizerIcon />],
    ['User Search', '/users/', <SearchIcon />],
  ]

  const appNav: [string, string, any][] = [
    ['Todo (Coming Soon)', '/todoApp/', <ListAltIcon />],
  ]

  const settingsNav: [string, string, any][] = [
    ['Profile', '/profile/', <PersonIcon />],
  ]

  const infoNav: [string, string, any][] = [
    ['FAQ', '/faq/', <LiveHelpIcon />],
    ['Feedback Form', '/feedback/', <FeedbackIcon />],
  ]

  const navSections: [string, [string, string, any][]][] = [
    ['General', generalNav],
    ['Apps', appNav],
    ['Settings', settingsNav],
    ['Info', infoNav],
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <span style={{ fontWeight: 700 }}>
              Study Together Dashboard (Beta)
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Paper className={classes.avatarCard}>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
            <span>
              <Typography>Cole Killian</Typography>
              <Typography variant="caption">Your Plan: Premium</Typography>
            </span>
          </Paper>
          <Divider />
          {navSections.map(([sectionName, section], index) => (
            <>
              <Typography style={{ margin: '20px 0 0 20px' }} component="div">
                <Box fontWeight="fontWeightBold">{sectionName}</Box>
              </Typography>
              <List>
                {section.map(([name, route, e], index) => (
                  <ListItem
                    button
                    component={Link}
                    to={route}
                    key={name}
                    style={{
                      color: location.pathname == route && '#3F51B5',
                    }}
                  >
                    <ListItemIcon
                      style={{
                        justifyContent: 'center',
                        color: location.pathname == route && '#3F51B5',
                      }}
                    >
                      {e}
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
            </>
          ))}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </main>
    </div>
  )
}
