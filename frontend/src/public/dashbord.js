import React from 'react';
import {withRouter} from 'react-router';
import AppHeader from './components/app_header';

class dashbord extends React.Component{

    render(){
        return(
            <div>
                <AppHeader title="To Do"/>
            </div>
        );
    }

}

export default withRouter(dashbord);