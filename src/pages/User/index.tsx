import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserStats from './UserStats'
import UserSearch from './UserSearch'

function UserPage() {
  return (
    <Switch>
      <Route exact path="/users" component={UserSearch} />
      <Route
        exact
        path={['/users/:userId', '/users/:userId/stats']}
        component={UserStats}
      />
    </Switch>
  )
}

export default UserPage
