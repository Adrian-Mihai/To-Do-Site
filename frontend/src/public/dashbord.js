import React from "react";
import { withRouter } from "react-router";
import AppHeader from "./components/app_header";
import UserFormat from "./user_format";
import Grid from "material-ui/Grid";
import REQ_HELPER from "../helpers/request";
import URL_REPO from "../constants/url_repo";
import PUBLIC_PAGE_STYLE from "./style/public_page_style";

class dashbord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this._getUser = this._getUser.bind(this);
  }

  componentDidMount() {
    this._getUser();
  }

  render() {
    return (
      <div>
        <AppHeader title="Home" />
        <Grid container style={PUBLIC_PAGE_STYLE.root} justify="center">
          {this.state.users.map(user => (
            <Grid key={user.id} style={PUBLIC_PAGE_STYLE.userStyle}>
              <UserFormat
                id={user.id}
                name={user.name}
                email={user.email}
                description={user.description}
                picture={user.picture}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  _getUser = () => {
    REQ_HELPER.getWithCooki(URL_REPO.BE_USERS)
      .then(response => {
        this.setState({
          users: response.body
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
}

export default withRouter(dashbord);
