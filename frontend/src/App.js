import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import URL_REPO from './constants/url_repo';
import './App.css';
import Dashbord from "./public/dashbord";
import Login from "./public/login";
import Regist from "./public/regist";
import PrivateRoute from './helpers/private_route';
import ShowProject from "./private/project/show_project";
import AddProject from "./private/project/add_project";

class App extends Component {
  render() {
    return (
      <Router>
          <main className='u-fx u-fx-column'>
              <Switch>
                  <Route exact path={`${URL_REPO.SHOW_PROJECT}/:id`} component={ShowProject}/>
                  <PrivateRoute exact path={URL_REPO.ADD_PROJECT} component={AddProject}/>
                  <Route exact path={URL_REPO.ROOT} component={Dashbord} />
                  <Route exact path={URL_REPO.LOGIN} component={Login} />
                  <Route exact path={URL_REPO.REGIST} component={Regist} />
              </Switch>
          </main>
      </Router>
    );
  }
}

export default App;
