import React from 'react';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
class login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="u-fx u-fx-align-center u-fx-justify-center u-height-full">
                <Card>
                    <CardContent>
                        <TextField></TextField>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default login;
