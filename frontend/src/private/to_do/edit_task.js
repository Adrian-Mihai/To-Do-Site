import React from "react";
import cookie from "react-cookies";
import { withRouter } from "react-router";
import AppHeader from "../../public/components/app_header";
import Grid from "material-ui/Grid";
import Card, { CardActions, CardContent } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import URL_REPO from "../../constants/url_repo";
import REQ_HELPER from "../../helpers/request";
import PRIVATE_PAGE_STYLE from "../style/private_page_style";

const variants = ["To Do", "In Work", "Done"];

class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      status: "",
      projectId: ""
    };
    this._getTask = this._getTask.bind(this);
    this._handleEditButtonClick = this._handleEditButtonClick.bind(this);
  }

  componentDidMount() {
    this._getTask();
  }

  render() {
    const isEmpty =
      this.state.description.trim() === "" || this.state.status === "";
    return (
      <div>
        <AppHeader title="Edit Page" />
        <Grid container justify="center" style={PRIVATE_PAGE_STYLE.root}>
          <Card style={PRIVATE_PAGE_STYLE.card}>
            <CardContent style={PRIVATE_PAGE_STYLE.cardContent}>
              <Typography
                align="center"
                type="headline"
                style={PRIVATE_PAGE_STYLE.title}
              >
                {this.state.title}
              </Typography>
              <TextField
                required
                id="description"
                label="Description"
                value={this.state.description}
                multiline
                rowsMax="5"
                onChange={event =>
                  this.setState({ description: event.target.value })}
                margin="normal"
                fullWidth
              />
              <InputLabel style={PRIVATE_PAGE_STYLE.inputLabelStyle}>
                Status:
              </InputLabel>
              <Select
                value={this.state.status}
                onChange={event =>
                  this.setState({ status: event.target.value })}
                input={<Input style={PRIVATE_PAGE_STYLE.selectStyle} />}
              >
                {variants.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
            <CardActions style={PRIVATE_PAGE_STYLE.cardActions}>
              <Button
                raised
                color="primary"
                disabled={isEmpty}
                onClick={this._handleEditButtonClick}
                style={PRIVATE_PAGE_STYLE.button}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }

  _getTask = () => {
    const id = this.props.match.params.id;
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_GET_TASKBYID}/${id}`)
      .then(response => {
        this.setState({
          title: response.body.task_title,
          description: response.body.task_description,
          status: response.body.task_status,
          projectId: response.body.project_id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  _handleEditButtonClick = () => {
    const id = this.props.match.params.id;
    const userId = cookie.load("userInfo").id;
    REQ_HELPER.putWithoutCooki(`${URL_REPO.BE_EDIT_TASK}/${id}`)
      .send({
        task_title: this.state.title,
        task_description: this.state.description,
        task_status: this.state.status
      })
      .then(() => {
        window.location = `/${userId}${URL_REPO.SHOW_PROJECT}/${this.state
          .projectId}${URL_REPO.TO_DO_LIST}`;
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default withRouter(EditTask);
