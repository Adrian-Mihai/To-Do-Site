import React from 'react';
import { withRouter } from 'react-router';
import cookie from 'react-cookies';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import REQ_HELPER from '../helpers/request';
import URL_REPO from '../constants/url_repo';
import APP_CONSTANTS from '../constants/constants';
import AppHeader from './components/app_header';
import PUBLIC_PAGE_STYLE from './style/public_page_style';

class Regist extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        this._handleOnClick = this._handleOnClick.bind(this);
        this._checkMatch = this._checkMatch.bind(this);
    }

    render(){
        const isEmpty = this.state.userName.trim() === '' || this.state.password.trim() === '' || this.state.email.trim() === '' || this.state.confirmPassword.trim() === '';
        const requiredLength = this.state.password.length >= APP_CONSTANTS.passwordLength;
        return(
            <div>
                <AppHeader title="Sign Up"/>
                <Grid container style={PUBLIC_PAGE_STYLE.root} justify="center">
                <Card style={PUBLIC_PAGE_STYLE.card}>
                    <CardContent style={PUBLIC_PAGE_STYLE.cardContent}>
                        <Typography align='center' type="headline" style={PUBLIC_PAGE_STYLE.title}>
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
                            onChange={event => this.setState({ userName: event.target.value })}
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
                        <TextField
                            required={true}
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            placeholder="Enter your user password"
                            margin="normal"
                            onChange={event => this.setState({ password: event.target.value })}
                        />
                        <TextField
                            required={true}
                            id="password"
                            label="Confirm password"
                            type="password"
                            fullWidth
                            margin="normal"
                            onChange={event => this.setState({ confirmPassword: event.target.value })}
                        />
                    </CardContent>
                    <CardActions style={PUBLIC_PAGE_STYLE.cardActions}>
                        <Button
                            raised
                            color="primary"
                            disabled={isEmpty || !requiredLength || !this._checkMatch()}
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
        if(!this.state.password.localeCompare(this.state.confirmPassword)){
            return true;
        }
        return false;
    };

    _handleOnClick = () =>{
        REQ_HELPER.postWithoutCooki(URL_REPO.BE_REGIST)
            .send({
                user_name: this.state.userName,
                user_email: this.state.email,
                user_password: this.state.password
            })
            .then( (res) =>{
                cookie.save('userInfo', res.text, { path: '/' });
                console.log(cookie.load('userInfo'));
                window.location = URL_REPO.ROOT;
            }).catch((err) =>{
                console.log(err);
        });
    }
}

export default withRouter(Regist);