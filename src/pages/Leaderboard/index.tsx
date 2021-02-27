import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Leaderboard } from './Test';

function UserPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('leaderboard?offset=0&limit=15&time_interval=pastWeek').then(response =>
      response.json().then(data => {
        setLeaderboard(data);
      })
    );
  }, []);


  return (
    <Container maxWidth="lg">
      <Leaderboard leaderboard={leaderboard} />
    </Container>
  );
}

export default UserPage;
