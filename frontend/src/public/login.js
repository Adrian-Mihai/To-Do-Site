import React from "react";
import { withRouter } from "react-router";
import cookie from "react-cookies";
import Card, { CardActions, CardContent } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import AppHeader from "./components/app_header";
import REQ_HELPER from "../helpers/request";
import URL_REPO from "../constants/url_repo";
import PUBLIC_PAGE_STYLE from "./style/public_page_style";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: ""
    };
    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  render() {
    const isEmpty =
      this.state.userName.trim() === "" || this.state.password.trim() === "";
    return (
      <div>
        <AppHeader title="Sign In" />
        <Grid container style={PUBLIC_PAGE_STYLE.root} justify="center">
          <Card style={PUBLIC_PAGE_STYLE.card}>
            <CardContent style={PUBLIC_PAGE_STYLE.cardContent}>
              <Typography
                align="center"
                type="headline"
                style={PUBLIC_PAGE_STYLE.title}
              >
                Sign In
              </Typography>
              <TextField
                required
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
                id="password"
                label="Password"
                type="password"
                fullWidth
                placeholder="Enter your user password"
                margin="normal"
                onChange={event =>
                  this.setState({ password: event.target.value })}
              />
            </CardContent>
            <CardActions style={PUBLIC_PAGE_STYLE.cardActions}>
              <Button
                raised
                color="primary"
                disabled={isEmpty}
                onClick={this._handleButtonClick}
                style={PUBLIC_PAGE_STYLE.button}
              >
                Sign me in
              </Button>
            </CardActions>
            <p style={PUBLIC_PAGE_STYLE.paragraph}>
              You do not have an account?<a href={URL_REPO.REGIST}>Click here</a>
            </p>
          </Card>
        </Grid>
      </div>
    );
  }

  _handleButtonClick = () => {
    REQ_HELPER.postWithoutCooki(URL_REPO.BE_LOGIN)
      .send({
        user_name: this.state.userName,
        user_password: this.state.password
      })
      .then(res => {
        cookie.save("userInfo", res.text, { path: "/" });
        const userId = cookie.load("userInfo").id;
        window.location = `/${userId}${URL_REPO.SHOW_PROJECT}`;
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default withRouter(Login);
