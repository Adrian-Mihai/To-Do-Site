import React from 'react';
import {withRouter} from 'react-router';
import AppHeader from './components/app_header';


class dashbord extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <AppHeader/>
        );
    }

}

export default withRouter(dashbord);