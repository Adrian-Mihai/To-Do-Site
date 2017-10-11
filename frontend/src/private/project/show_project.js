import React from "react";
import { withRouter } from "react-router";
import cookie from "react-cookies";
import AppHeader from "../../public/components/app_header";
import ProjectFormat from "./project_format";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import REQ_HELPER from "../../helpers/request";
import URL_REPO from "../../constants/url_repo";
import PRIVATE_PAGE_STYLE from "../style/private_page_style";

class ShowProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      projectInWork: [],
      projectDone: []
    };
    this.verificationId = "";
    this._getProject = this._getProject.bind(this);
    this._handleAddProjectButtonClick = this._handleAddProjectButtonClick.bind(
      this
    );
    this._sortProject = this._sortProject.bind(this);
  }

  componentDidMount() {
    this._getProject();
  }

  render() {
    const hasProject = this.state.projects.length;
    const userId = cookie.load("userInfo") ? cookie.load("userInfo").id : null;
    this.state.projects.length === 0
      ? (this.verificationId = this.props.match.params.id)
      : (this.verificationId = this.state.projects[0].user_id);
    return (
      <div>
        <AppHeader title="Project" />
        {hasProject !== 0 ? (
          <Grid container style={PRIVATE_PAGE_STYLE.root} justify="center">
            <Paper style={PRIVATE_PAGE_STYLE.paperStyle}>
              <Typography
                align="center"
                type="headline"
                style={PRIVATE_PAGE_STYLE.title}
              >
                In Work
              </Typography>
              <Divider />
              {this.state.projectInWork.map(project => (
                <div key={project.id}>
                  <ProjectFormat
                    id={project.id}
                    userId={project.user_id}
                    title={project.project_title}
                    description={project.project_description}
                    status={project.project_status}
                    points={project.project_point}
                    users={project.project_user_vote}
                  />
                  <Divider />
                </div>
              ))}
            </Paper>
            <Paper style={PRIVATE_PAGE_STYLE.paperStyle}>
              <Typography
                align="center"
                type="headline"
                style={PRIVATE_PAGE_STYLE.title}
              >
                Done
              </Typography>
              <Divider />
              {this.state.projectDone.map(project => (
                <div key={project.id}>
                  <ProjectFormat
                    key={project.id}
                    id={project.id}
                    userId={project.user_id}
                    title={project.project_title}
                    description={project.project_description}
                    status={project.project_status}
                    points={project.project_point}
                    users={project.project_user_vote}
                  />
                  <Divider />
                </div>
              ))}
            </Paper>
          </Grid>
        ) : null}
        {userId === this.verificationId ? (
          <Grid container justify="flex-end">
            <Grid item style={PRIVATE_PAGE_STYLE.buttonStyle}>
              <Tooltip placement="bottom" title="Add Project">
                <Button
                  fab
                  color="primary"
                  aria-label="add"
                  onClick={this._handleAddProjectButtonClick}
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        ) : null}
      </div>
    );
  }

  _getProject = () => {
    const id = this.props.match.params.id;
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_SHOW_PROJECT}/${id}`)
      .then(response => {
        this.setState({
          projects: response.body
        });
        this._sortProject(response.body);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  _sortProject = projects => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].project_status === "In work") {
        this.setState({
          projectInWork: [...this.state.projectInWork, projects[i]]
        });
      } else {
        this.setState({
          projectDone: [...this.state.projectDone, projects[i]]
        });
      }
    }
  };

  _handleAddProjectButtonClick = () => {
    const userId = cookie.load("userInfo").id;
    window.location = `/${userId}${URL_REPO.SHOW_PROJECT}${URL_REPO.ADD_PROJECT}`;
  };
}

export default withRouter(ShowProject);
