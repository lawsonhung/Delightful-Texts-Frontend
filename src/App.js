import React from 'react';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import LogInPage from './LogInPage';
import RegistrationPage from './RegistrationPage';

import { Switch, Route, withRouter } from 'react-router-dom'

class App extends React.Component{

render(){
    return (
      <Switch>
        <Route path={'/signup'} component={SignUpPage} />
        <Route path={'/login'} component={LogInPage} />
        <Route path={'/registration'} component={RegistrationPage} />
        <Route path={'/'} component={HomePage} />
      </Switch>
    )
  }
}

export default withRouter(App);
