import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import URL_REPO from "../../constants/url_repo";

class MenuInfo extends React.Component{

    constructor(props){
        super(props);

        this.state={
            anchorEl: undefined,
            open: false,
        }
        this._handleMenuClick = this._handleMenuClick.bind(this);
        this._handleRequestClose = this._handleRequestClose.bind(this);
        this._handleRequestLogIn = this._handleRequestLogIn.bind(this);
        this._handleRequestRegister = this._handleRequestRegister.bind(this);
    }

    render(){
        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns="long-menu"
                    aria-haspopup="true"
                    onClick={this._handleMenuClick}
                    style={{ width: '3rem',color: '#ebebeb' }}
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this._handleRequestClose}
                >
                    <MenuItem onClick={this._handleRequestLogIn}>
                        Log In
                    </MenuItem>
                    <MenuItem onClick={this._handleRequestRegister}>
                        Register
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    _handleMenuClick(event) {
        this.setState({ open: true, anchorEl: event.currentTarget });
    }

    _handleRequestClose = () => {
        this.setState({ open: false });
    };

    _handleRequestLogIn() {
        this.setState({ open: false });
        window.location = URL_REPO.LOGIN;
    }

    _handleRequestRegister(){
        this.setState({ open: false });
    }
}

export default MenuInfo;