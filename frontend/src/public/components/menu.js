import React from "react";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import ListSubheader from "material-ui/List/ListSubheader";
import cookie from "react-cookies";
import HomeIcon from "material-ui-icons/Home";
import MenuIcon from "material-ui-icons/Menu";
import URL_REPO from "../../constants/url_repo";
import PUBLIC_PAGE_STYLE from "../style/public_page_style";
import PRIVATE_PAGE_STYLE from "../../private/style/private_page_style";
import ViewListIcon from "material-ui-icons/ViewList";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this._handleMainMenuButtonClick = this._handleMainMenuButtonClick.bind(
      this
    );
    this._handleHomeButtonClick = this._handleHomeButtonClick.bind(this);
    this._handleProjectButtonClick = this._handleProjectButtonClick.bind(this);
  }

  render() {
    const id = cookie.load("userInfo")
      ? parseInt(cookie.load("userInfo").id, 10)
      : undefined;
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns="long-menu"
          aria-haspopup="true"
          onClick={this._handleMainMenuButtonClick}
          style={{ width: "3rem", color: "#ebebeb" }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={this.state.open}
          onRequestClose={this._handleMainMenuButtonClick}
        >
          <List
            style={PUBLIC_PAGE_STYLE.list}
            subheader={
              <ListSubheader style={PUBLIC_PAGE_STYLE.listSubheader}>
                To Do Site
              </ListSubheader>
            }
          >
            <Divider />
            <ListItem button onClick={this._handleHomeButtonClick}>
              <ListItemIcon>
                <HomeIcon style={PRIVATE_PAGE_STYLE.icons} />
              </ListItemIcon>
              <ListItemText inset primary="Home" />
            </ListItem>
            {id ? (
              <div>
                <ListItem button onClick={this._handleProjectButtonClick}>
                  <ListItemIcon>
                    <ViewListIcon style={PRIVATE_PAGE_STYLE.icons} />
                  </ListItemIcon>
                  <ListItemText inset primary="Project" />
                </ListItem>
              </div>
            ) : null}
          </List>
        </Drawer>
      </div>
    );
  }

  _handleMainMenuButtonClick = () => {
    this.setState({ open: !this.state.open });
  };

  _handleHomeButtonClick = () => {
    this.setState({ open: false });
    window.location = URL_REPO.ROOT;
  };

  _handleProjectButtonClick = () => {
    const id = cookie.load("userInfo").id;
    this.setState({
      open: !this.state.open
    });
    window.location = `/${id}${URL_REPO.SHOW_PROJECT}`;
  };
}

export default MainMenu;
