import React from 'react';
import cookie from 'react-cookies';
import { Route, Redirect } from 'react-router-dom';
import URL_REPO from '../constants/url_repo';

class PrivateRoute extends React.Component{
    constructor(props){
        super(props);
        this.token = cookie.load('userInfo') ? cookie.load('userInfo') : null;
    }

    componentDidMount() {
        localStorage.setItem(
            'lastRoute',
            this.props.location.pathname + this.props.location.search,
        );
    }

    render(){
        const { component: Component, ...rest } = this.props;
        return(
            <Route
                {...rest}
                render = {props =>
                this.token ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                    to={
                        {
                            pathname: URL_REPO.LOGIN,
                            state: {from: props.location},
                        }
                    }
                    />
                )}
            />
        );
    }
}

export default PrivateRoute;