import { gql } from '@apollo/client';

const getLeaderboard = gql`
query($timeInterval: TimeInterval!) {
  getLeaderboard(timeInterval: pastDay)
    {
      username
      studyTimeInMinutes
    }
}
`;

export default getLeaderboard;


