import React from 'react';
import {withRouter} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import MainMenu from './menu';
import cookie from 'react-cookies';
import UserInfo from './user_info';
import URL_REPO from "../../constants/url_repo";
import PUBLIC_PAGE_STYLE from '../style/public_page_style';

const AppHeader = props => (
    <AppBar position="static">
        <Toolbar>
            <MainMenu/>
            <Typography type="title" color="inherit" style={PUBLIC_PAGE_STYLE.text}>
                {props.title}
            </Typography>
            {cookie.load('userInfo') ? <UserInfo/> : <Button color="contrast" onClick={_handleSingInButtonClick}>Sing In</Button>}
            {cookie.load('userInfo') ? null : <Button color="contrast" onClick={_handleSingUpButtonClick}>Sing Up</Button>}
        </Toolbar>
    </AppBar>
);

function _handleSingInButtonClick () {
    window.location = URL_REPO.LOGIN;
}

function _handleSingUpButtonClick () {
    window.location = URL_REPO.REGIST;
}

export default withRouter(AppHeader);