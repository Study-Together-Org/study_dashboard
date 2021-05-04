import React, { useContext } from 'react'
import UserStatsView from './UserStatsView'
import { useParams } from 'react-router-dom'
import { UserContext } from 'contexts/UserContext'
interface ParamTypes {
  userId: string
}

function YourUserStats() {
  const { user, setUser } = useContext(UserContext)
  console.log(user.id)
  return <UserStatsView userId={user.id} />
}

export default YourUserStats
