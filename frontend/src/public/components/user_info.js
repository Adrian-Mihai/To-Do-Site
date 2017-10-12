import React from "react";
import { withRouter } from "react-router";
import IconButton from "material-ui/IconButton";
import LogoutIcon from "material-ui-icons/ExitToApp";
import URL_REPO from "../../constants/url_repo";
import REQ_HELPER from "../../helpers/request";
import cookie from "react-cookies";
import Menu, { MenuItem } from "material-ui/Menu";
import EditIcons from "material-ui-icons/Edit";
import Avatar from "material-ui/Avatar";

class userInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: "",
      name: "",
      anchorEl: undefined,
      open: false
    };
    this.userInfo = cookie.load("userInfo") ? cookie.load("userInfo") : null;
    this._handleAvatarClick = this._handleAvatarClick.bind(this);
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._handleLogOut = this._handleLogOut.bind(this);
    this._handleEditProfile = this._handleEditProfile.bind(this);
    this._getUserById = this._getUserById.bind(this);
  }

  componentDidMount() {
    this._getUserById(this.userInfo.id);
  }

  render() {
    return (
      <div className="u-fx u-fx-align-center">
        <IconButton
          aria-label="More"
          aria-owns="long-menu"
          aria-haspopup="true"
          onClick={this._handleAvatarClick}
          style={{ width: "3rem" }}
        >
          <div>
            {this.state.picture !== "" && this.state.picture !== "null" ? (
              <Avatar
                alt={this.state.name}
                src={require("../user_profile_photo/" + this.state.picture)}
              />
            ) : (
              <Avatar>{this.state.name.charAt(0).toUpperCase()}</Avatar>
            )}
          </div>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this._handleRequestClose}
        >
          <MenuItem onClick={() => this._handleEditProfile(this.userInfo.id)}>
            <EditIcons className="u-mr-full" />
            Edit Profile
          </MenuItem>
          <MenuItem onClick={this._handleLogOut}>
            <LogoutIcon className="u-mr-full" />
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }

  _handleEditProfile = id => {
    window.location = `${URL_REPO.EDIT_PROFILE}/${id}`;
  };

  _handleRequestClose = () => {
    this.setState({ open: false });
  };

  _handleAvatarClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  _handleLogOut = () => {
    this.setState({ open: false });
    cookie.remove("userInfo", { path: "/" });
    window.location = URL_REPO.ROOT;
  };

  _getUserById = id => {
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_USERS}/${id}`)
      .then(response => {
        this.setState({
          picture: response.body.user_picture,
          name: response.body.user_name
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default withRouter(userInfo);
