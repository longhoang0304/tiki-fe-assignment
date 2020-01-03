import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './HomePage';
import BeginnerBoardPage from './BeginnerBoardPage';
import AdvantageBoardPage from './AdvantageBoardPage';

const RootRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/beginner" component={BeginnerBoardPage} />
    <Route exact path="/advantage" component={AdvantageBoardPage} />
    <Redirect to="/" />
  </Switch>
);

export default RootRoutes;
