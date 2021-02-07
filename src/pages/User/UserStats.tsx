import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList,
} from 'recharts';
import { getUserStats } from '../../api';

const testData = [
  {
    date: 'Feb', hours: 100,
  },
  {
    date: 'Mar', hours: 2210,
  },
  {
    date: 'Apr', hours: 2290,
  },
  {
    date: 'May', hours: 2000,
  },
  {
    date: 'Jun', hours: 2181,
  },
  {
    date: 'Jul', hours: 2500,
  },
  {
    date: 'Aug', hours: 2100,
  },
];


interface ParamTypes {
  userId: string
}

// display all time user studying
// display this month user studying
// display todays user studying
// show line graph with user studying for this week, that can be scopped to other times

/* eslint-disable @typescript-eslint/no-explicit-any */

const timestamp = new Date('May 23 2017').getTime();
const ONE_DAY = 86400000;

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
    throw TypeError('expected first argument to be an array');
  }

  const fn = typeof format === 'function' ? format : toFixed;
  const num = range || arr.length;
  const res = [];
  const len = arr.length + 1;
  let idx = num - 1;
  while ((idx += 1) < len) {
    res.push(fn(avg(arr, idx, num)));
  }
  return res;
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
  return sum(arr.slice(idx - range, idx)) / range;
}

/**
 * Calculate the sum of an array.
 * @param  {Array} `arr` Array
 * @return {Number} Sum
 */

function sum(arr: any[]) {
  let len = arr.length;
  let num = 0;
  while (len) {
    len -= 1;
    num += Number(arr[len]);
  }
  return num;
}

/**
 * Default format method.
 * @param  {Number} `n` Number to format.
 * @return {String} Formatted number.
 */

function toFixed(n: any) {
  return n.toFixed(2);
}

const hourdata = [1, 1, 1, 2, 2.2, 1, 2.5];

const DATA: any[] = hourdata.map((el, index) => (
  {
    x0: index * ONE_DAY + timestamp,
    x: (index + 1) * ONE_DAY + timestamp,
    y: el,
  }));


const MovingAverageData: any[] = sma(DATA, 3, undefined);

const formattedMovingData: any[] = MovingAverageData.map((el, index) => (
  { x: (index + 3) * ONE_DAY + timestamp, y: el }
));

function UserStats() {
  const { userId } = useParams<ParamTypes>();

  const { loading, error, data } = useQuery(getUserStats);
  const [series, setSeries] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log(data);
    console.log(data.getUserStats.pastWeekTimeSeries.map((day: { datetime: string, y: number }) => ({
      x: day.datetime,
      y: day.y,
    })));
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={3}>
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
              <Grid item xs={8}>
                <BarChart
                  width={500}
                  height={300}
                  data={testData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" fill="#8884d8" />
                </BarChart>
              </Grid>
              <Grid item xs={12}>
                Last year
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            Card 1
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            Card 2
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            Card 3
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserStats;
