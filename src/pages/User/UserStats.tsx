import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalRectSeries, LineSeries } from 'react-vis';
import { useQuery } from '@apollo/client';
import { getUserStats } from '../../api';

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



function sma(arr : any[], range : number, format : any) {
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

function avg(arr : any[], idx : number, range : number) {
  return sum(arr.slice(idx - range, idx)) / range;
}

/**
 * Calculate the sum of an array.
 * @param  {Array} `arr` Array
 * @return {Number} Sum
 */

function sum(arr : any[]) {
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

function toFixed(n : any) {
  return n.toFixed(2);
}

const hourdata = [1, 1, 1, 2, 2.2, 1, 2.5];

const DATA : any[] = hourdata.map((el, index) => (
  { x0: index * ONE_DAY + timestamp,
    x: (index + 1) * ONE_DAY + timestamp,
    y: el }));


const MovingAverageData : any[] = sma(DATA, 3, undefined);

const formattedMovingData : any[] = MovingAverageData.map((el, index) => (
  { x: (index + 3) * ONE_DAY + timestamp, y: el }
));

function UserStats() {
  const { userId } = useParams<ParamTypes>();

  const { loading, error, data } = useQuery(getUserStats);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) console.log(data);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography>This is the user stats page for {userId}</Typography>
      </Box>
      <XYPlot
        xDomain={[timestamp, timestamp + 7 * ONE_DAY]}
        yDomain={[0.1, 2.1]}
        xType="time"
        width={300}
        height={300}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalRectSeries data={DATA} style={{ stroke: '#fff' }} />
        <LineSeries data={formattedMovingData} />
      </XYPlot>
    </Container>
  );
}

export default UserStats;
