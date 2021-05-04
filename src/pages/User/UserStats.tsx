import React from 'react'
import UserStatsView from './UserStatsView'
import { useParams } from 'react-router-dom'
interface ParamTypes {
  userId: string
}

function UserStats() {
  const { userId } = useParams<ParamTypes>()

  return <UserStatsView userId={userId} />
}

export default UserStats
