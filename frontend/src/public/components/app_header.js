import React from 'react';
import {withRouter} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import MenuInfo from './menu';

const AppHeader = props => (
    <AppBar position="static">
        <Toolbar>
            <MenuInfo/>
        </Toolbar>
    </AppBar>
);
export default withRouter(AppHeader);