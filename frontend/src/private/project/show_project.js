import React from "react";
import cookie from "react-cookies";
import AppHeader from "../../public/components/app_header";
import ProjectFormat from "./project_format";
import Grid from "material-ui/Grid";
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
      projects: []
    };

    this._getProject = this._getProject.bind(this);
    this._handleAddProjectButtonClick = this._handleAddProjectButtonClick.bind(
      this
    );
  }

  componentDidMount() {
    this._getProject();
  }

  render() {
    return (
      <div>
        <AppHeader title="Project" />
        <Grid container style={PRIVATE_PAGE_STYLE.root} justify="center">
          {this.state.projects.map(project => (
            <Grid key={project.id} style={PRIVATE_PAGE_STYLE.projectStyle}>
              <ProjectFormat
                id={project.id}
                userId={project.user_id}
                title={project.project_title}
                description={project.project_description}
                status={project.project_status}
                points={project.project_point}
                users={project.project_user_vote}
              />
            </Grid>
          ))}
        </Grid>
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
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  _handleAddProjectButtonClick = () => {
    const userId = cookie.load("userInfo").id;
    window.location = `/${userId}${URL_REPO.SHOW_PROJECT}${URL_REPO.ADD_PROJECT}`;
  };
}

export default ShowProject;
