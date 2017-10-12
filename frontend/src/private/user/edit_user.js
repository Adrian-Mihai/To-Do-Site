import React from "react";
import request from "superagent";
import { withRouter } from "react-router";
import cookie from "react-cookies";
import AppHeader from "../../public/components/app_header";
import Card, { CardActions, CardContent } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import Dropzone from "react-dropzone";
import Avatar from "material-ui/Avatar";
import REQ_HELPER from "../../helpers/request";
import URL_REPO from "../../constants/url_repo";
import PRIVATE_PAGE_STYLE from "../style/private_page_style";

const variants = ["Private", "Public"];

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      visibility: "",
      description: "",
      picture: null,
      newPassword: "",
      confirmPassword: "",
      changeEmail: false,
      changeDescription: false,
      changePassword: false,
      changePicture: false,
      changeVisibility: false
    };
    this.userInfo = cookie.load("userInfo") ? cookie.load("userInfo") : null;
    this._handleEditButtonClick = this._handleEditButtonClick.bind(this);
    this._getUserById = this._getUserById.bind(this);
    this._onImageDrop = this._onImageDrop.bind(this);
    this._checkMatch = this._checkMatch.bind(this);
  }

  componentDidMount() {
    this._getUserById(this.userInfo.id);
  }

  render() {
    return (
      <div>
        <AppHeader title="User Profile" />
        <Grid container justify="center" style={PRIVATE_PAGE_STYLE.root}>
          <Card style={PRIVATE_PAGE_STYLE.card}>
            <Typography
              align="center"
              type="headline"
              style={PRIVATE_PAGE_STYLE.title}
            >
              Edit Profile
            </Typography>
            <CardContent style={PRIVATE_PAGE_STYLE.cardContent}>
              {this.state.changeEmail ? (
                <TextField
                  required={true}
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your user Email"
                  margin="normal"
                  fullWidth
                  onChange={event =>
                    this.setState({ email: event.target.value })}
                />
              ) : null}
              <Button
                raised
                color="primary"
                style={PRIVATE_PAGE_STYLE.button}
                onClick={() =>
                  this.setState({
                    changeEmail: !this.state.changeEmail,
                    email: ""
                  })}
              >
                Change Email
              </Button>
              {this.state.changeDescription ? (
                <TextField
                  required={true}
                  value={this.state.description}
                  id="description"
                  label="Description"
                  placeholder="Enter your description"
                  margin="normal"
                  fullWidth
                  onChange={event =>
                    this.setState({ description: event.target.value })}
                />
              ) : null}
              <Button
                raised
                color="primary"
                style={PRIVATE_PAGE_STYLE.button}
                onClick={() =>
                  this.setState({
                    changeDescription: !this.state.changeDescription
                  })}
              >
                Change Description
              </Button>
              {this.state.changePassword ? (
                <div>
                  <TextField
                    required={true}
                    type="password"
                    id="newPassword"
                    label="New password"
                    placeholder="Enter your new password"
                    margin="normal"
                    fullWidth
                    onChange={event =>
                      this.setState({ newPassword: event.target.value })}
                  />
                  <TextField
                    required={true}
                    type="password"
                    id="confirmPassword"
                    label="Confirm password"
                    placeholder="Confirm your new password"
                    margin="normal"
                    fullWidth
                    onChange={event =>
                      this.setState({ confirmPassword: event.target.value })}
                  />
                </div>
              ) : null}
              <Button
                raised
                color="primary"
                style={PRIVATE_PAGE_STYLE.button}
                onClick={() =>
                  this.setState({
                    changePassword: !this.state.changePassword,
                    newPassword: "",
                    confirmPassword: ""
                  })}
              >
                Change Password
              </Button>
              {this.state.changePicture ? (
                <Dropzone
                  multiple={false}
                  accept="image/jpeg, image/png"
                  onDrop={this._onImageDrop}
                  style={PRIVATE_PAGE_STYLE.dropZoneStyle}
                >
                  {this.state.picture ? (
                    <center>
                      <Avatar
                        style={PRIVATE_PAGE_STYLE.avatarStyle}
                        src={this.state.picture.preview}
                      />
                    </center>
                  ) : (
                    <InputLabel>
                      <center>Drop an image or click to select</center>
                    </InputLabel>
                  )}
                </Dropzone>
              ) : null}
              <Button
                raised
                color="primary"
                style={PRIVATE_PAGE_STYLE.button}
                onClick={() =>
                  this.setState({
                    changePicture: !this.state.changePicture,
                    picture: null
                  })}
              >
                Change Profile Picture
              </Button>
              {this.state.changeVisibility ? (
                <div>
                  <InputLabel style={PRIVATE_PAGE_STYLE.inputLabelStyle}>
                    Visibility:
                  </InputLabel>
                  <Select
                    value={this.state.visibility}
                    onChange={event =>
                      this.setState({ visibility: event.target.value })}
                    input={<Input style={PRIVATE_PAGE_STYLE.selectStyles} />}
                  >
                    {variants.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              ) : null}
              <Button
                raised
                color="primary"
                style={PRIVATE_PAGE_STYLE.button}
                onClick={() =>
                  this.setState({
                    changeVisibility: !this.state.changeVisibility
                  })}
              >
                Change Visibility
              </Button>
            </CardContent>
            <CardActions style={PRIVATE_PAGE_STYLE.cardActions}>
              <Button
                raised
                color="primary"
                onClick={() => this._handleEditButtonClick(this.userInfo.id)}
                disabled={!this._checkMatch()}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }

  _onImageDrop(file) {
    this.setState({ picture: file[0] });
  }

  _checkMatch = () => {
    if (!this.state.newPassword.localeCompare(this.state.confirmPassword)) {
      return true;
    }
    return false;
  };

  _getUserById = id => {
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_USERS}/${id}`)
      .then(response => {
        this.setState({
          description: response.body.user_description,
          visibility: response.body.user_visibility
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  _handleEditButtonClick = id => {
    let userData = {};
    if (this.state.changeEmail && this.state.email !== "") {
      userData.user_email = this.state.email;
    }
    if (this.state.changePassword && this.state.newPassword !== "") {
      userData.user_password = this.state.newPassword;
    }
    userData.user_visibility = this.state.visibility;
    userData.user_description = this.state.description;
    if (this.state.picture) {
      request
        .put(`${URL_REPO.BE_USERS}/${id}`)
        .field(userData)
        .attach(this.state.picture.name, this.state.picture)
        .then(() => {
          window.location = URL_REPO.ROOT;
        })
        .catch(() => console.log("Err"));
    } else {
      REQ_HELPER.putWithoutCooki(`${URL_REPO.BE_USERS}/${id}`)
        .send(userData)
        .then(() => {
          window.location = URL_REPO.ROOT;
        })
        .catch(() => console.log("Err"));
    }
  };
}

export default withRouter(EditProfile);
