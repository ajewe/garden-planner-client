import React from 'react';
import { Switch, Route } from 'react-router';
import { Main } from './components/Main';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
    </Switch>
  );
}

export default Router;