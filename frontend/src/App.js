import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import URL_REPO from './constants/url_repo';
import './App.css';
import dashbord from "./public/dashbord";
import login from "./public/login";
import regist from "./public/regist";

class App extends Component {
  render() {
    return (
      <Router>
          <main className='u-fx u-fx-column'>
              <Switch>
                  <Route exact path={URL_REPO.ROOT} component={dashbord} />
                  <Route exact path={URL_REPO.LOGIN} component={login} />
                  <Route exact path={URL_REPO.REGIST} component={regist} />
              </Switch>
          </main>
      </Router>
    );
  }
}

export default App;
