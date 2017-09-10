import React from 'react';
import { withRouter } from 'react-router';
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

class regist extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        this._handleOnClick = this._handleOnClick.bind(this);
    }


    render(){
        const isDisabled = this.state.userName === '' || this.state.password === '' || this.state.email === '' || this.state.confirmPassword === '';
        return(
            <div className='u-fx u-fx-align-center u-fx-justify-center u-height-full'>
                <Card style={styles.card}>
                    <CardContent style={styles.cardContent}>
                        <Typography align='center' type="headline" style={styles.title}>
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
                    <CardActions style={styles.cardActions}>
                        <Button
                            raised
                            color="primary"
                            disabled={isDisabled}
                            onClick={this._handleOnClick}
                        >
                            Sign me up
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }

    _handleOnClick = () =>{
        REQ_HELPER.postWithoutCooki(URL_REPO.BE_REGIST)
            .send({
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            })
            .then( () =>{
                console.log('Succes');
            }).catch(() =>{
                console.log('Error');
        });
    }
}

export default withRouter(regist);