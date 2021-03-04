import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import axios from 'axios'

import CustomTooltipContent from '../../components/CustomTooltipContent'

const testData = [
  {
    date: 'Feb',
    hours: 100,
  },
  {
    date: 'Mar',
    hours: 2210,
  },
  {
    date: 'Apr',
    hours: 2290,
  },
  {
    date: 'May',
    hours: 2000,
  },
  {
    date: 'Jun',
    hours: 2181,
  },
  {
    date: 'Jul',
    hours: 2500,
  },
  {
    date: 'Aug',
    hours: 2100,
  },
]

interface ParamTypes {
  userId: string
}

// display all time user studying
// display this month user studying
// display todays user studying
// show line graph with user studying for this week, that can be scopped to other times

/* eslint-disable @typescript-eslint/no-explicit-any */

const timestamp = new Date('May 23 2017').getTime()
const ONE_DAY = 86400000

/* const DATA : any[] = [
 *   { x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1 },
 *   { x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1 },
 *   { x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1 },
 *   { x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2 },
 *   { x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2 },
 *   { x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1 },
 *   { x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5 },
 *   { x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1 }
 * ].map(el => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));
 *  */

function sma(arr: any[], range: number, format: any) {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array')
  }

  const fn: any = typeof format === 'function' ? format : toFixed
  const num = range || arr.length
  const res: any[] = []
  const len = arr.length + 1
  let idx = num - 1
  while ((idx += 1) < len) {
    res.push(fn(avg(arr, idx, num)))
  }
  return res
}

/**
 * Create an average for the specified range.
 *
 * ```js
 * console.log(avg([1, 2, 3, 4, 5, 6, 7, 8, 9], 5, 4));
 * //=> 3.5
 * ```
 * @param  {Array} `arr` Array to pull the range from.
 * @param  {Number} `idx` Index of element being calculated
 * @param  {Number} `range` Size of range to calculate.
 * @return {Number} Average of range.
 */

function avg(arr: any[], idx: number, range: number) {
  return sum(arr.slice(idx - range, idx)) / range
}

/**
 * Calculate the sum of an array.
 * @param  {Array} `arr` Array
 * @return {Number} Sum
 */

function sum(arr: any[]) {
  let len = arr.length
  let num = 0
  while (len) {
    len -= 1
    num += Number(arr[len])
  }
  return num
}

/**
 * Default format method.
 * @param  {Number} `n` Number to format.
 * @return {String} Formatted number.
 */

function toFixed(n: any) {
  return n.toFixed(2)
}

const hourdata = [1, 1, 1, 2, 2.2, 1, 2.5]

const DATA: any[] = hourdata.map((el, index) => ({
  x0: index * ONE_DAY + timestamp,
  x: (index + 1) * ONE_DAY + timestamp,
  y: el,
}))

const MovingAverageData: any[] = sma(DATA, 3, undefined)

const formattedMovingData: any[] = MovingAverageData.map((el, index) => ({
  x: (index + 3) * ONE_DAY + timestamp,
  y: el,
}))

const useStyles = makeStyles(theme => ({
  paper: {
    //   backgroundColor: '20232a',
    //   color: 'white',
  },
  text: {
    // color: 'white',
  },
  divider: {
    // background: '#BEBEBE',
  },
  icon: {
    /* fill: 'white', */
  },
  select: {
    // '&:before': {
    //   borderColor: 'white',
    // },
    // '&:after': {
    //   borderColor: 'white',
    // },
  },
}))

function UserStats() {
  const { userId } = useParams<ParamTypes>()
  const classes = useStyles()

  const [series, setSeries] = useState()
  const [userStats, setUserStats] = useState()
  const [timeInterval, setTimeInterval] = useState('pastWeek')

  const fetchTimeSeries = async () => {
    const timeseries = await axios.get('/usertimeseries/102484975215862243', {
      params: {
        time_interval: timeInterval,
      },
    })

    setSeries(timeseries.data.timeseries)
  }

  const fetchUserStats = async () => {
    const userstats = await axios.get('/userstats/102484975215862243')

    console.log(userstats)

    setUserStats(userstats.data)
  }

  useEffect(() => {
    fetchTimeSeries().catch(e => {
      console.log(`error in timeseries call: ${e.message}`)
    })
  }, [timeInterval])

  useEffect(() => {
    fetchUserStats().catch(e => {
      console.log(`error in userstats call: ${e.message}`)
    })
  }, [])

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Container maxWidth="lg">
      <Grid container spacing={7} style={{ height: '80vh' }}>
        <Grid item xs={12} style={{ paddingTop: '7vh' }}>
          <Paper
            style={{
              height: '50vh',
            }}
          >
            <List style={{ height: '100%' }}>
              <ListItem style={{ height: '15%' }}>
                <Grid container item xs={6}>
                  <Grid item xs={6}>
                    Hours Studied
                  </Grid>
                  <Grid item xs={6}>
                    Leaderboard Placement
                  </Grid>
                  <Grid item xs={6}>
                    0.9h
                  </Grid>
                  <Grid item xs={6}>
                    #523
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem style={{ height: '70%' }}>
                <Grid item xs={8} style={{ height: '100%' }}>
                  {series && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={series}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          content={
                            // @ts-ignore
                            <CustomTooltipContent />
                          }
                        />
                        <Bar
                          dataKey="study_time"
                          fill="#8884d8"
                          radius={7}
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </Grid>
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem style={{ height: '15%' }}>
                <Select
                  value={timeInterval}
                  className={classes.select}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                  onChange={(e: any) => {
                    setTimeInterval(e.target.value)
                  }}
                >
                  <MenuItem value="allTime">All Time</MenuItem>
                  <MenuItem value="pastMonth">Past Month</MenuItem>
                  <MenuItem value="pastWeek">Past Week</MenuItem>
                  <MenuItem value="pastDay">Past Day</MenuItem>
                </Select>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            style={{
              height: '30vh',
            }}
          >
            {userStats && (
              <div style={{ paddingLeft: '30px' }}>
                <Typography
                  variant="h6"
                  gutterBottom={true}
                  style={{ paddingTop: '30px' }}
                >
                  Study Time
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `All time: ${userStats.stats.all_time.study_time} h`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Monthly: ${userStats.stats.pastMonth.study_time} h`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Past 7d: ${userStats.stats.pastWeek.study_time} h`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Past 24h: ${userStats.stats.pastDay.study_time} h`
                  }
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            style={{
              height: '30vh',
            }}
          >
            {userStats && (
              <div style={{ paddingLeft: '30px' }}>
                <Typography
                  variant="h6"
                  gutterBottom={true}
                  style={{ paddingTop: '30px' }}
                >
                  Leaderboard Placement
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `All time: #${userStats.stats.all_time.rank}`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Monthly: #${userStats.stats.pastMonth.rank}`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Past 7d: #${userStats.stats.pastWeek.rank}`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Past 24h: #${userStats.stats.pastDay.rank}`
                  }
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            style={{
              height: '30vh',
            }}
          >
            {userStats && (
              <div style={{ paddingLeft: '30px' }}>
                <Typography
                  variant="h6"
                  gutterBottom={true}
                  style={{ paddingTop: '30px' }}
                >
                  Study Role
                </Typography>
                {/*
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Current study role: @${userStats.roleInfo.role.name}`
                  }
                </Typography>
                */}
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Next study role: @${userStats.roleInfo.next_role.name}`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Role promotion: ${userStats.roleInfo.time_to_next_role}h`
                  }
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserStats
