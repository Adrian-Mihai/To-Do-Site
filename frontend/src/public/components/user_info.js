import React from 'react';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import LogoutIcon from 'material-ui-icons/ExitToApp';
import URL_REPO from '../../constants/url_repo';
import cookie from 'react-cookies';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';

class userInfo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            anchorEl: undefined,
            open: false,
        };
        this.userInfo = cookie.load('userInfo') ? cookie.load('userInfo') : null;
        this._handleAvatarClick = this._handleAvatarClick.bind(this);
        this._handleRequestClose = this._handleRequestClose.bind(this);
        this._handleLogOut = this._handleLogOut.bind(this);
    }

    render(){
        return(
            <div className="u-fx u-fx-align-center">
                <IconButton
                    aria-label="More"
                    aria-owns="long-menu"
                    aria-haspopup="true"
                    onClick={this._handleAvatarClick}
                    style={{ width: '3rem' }}
                >
                    <div>
                        <Avatar>{this.userInfo.name}</Avatar>
                    </div>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this._handleRequestClose}
                >
                    <MenuItem onClick={this._handleLogOut}>
                        <LogoutIcon className="u-mr-full" />
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        );
    }

    _handleRequestClose = () => {
        this.setState({ open: false });
    };

    _handleAvatarClick(event) {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };
    _handleLogOut = () =>{
        this.setState({ open: false });
        cookie.remove('userInfo', { path: '/' });
        window.location = URL_REPO.ROOT;
    }
}

export default withRouter(userInfo);