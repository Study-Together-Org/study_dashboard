import React, { useState, useEffect } from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useHistory } from 'react-router'

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Username' },
  /* { */
  /* id: 'study_time_minutes', */
  /* numeric: true, */
  /* disablePadding: false, */
  /* label: 'Study Time in Minutes', */
  /* }, */
  {
    id: 'study_time_hours',
    numeric: true,
    disablePadding: false,
    label: 'Study Time in Hours',
  },
]

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow style={{ height: '49px' }}>
        {/* checkbox */}
        <TableCell>Rank</TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Neighbors
      </Typography>
    </Toolbar>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {},
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Leaderboard = ({ leaderboardData, height, userId }) => {
  const history = useHistory()
  const classes = useStyles()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  if (loading) return <p>Loading...{loading}</p>
  if (error) return <p>Error :( {error.toString()}</p>

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar /> */}
        <TableContainer style={{ height: height }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead />
            <TableBody>
              {leaderboardData.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                const rowHeight = '41px'

                if (row.discord_user_id == userId) {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      onClick={() => {
                        history.push(`./${row.discord_user_id}`)
                      }}
                      style={{ height: rowHeight }}
                    >
                      <TableCell>
                        <Box fontWeight={700}>{row.rank}</Box>
                      </TableCell>
                      {/* padding="checkbox" */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Box fontWeight={700}>
                          {row.username.length < 18
                            ? row.username
                            : row.username.substring(0, 18) + '...'}
                        </Box>
                      </TableCell>
                      {/* <TableCell align="right">{row.study_time * 60}</TableCell> */}
                      <TableCell align="right">
                        <Box fontWeight={700}>{row.study_time}</Box>
                      </TableCell>
                    </TableRow>
                  )
                }

                if (index == 10) {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      onClick={() => {
                        history.push(`./${row.discord_user_id}`)
                      }}
                      style={{ height: rowHeight }}
                    >
                      <TableCell style={{ border: 'none' }}>
                        <Box>{row.rank}</Box>
                      </TableCell>
                      {/* padding="checkbox" */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ border: 'none' }}
                      >
                        <Box>
                          {row.username.length < 18
                            ? row.username
                            : row.username.substring(0, 18) + '...'}
                        </Box>
                      </TableCell>
                      {/* <TableCell align="right">{row.study_time * 60}</TableCell> */}
                      <TableCell align="right" style={{ border: 'none' }}>
                        <Box>{row.study_time}</Box>
                      </TableCell>
                    </TableRow>
                  )
                }

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    onClick={() => {
                      history.push(`./${row.discord_user_id}`)
                    }}
                    style={{ height: rowHeight }}
                  >
                    <TableCell>{row.rank}</TableCell>
                    {/* padding="checkbox" */}
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.username.length < 18
                        ? row.username
                        : row.username.substring(0, 18) + '...'}
                    </TableCell>
                    {/* <TableCell align="right">{row.study_time * 60}</TableCell> */}
                    <TableCell align="right">{row.study_time}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Leaderboard
