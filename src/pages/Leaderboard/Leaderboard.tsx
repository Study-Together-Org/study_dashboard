import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import UserSearch from './UserSearch';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Study Time in Minutes' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Study Time in Hours' },
];

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        {/* checkbox */}
        <TableCell>Rank</TableCell>
        {headCells.map((headCell) => (
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
  );
}

const useToolbarStyles = makeStyles((theme) => ({
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
}));

function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [timeFrame, setTimeFrame] = React.useState<string>('pastWeek');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeFrame(event.target.value as string);
    props.onChange(event.target.value as string);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Time Frame</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={timeFrame}
          onChange={handleChange}
        >
          <MenuItem value='pastWeek'>Past Week</MenuItem>
          <MenuItem value='pastMonth'>Past Month</MenuItem>
          <MenuItem value='pastYear'>Past Year</MenuItem>
          <MenuItem value='allTime'>All time</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Leaderboard
      </Typography>

      <UserSearch />
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
}));

const Leaderboard = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [timeFrame, setTimeframe] = React.useState<string>('pastWeek');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [leaderboardData, setLeaderboardData] = useState<any>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let timeFrameChange = false;


  useEffect(() => {
    axios.get('/leaderboard?offset=0&limit=25&time_interval=pastWeek')
      .then((response) => {
        console.log('Inside!');
        console.log(response.data);
        // console.log(response.data.json());
        console.log('Setting loading to false');
        setLeaderboardData(response.data);
        setLoading(false);
      }).catch((err) => {});
  }, []);

  useEffect(() => {
    console.log('testestestes');
    axios.get(`/leaderboard?offset=0&limit=25&time_interval=${timeFrame}`)
      .then((response) => {
        console.log('New time frame');
        console.log(response.data);
        // console.log(response.data.json());
        console.log('Setting loading to false');
        setLeaderboardData(response.data);
        setLoading(false);
        setPage(0);
      }).catch((err) => {});
  }, [timeFrame]);

  useEffect(() => {
    if (Object.keys(leaderboardData).length === 0) return;
    if (leaderboardData?.leaderboard.length < page * 10) {
      console.log('New request');
      axios.get(`/leaderboard?offset=${leaderboardData.leaderboard.length}&limit=25&time_interval=${timeFrame}`)
        .then((response) => {
          console.log(leaderboardData.leaderboard.concat(response.data.leaderboard));
          setLeaderboardData({
            leaderboard: leaderboardData.leaderboard.concat(response.data.leaderboard),
            num_users: response.data.num_users
          });
        }).catch((err) => {});
    }
  }, [page]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleTimeFrameChange(value: string) {
    setTimeframe(value);
    timeFrameChange = true;
    console.log(timeFrame, 'changed');
  }

  if (loading) return <p>Loading...{loading}</p>;
  if (error) return <p>Error :( {error.toString()}</p>;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, leaderboardData?.leaderboard.length - page * rowsPerPage);

  return (
    <div className={classes.root}>

      <ControlledOpenSelect onChange={handleTimeFrameChange} />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead />
            <TableBody>
              {leaderboardData.leaderboard
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell>{row.rank}</TableCell>
                      {/* padding="checkbox" */}
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.username}
                      </TableCell>
                      <TableCell align="right">{row.study_time * 60}</TableCell>
                      <TableCell align="right">{row.study_time}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={leaderboardData.num_users}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Leaderboard;
