import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import SimpleTable from '../../components/SimpleTable'
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
import { api as axios } from '../../services'

import CustomTooltipContent from '../../components/CustomTooltipContent'

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
    allTime: TimeStats
    averagePerDay: number
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

/**
 * Calculate the sum of an array.
 * @param  {Array} `arr` Array
 * @return {Number} Sum
 */

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
  // userId being viewed
  const { userId } = useParams<ParamTypes>()
  const classes = useStyles()

  // the timeseries study data
  const [series, setSeries] = useState()
  // the neighbor leaderboard data
  const [neighbors, setNeighbors] = useState()
  // the users statistics ddata
  const [userStats, setUserStats] = useState<UserStats>()
  // the current time interval of focus
  const [timeInterval, setTimeInterval] = useState('pastMonth')
  // userId ref for tracking when userId changes in useEffect
  // with multiple dependencies
  const userIdRef = useRef(null)

  // error
  const [error, setError] = useState(false)

  // get timeseries and neighbor leaderboard data
  const fetchTimeSeries = async () => {
    const timeseries = await axios.get(`/usertimeseries/${userId}`, {
      params: {
        time_interval: timeInterval,
      },
    })
    setSeries(timeseries.data.timeseries)
    setNeighbors(timeseries.data.neighbors)
  }

  // get a users stats
  const fetchUserStats = async () => {
    const userstats = await axios.get(`/userstats/${userId}`)
    console.log(userstats)
    setUserStats(userstats.data)
  }

  // refetch whenever the userId or time interval changes
  useEffect(() => {
    // always refetch time series data
    fetchTimeSeries().catch(e => {
      console.log(`Error in timeseries call: ${e.message}`)
      setError(true)
    })
    // only refetch user stats data if userId changed
    if (userIdRef.current != userId) {
      fetchUserStats().catch(e => {
        console.log(`Error in userstats call: ${e.message}`)
        setError(true)
      })
      userIdRef.current = userId
    }
  }, [userId, timeInterval])

  const ChartCard = ({ label, value }) => (
    <Box className={classes.chartCard}>
      <Typography variant="body1" gutterBottom={true}>
        <span style={{ fontWeight: 700 }}>{label}</span>
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  )

  if (error)
    return (
      <Container maxWidth="lg" style={{ marginTop: '200px' }}>
        <div style={{ width: '60%' }}>
          <Typography variant="h1" style={{ fontSize: '140px' }}>
            Could not find user.
          </Typography>
          <Typography variant="h4" style={{ marginTop: '100px' }}>
            If you think this is an error, please contact the study together
            support team.
          </Typography>
        </div>
      </Container>
    )

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Paper style={{ height: '500px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Box display="flex">
                <ChartCard
                  label="Discord User Name"
                  value={userStats && userStats?.username}
                />
                <ChartCard
                  label="Leaderboard Placement"
                  value={userStats && `#${userStats.stats[timeInterval].rank}`}
                />
                <ChartCard
                  label="Hours Studied"
                  value={userStats && userStats.stats[timeInterval].study_time}
                />
                <ChartCard
                  label="Average / day"
                  value={
                    userStats &&
                    (
                      userStats.stats[timeInterval].study_time /
                      timeIntervalToDays[timeInterval]
                    ).toFixed(2)
                  }
                />
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
                        cursor={{ fill: '#E0E0E0' }}
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
                  {/* <MenuItem value="pastDay">Past Day</MenuItem> */}
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
            <SimpleTable
              columns={[
                { label: 'Rank', key: 'rank' },
                { label: 'Username', key: 'username' },
                {
                  label: 'Study Time (h)',
                  key: 'study_time',
                  numeric: true,
                },
              ]}
              data={neighbors}
              height={500}
              customRenders={(row, key) => {
                let res = row[key]
                if (key == 'username') {
                  res =
                    row[key].length < 18
                      ? row[key]
                      : row[key].substring(0, 18) + '...'
                }
                if (key == 'study_time') {
                  res = res.toFixed(1)
                }
                if (row['discord_user_id'] == userId) {
                  res = <span style={{ fontWeight: 700 }}>{res}</span>
                }
                return res
              }}
              viewLink={row => `/users/${row['discord_user_id']}`}
            />
          )}
        </div>
      </Grid>

      <Grid item xs={8}>
        <Paper className={classes.infoCard}>
          {userStats && (
            <div>
              <Typography variant="h6" gutterBottom={true}>
                <span style={{ fontWeight: 700 }}>Study Role</span>
              </Typography>
              <Typography variant="body1">
                Current study role:
                {
                  // @ts-ignore
                  ` @${userStats?.roleInfo?.role?.name}`
                }
              </Typography>

              <Typography variant="body1">
                Next study role:
                {
                  // @ts-ignore
                  userStats?.roleInfo?.role?.name ==
                  userStats?.roleInfo?.next_role?.name
                    ? '👑 Highest Role Reached'
                    : ` @${userStats?.roleInfo?.next_role?.name}`
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
                  `Role promotion in: ${userStats.roleInfo.time_to_next_role}h`
                }
              </Typography>
              <Typography variant="body1">
                {
                  // @ts-ignore
                  `Current Study Streak: ${userStats.stats.currentStreak} days`
                }
              </Typography>

              <Typography variant="body1">
                {
                  // @ts-ignore
                  `Longest Study Streak: ${userStats.stats.longestStreak} days`
                }
              </Typography>
            </div>
          )}
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <div style={{ height: '213px' }}>
          {userStats && (
            <SimpleTable
              columns={[
                { label: 'Time Frame', key: 'timeFrame' },
                { label: 'Hours', key: 'study_time', numeric: true },
                {
                  label: 'Place',
                  key: 'rank',
                  numeric: true,
                },
              ]}
              data={[
                {
                  timeFrame: 'Past Day',
                  ...userStats.stats['pastDay'],
                },
                {
                  timeFrame: 'Past Week',
                  ...userStats.stats['pastWeek'],
                },

                {
                  timeFrame: 'Past Month',
                  ...userStats.stats['pastMonth'],
                },

                {
                  timeFrame: 'All Time',
                  ...userStats.stats['allTime'],
                },
              ]}
              customRenders={(row, key) => {
                let res = row[key]
                if (key == 'study_time') {
                  res = `${res.toFixed(1)}h`
                }
                if (key == 'rank') {
                  res = `#${res}`
                }
                return res
              }}
              height={213}
            />
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default UserStats
