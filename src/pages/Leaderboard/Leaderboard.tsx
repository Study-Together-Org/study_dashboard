import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
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
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Username' },
  {
    id: 'study_time_minutes',
    numeric: true,
    disablePadding: false,
    label: 'Study Time in Minutes',
  },
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
      <TableRow>
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

function ControlledOpenSelect({ onChange, timeFrame }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as string)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div style={{ marginLeft: '5px' }}>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-controlled-open-select-label">
            Time Frame
            </InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={timeFrame}
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value="pastDay">Past Day</MenuItem>
          <MenuItem value="pastWeek">Past Week</MenuItem>
          <MenuItem value="pastMonth">Past Month</MenuItem>
          <MenuItem value="allTime">All time</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()

  return (
    <Toolbar disableGutters={true} style={{ paddingLeft: '16px' }}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <Box fontWeight={700}>Leaderboard</Box>
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
  table: {
    minWidth: 550,
  },
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
  select: {
    '&:before': {
      borderColor: 'white !important',
    },
    '&:after': {
      borderColor: 'white !important',
    },
  },
}))

const Leaderboard = () => {
  const history = useHistory()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [timeFrame, setTimeframe] = React.useState<string>('pastMonth')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [leaderboardData, setLeaderboardData] = useState<any>({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [backgroundLoading, setBackgroundLoading] = useState(false)
  let timeFrameChange = false

  useEffect(() => {
    axios
      .get(`/leaderboard?offset=0&limit=200&time_interval=${timeFrame}`)
      .then(response => {
        console.log('Initial leaderboard fetch complete')
        setLeaderboardData(response.data)
        setLoading(false)
      })
      .catch(err => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/leaderboard?offset=0&limit=200&time_interval=${timeFrame}`)
      .then(response => {
        setLeaderboardData(response.data)
        setLoading(false)
        setPage(0)
      })
      .catch(err => {})
  }, [timeFrame])

  useEffect(() => {
    if (Object.keys(leaderboardData).length === 0) return
    if (
      !backgroundLoading &&
      leaderboardData?.leaderboard.length < page * rowsPerPage * 5
    ) {
      setBackgroundLoading(true)
      axios
        .get(
          `/leaderboard?offset=${leaderboardData.leaderboard.length}&limit=200&time_interval=${timeFrame}`
        )
        .then(response => {
          setLeaderboardData({
            leaderboard: leaderboardData.leaderboard.concat(
              response.data.leaderboard
            ),
            num_users: response.data.num_users,
          })
          setBackgroundLoading(false)
        })
        .catch(err => {
          setBackgroundLoading(false)
        })
    }
  }, [page])

  const handleChangePage = (event, newPage) => {
    if (!loading) {
      setPage(newPage)
    }
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function handleTimeFrameChange(value: string) {
    setTimeframe(value)
    timeFrameChange = true
    console.log(timeFrame, 'changed')
  }

  // if (loading) return <p>Loading...{loading}</p>

  if (error) return <p>Error :( {error.toString()}</p>

  const emptyRows = 0

  return (
    <div className={classes.root}>
      {loading && (
        <CircularProgress
          style={{
            position: 'absolute',
            top: '40%',
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        />
      )}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead />
            {loading ? (
              <div style={{ height: '530px' }}></div>
            ) : (
              <TableBody>
                {leaderboardData.leaderboard
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        onClick={() => {
                          history.push(`users/${row.discord_user_id}`)
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell>{row.rank}</TableCell>
                        {/* padding="checkbox" */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.username}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(row.study_time * 60)}
                        </TableCell>
                        <TableCell align="right">{row.study_time}</TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <div className={classes.tableFooter}>
          <ControlledOpenSelect
            onChange={handleTimeFrameChange}
            timeFrame={timeFrame}
          />
          <div style={{ flexGrow: 1 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={leaderboardData.num_users || '...'}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Leaderboard
