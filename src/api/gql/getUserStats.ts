import { gql } from '@apollo/client';

const getUserStats = gql`
query {
getUserStats(userId:"5"){
studyTime{
pastDay
pastWeek
pastMonth
allTime
}
leaderboardPlacement{
pastDay
pastWeek
pastMonth
allTime
}
studyRole{
currentStudyRole
nextStudyRole
studyTimeToPromotion
roleRank
}
pastDayTimeSeries {
datetime
y
}

pastWeekTimeSeries {
datetime
y
}

pastMonthTimeSeries {
datetime
y
}
allTimeTimeSeries {
datetime
y
}
}
}
`;

export default getUserStats;
