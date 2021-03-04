import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserInsights from './UserInsights'
import UserStats from './UserStats'
import UserTodos from './UserTodos'
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
      {/* <Route exact path="/users/:userId/insights" component={UserInsights} />
          <Route exact path="/users/:userId/todos" component={UserTodos} /> */}
    </Switch>
  )
}

export default UserPage
