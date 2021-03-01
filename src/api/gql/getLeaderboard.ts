import { gql } from '@apollo/client';

const getLeaderboard = gql`
query($timeInterval: TimeInterval!) {
  getLeaderboard(timeInterval: $timeInterval)
    {
      username
      studyTimeInMinutes
    }
}
`;

export default getLeaderboard;


