import React from "react";
import request from "superagent";
import { withRouter } from "react-router";
import cookie from "react-cookies";
import Card, { CardActions, CardContent } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import REQ_HELPER from "../helpers/request";
import URL_REPO from "../constants/url_repo";
import APP_CONSTANTS from "../constants/constants";
import AppHeader from "./components/app_header";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import Dropzone from "react-dropzone";
import Avatar from "material-ui/Avatar";
import PUBLIC_PAGE_STYLE from "./style/public_page_style";

const variants = ["Private", "Public"];

class Regist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      email: "",
      description: "",
      picture: null,
      visibility: "",
      password: "",
      confirmPassword: "",
      publicSelect: false
    };
    this._handleOnClick = this._handleOnClick.bind(this);
    this._checkMatch = this._checkMatch.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._onImageDrop = this._onImageDrop.bind(this);
  }

  render() {
    const isEmpty =
      this.state.userName.trim() === "" ||
      this.state.password.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.confirmPassword.trim() === "" ||
      this.state.visibility === "";
    const requiredLength =
      this.state.password.length >= APP_CONSTANTS.passwordLength;
    const visibilityVerification =
      this.state.visibility === "Public" && this.state.description.trim() === ""
        ? true
        : false;
    return (
      <div>
        <AppHeader title="Sign Up" />
        <Grid container style={PUBLIC_PAGE_STYLE.root} justify="center">
          <Card style={PUBLIC_PAGE_STYLE.card}>
            <CardContent style={PUBLIC_PAGE_STYLE.cardContent}>
              <Typography
                align="center"
                type="headline"
                style={PUBLIC_PAGE_STYLE.title}
              >
                Sign Up
              </Typography>
              <TextField
                required={true}
                id="name"
                label="User name"
                placeholder="Enter your user name"
                margin="normal"
                fullWidth
                autoFocus
                onChange={event =>
                  this.setState({ userName: event.target.value })}
              />
              <TextField
                required={true}
                id="email"
                label="Email"
                placeholder="Enter your user Email"
                margin="normal"
                fullWidth
                onChange={event => this.setState({ email: event.target.value })}
              />
              <InputLabel style={PUBLIC_PAGE_STYLE.inputLabelStyle}>
                Visibility:
              </InputLabel>
              <Select
                value={this.state.visibility}
                onChange={this._handleChange}
                input={<Input style={PUBLIC_PAGE_STYLE.selectStyle} />}
              >
                {variants.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {this.state.publicSelect ? (
                <TextField
                  required
                  id="description"
                  label="Description"
                  multiline
                  rowsMax="5"
                  onChange={event =>
                    this.setState({ description: event.target.value })}
                  margin="normal"
                  fullWidth
                />
              ) : null}
              <Dropzone
                multiple={false}
                accept="image/jpeg, image/png"
                onDrop={this._onImageDrop}
                style={PUBLIC_PAGE_STYLE.dropZoneStyle}
              >
                {this.state.picture ? (
                  <center>
                    <Avatar
                      style={PUBLIC_PAGE_STYLE.avatarStyle}
                      src={this.state.picture.preview}
                    />
                  </center>
                ) : (
                  <InputLabel>
                    <center>Drop an image or click to select</center>
                  </InputLabel>
                )}
              </Dropzone>
              <TextField
                required={true}
                id="password"
                label="Password"
                type="password"
                fullWidth
                placeholder="Enter your user password"
                margin="normal"
                onChange={event =>
                  this.setState({ password: event.target.value })}
              />
              <TextField
                required={true}
                id="password"
                label="Confirm password"
                type="password"
                fullWidth
                margin="normal"
                onChange={event =>
                  this.setState({ confirmPassword: event.target.value })}
              />
            </CardContent>
            <CardActions style={PUBLIC_PAGE_STYLE.cardActions}>
              <Button
                raised
                color="primary"
                disabled={
                  isEmpty ||
                  !requiredLength ||
                  !this._checkMatch() ||
                  visibilityVerification
                }
                onClick={this._handleOnClick}
                style={PUBLIC_PAGE_STYLE.button}
              >
                Sign me up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }

  _checkMatch = () => {
    if (!this.state.password.localeCompare(this.state.confirmPassword)) {
      return true;
    }
    return false;
  };

  _onImageDrop(files) {
    this.setState({
      picture: files[0]
    });
  }

  _handleChange = event => {
    this.setState(
      {
        visibility: event.target.value
      },
      () => {
        if (this.state.visibility === "Public") {
          this.setState({
            publicSelect: true
          });
        } else {
          this.setState({
            publicSelect: false,
            description: "null"
          });
        }
      }
    );
  };

  _handleOnClick = () => {
    const userData = {
      user_name: this.state.userName,
      user_email: this.state.email,
      user_password: this.state.password,
      user_visibility: this.state.visibility,
      user_description: this.state.description
    };
    if (this.state.picture) {
      request
        .post(URL_REPO.BE_REGIST)
        .field(userData)
        .attach(this.state.picture.name, this.state.picture)
        .then(res => {
          cookie.save("userInfo", res.text, { path: "/" });
          const userId = cookie.load("userInfo").id;
          window.location = `/${userId}${URL_REPO.SHOW_PROJECT}`;
        })
        .catch(() => console.log("Err"));
    } else {
      REQ_HELPER.postWithoutCooki(URL_REPO.BE_REGIST)
        .send(userData)
        .then(res => {
          cookie.save("userInfo", res.text, { path: "/" });
          const userId = cookie.load("userInfo").id;
          window.location = `/${userId}${URL_REPO.SHOW_PROJECT}`;
        })
        .catch(err => {
          window.alert("User name already exist");
        });
    }
  };
}

export default withRouter(Regist);
