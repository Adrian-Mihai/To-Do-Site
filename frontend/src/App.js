import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import URL_REPO from "./constants/url_repo";
import "./App.css";
import Dashbord from "./public/dashbord";
import Login from "./public/login";
import Regist from "./public/regist";
import PrivateRoute from "./helpers/private_route";
import ShowProject from "./private/project/show_project";
import AddProject from "./private/project/add_project";
import EditProject from "./private/project/edit_project";
import ShowToDo from "./private/to_do/show_to_do";
import AddTask from "./private/to_do/add_task";
import EditTask from "./private/to_do/edit_task";

class App extends Component {
  render() {
    return (
      <Router>
        <main className="u-fx u-fx-column">
          <Switch>
            <Route
              exact
              path={`/:id${URL_REPO.SHOW_PROJECT}`}
              component={ShowProject}
            />
            <PrivateRoute
              exact
              path={`/:id${URL_REPO.SHOW_PROJECT}${URL_REPO.ADD_PROJECT}`}
              component={AddProject}
            />
            <PrivateRoute
              exact
              path={`/:id${URL_REPO.SHOW_PROJECT}${URL_REPO.EDIT_PROJECT}/:id`}
              component={EditProject}
            />
            <PrivateRoute
              exact
              path={`/:id${URL_REPO.SHOW_PROJECT}/:id${URL_REPO.TO_DO_LIST}`}
              component={ShowToDo}
            />
            <PrivateRoute
              exact
              path={`/:id${URL_REPO.SHOW_PROJECT}/:id${URL_REPO.TO_DO_LIST}${URL_REPO.ADD_TASK}`}
              component={AddTask}
            />
            <PrivateRoute
              exact
              path={`/:id${URL_REPO.SHOW_PROJECT}/:id${URL_REPO.TO_DO_LIST}${URL_REPO.EDIT_TASK}/:id`}
              component={EditTask}
            />
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
