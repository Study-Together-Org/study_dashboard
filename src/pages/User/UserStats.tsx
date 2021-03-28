import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
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
import NeighborLeaderboard from './NeighborLeaderboard'
import PersonalStatsTable from './PersonalStatsTable'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
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

interface TimeStats {
  rank: number
  study_time: number
}

interface Role {
  hours: string
  id: number
  name: string
  mention: string
}

interface UserStats {
  username: string
  stats: {
    pastDay: TimeStats
    pastWeek: TimeStats
    pastMonth: TimeStats
    all_time: TimeStats
    average_per_day: number
    currentStreak: number
    longestStreak: number
  }
  roleInfo: {
    role: Role
    next_role: Role
    time_to_next_role: number
  }
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
    background: '#BEBEBE',
    height: '1px',
  },
  icon: {
    /* fill: 'white', */
  },
  select: {
    '&:before': {
      borderColor: 'white !important',
    },
    '&:after': {
      borderColor: 'white !important',
    },
  },
  chartCard: {
    height: '100px',
    padding: '20px',
    lineHeight: '25px',
  },
  infoCard: {
    height: '213px',
    padding: '16px',
  },
}))

const timeIntervalToDays = {
  pastDay: 1,
  pastWeek: 7,
  pastMonth: 30,
  allTime: 60,
}

function UserStats() {
  const history = useHistory()
  const { userId } = useParams<ParamTypes>()
  const classes = useStyles()

  const [series, setSeries] = useState()
  const [neighbors, setNeighbors] = useState()
  const [userStats, setUserStats] = useState<UserStats>()
  const [timeInterval, setTimeInterval] = useState('pastMonth')
  const [studyTime, setStudyTime] = useState(0)
  const [rank, setRank] = useState(0)

  const fetchTimeSeries = async () => {
    const timeseries = await axios.get(`/usertimeseries/${userId}`, {
      params: {
        time_interval: timeInterval,
      },
    })

    setSeries(timeseries.data.timeseries)
    setNeighbors(timeseries.data.neighbors)
    console.log(timeseries.data.neighbors)
  }

  const fetchUserStats = async () => {
    const userstats = await axios.get(`/userstats/${userId}`)

    // console.log(userstats)
    // console.log(userstats.data)
    setRank(userstats.data.stats[timeInterval].rank)
    setStudyTime(userstats.data.stats[timeInterval].study_time)

    setUserStats(userstats.data)
  }

  useEffect(() => {
    fetchTimeSeries().catch(e => {
      console.log(`error in timeseries call: ${e.message}`)
    })

    if (userStats) {
      console.log(timeInterval)
      setRank(userStats.stats[timeInterval].rank)
      setStudyTime(userStats.stats[timeInterval].study_time)
    }
  }, [timeInterval])

  useEffect(() => {
    fetchTimeSeries().catch(e => {
      console.log(`error in timeseries call: ${e.message}`)
    })
    fetchUserStats().catch(e => {
      console.log(`error in userstats call: ${e.message}`)
    })
  }, [userId])

  useEffect(() => {
    fetchUserStats().catch(e => {
      console.log(`error in userstats call: ${e.message}`)
    })
  }, [])

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper style={{ height: '500px' }}>
            <Grid container>
              <Grid item xs={12}>
                <Box display="flex">
                  <Box className={classes.chartCard}>
                    <Typography variant="body1" gutterBottom={true}>
                      <Box fontWeight="fontWeightBold">Discord User Name</Box>
                    </Typography>
                    <Typography variant="body1">
                      {userStats?.username}
                    </Typography>
                  </Box>

                  <Box className={classes.chartCard}>
                    <Typography variant="body1" gutterBottom={true}>
                      <Box fontWeight="fontWeightBold">
                        Leaderboard Placement
                      </Box>
                    </Typography>
                    <Typography variant="body1">#{rank}</Typography>
                  </Box>
                  <Box className={classes.chartCard}>
                    <Typography variant="body1" gutterBottom={true}>
                      <Box fontWeight="fontWeightBold">Hours Studied</Box>
                    </Typography>
                    <Typography variant="body1">{studyTime}</Typography>
                  </Box>
                  <Box className={classes.chartCard}>
                    <Typography variant="body1" gutterBottom={true}>
                      <Box fontWeight="fontWeightBold">Average / day</Box>
                    </Typography>
                    <Typography variant="body1">
                      {(studyTime / timeIntervalToDays[timeInterval]).toFixed(
                        2
                      )}
                    </Typography>
                  </Box>
                </Box>
                <div style={{ height: '350px', paddingRight: '20px' }}>
                  {series && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={series}>
                        <CartesianGrid
                          stroke="#eee"
                          strokeDasharray="5 3"
                          vertical={false}
                        />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" />
                        <Tooltip
                          content={
                            // @ts-ignore
                            <CustomTooltipContent />
                          }
                          cursor={{ fill: '#666' }}
                        />
                        <Bar
                          yAxisId="left"
                          dataKey="study_time"
                          fill="#8a85ff"
                          radius={7}
                          barSize={10}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  align-items="center"
                  marginTop="6px"
                  marginLeft="20px"
                >
                  <Select
                    style={{ height: '35px' }}
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
                    <MenuItem value="pastDay">Past Day</MenuItem>
                    <MenuItem value="pastWeek">Past Week</MenuItem>
                    <MenuItem value="pastMonth">Past Month</MenuItem>
                    {/* <MenuItem value="allTime">All Time</MenuItem> */}
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <div style={{ height: '500px' }}>
            {neighbors && (
              <NeighborLeaderboard
                leaderboardData={neighbors}
                userId={userId}
                height="500px"
              />
            )}
          </div>
        </Grid>

        <Grid item xs={8}>
          <Paper className={classes.infoCard}>
            {userStats && (
              <div>
                <Typography variant="h6" gutterBottom={true}>
                  <Box fontWeight="fontWeightBold">Study Role</Box>
                </Typography>
                <Typography variant="body1">
                  Current study role:
                  {
                    // @ts-ignore
                    ` @${userStats?.roleInfo?.role?.name?.split(' ')[0]}`
                  }
                </Typography>

                <Typography variant="body1">
                  Next study role:
                  {
                    // @ts-ignore
                    ` @${userStats?.roleInfo?.next_role?.name?.split(' ')[0]}`
                  }
                </Typography>
                <Typography variant="body1">
                  Role Rank:
                  {
                    // @ts-ignore
                    ` 5/11`
                  }
                </Typography>

                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Role promotion: ${userStats.roleInfo.time_to_next_role}h`
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Current Study Streak: ${userStats.stats.currentStreak}`
                  }
                </Typography>

                <Typography variant="body1">
                  {
                    // @ts-ignore
                    `Longest Study Streak: ${userStats.stats.longestStreak}`
                  }
                </Typography>

                {/* <Typography variant="body1">{
                    // @ts-ignore
                    `Role rank: ${userStats.roleInfo.time_to_next_role}h`
                    }</Typography> */}
              </div>
            )}
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <div style={{ height: '213px' }}>
            {userStats && (
              <PersonalStatsTable
                leaderboardData={[
                  {
                    time_frame: 'Past Day',
                    ...userStats.stats['pastDay'],
                  },
                  {
                    time_frame: 'Past Week',
                    ...userStats.stats['pastWeek'],
                  },

                  {
                    time_frame: 'Past Month',
                    ...userStats.stats['pastMonth'],
                  },

                  {
                    time_frame: 'All Time',
                    ...userStats.stats['all_time'],
                  },
                ]}
                height="213px"
              />
            )}
          </div>
          {/* <Paper className={classes.infoCard}>
              {userStats && (
              <div>
              <Typography variant="h6" gutterBottom={true}>
              <Box fontWeight="fontWeightBold">Study Time</Box>
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
              </Paper> */}
        </Grid>
        {/* <Grid item xs={4}>
            <Paper className={classes.infoCard}>
            {userStats && (
            <div>
            <Typography variant="h6" gutterBottom={true}>
            <Box fontWeight="fontWeightBold">Leaderboard Placement</Box>
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
            </Grid> */}
      </Grid>
    </Container>
  )
}

export default UserStats
