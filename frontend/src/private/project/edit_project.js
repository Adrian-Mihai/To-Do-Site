import React from "react";
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
import REQ_HELPER from "../../helpers/request";
import URL_REPO from "../../constants/url_repo";
import PRIVATE_PAGE_STYLE from "../style/private_page_style";

const variants = ["In work", "Done"];

class EditProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      status: "",
      user: ""
    };

    this._handleEditButtonClick = this._handleEditButtonClick.bind(this);
    this._getProject = this._getProject.bind(this);
  }

  componentDidMount() {
    this._getProject();
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

  _getProject = () => {
    const id = this.props.match.params.id;
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_EDIT_PROJECT}/${id}`)
      .then(response => {
        this.setState({
          title: response.body.project_title,
          description: response.body.project_description,
          status: response.body.project_status,
          user: response.body.user_id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  _handleEditButtonClick = () => {
    const id = this.props.match.params.id;
    REQ_HELPER.putWithoutCooki(`${URL_REPO.BE_EDIT_PROJECT}/${id}`)
      .send({
        project_description: this.state.description,
        project_status: this.state.status
      })
      .then(response => {
        window.location = `/${this.state.user}${URL_REPO.SHOW_PROJECT}`;
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default withRouter(EditProject);
