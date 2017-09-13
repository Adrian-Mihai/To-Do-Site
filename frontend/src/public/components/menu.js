import React from 'react';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import HomeIcon from 'material-ui-icons/Home';
import MenuIcon from 'material-ui-icons/Menu';
import URL_REPO from "../../constants/url_repo";
import PUBLIC_PAGE_STYLE from '../style/public_page_style';

class MainMenu extends React.Component{

    constructor(props){
        super(props);

        this.state={
            open: false,
        };
        this._handleMainMenuOpen = this._handleMainMenuOpen.bind(this);
        this._handleMainMenuClose = this._handleMainMenuClose.bind(this);
        this._handleHomeButtonClick = this._handleHomeButtonClick.bind(this);
        this._handleProjectButtonClick = this._handleProjectButtonClick.bind(this);
    }

    render(){
        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns="long-menu"
                    aria-haspopup="true"
                    onClick={this._handleMainMenuOpen}
                    style={{ width: '3rem',color: '#ebebeb' }}
                >
                    <MenuIcon/>
                </IconButton>
                <Drawer
                    open={this.state.open}
                    onRequestClose={this._handleMainMenuClose}
                    onClick={this._handleMainMenuClose}
                >
                    <List style={PUBLIC_PAGE_STYLE.list} subheader={<ListSubheader style={PUBLIC_PAGE_STYLE.listSubheader}>To Do Site</ListSubheader>}>
                        <Divider/>
                        <ListItem button onClick={this._handleHomeButtonClick}>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary= 'Home' />
                        </ListItem>
                        <ListItem button onClick={this._handleProjectButtonClick}>
                            <ListItemText inset primary= 'Project' />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
    }

    _handleMainMenuOpen = () => {
        this.setState({ open: true});
    };

    _handleMainMenuClose = () => {
        this.setState({ open: false});
    };

    _handleHomeButtonClick = () =>{
        this.setState({open: false});
        window.location = URL_REPO.ROOT;
    };

    _handleProjectButtonClick = () =>{
        this.setState({open: false});
        window.location = URL_REPO.SHOWPROJECT;
    };

}

export default MainMenu;