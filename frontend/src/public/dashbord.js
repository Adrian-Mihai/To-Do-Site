import React from 'react';
import {withRouter} from 'react-router';
import AppHeader from './components/app_header';

class dashbord extends React.Component{

    render(){
        return(
            <AppHeader/>
        );
    }

}

export default withRouter(dashbord);