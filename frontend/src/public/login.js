import React from 'react';
import { withRouter } from 'react-router';
import cookie from 'react-cookies';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import REQ_HELPER from '../helpers/request';
import URL_REPO from '../constants/url_repo';

const styles ={
    card: {
        width: '30rem',
    },
    cardContent: {
        padding: '2rem',
    },
    textfield: {
        width: '100%',
    },
    cardActions: {
        padding: '0 2rem 2rem 2rem',
        justifyContent: 'flex',
        height: 'auto',
    },
    title: {
        fontSize: 27,
    }
};

class Login extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userName: '',
            password: '',
        };
        this._handleButtonClick = this._handleButtonClick.bind(this);
    }

    render(){
        const isEmpty = this.state.userName.trim() === '' || this.state.password.trim() === '';
        return(
            <div className='u-fx u-fx-align-center u-fx-justify-center u-height-full'>
            <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                    <Typography align='center' type="headline" style={styles.title}>
                        Sign In
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
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        placeholder="Enter your user password"
                        margin="normal"
                        onChange={event => this.setState({ password: event.target.value })}
                    />
                </CardContent>
                <CardActions style={styles.cardActions}>
                    <Button
                        raised
                        color="primary"
                        disabled={isEmpty}
                        onClick={this._handleButtonClick}
                    >
                        Sign me in
                    </Button>
                </CardActions>
            </Card>
            </div>
        );
    }

    _handleButtonClick = () =>{
        REQ_HELPER.postWithoutCooki(URL_REPO.BE_LOGIN)
            .send({
                user_name: this.state.userName,
                user_password: this.state.password,
            }).then(res =>{
                cookie.save('userId', res.text, { path: '/' });
                window.location = URL_REPO.ROOT;
        }).catch(err =>{
            console.log(err);
        })
    }

}

export default withRouter(Login);
