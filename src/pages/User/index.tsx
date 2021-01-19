import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserInsights from './UserInsights';
import UserStats from './UserStats';
import UserTodos from './UserTodos';

function UserPage() {
  return (
    <Switch>
      <Route exact path={['/user/:userId', '/user/:userId/stats' ]} component={UserStats} />
      <Route exact path="/user/:userId/insights" component={UserInsights} />
      <Route exact path="/user/:userId/todos" component={UserTodos} />
    </Switch>
  );
}

export default UserPage;
