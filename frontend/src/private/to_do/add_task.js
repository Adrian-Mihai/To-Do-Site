import React from 'react';
import {withRouter} from 'react-router';
import AppHeader from "../../public/components/app_header";
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import URL_REPO from '../../constants/url_repo';
import REQ_HELPER from '../../helpers/request';

import PRIVATE_PAGE_STYLE from '../style/private_page_style';

class AddTask extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
    }

    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  render(){
    const isEmpty = this.state.title.trim() === '' || this.state.description.trim() === '';
    return(
        <div>
          <AppHeader/>
            <Grid
              container
              justify='center'
              style={PRIVATE_PAGE_STYLE.root}
            >
              <Card style={PRIVATE_PAGE_STYLE.card}>
                <CardContent style={PRIVATE_PAGE_STYLE.cardContent}>
                  <Typography
                    align='center'
                    type="headline"
                    style={PRIVATE_PAGE_STYLE.title}
                  >
                    Add Task
                  </Typography>
                  <TextField
                    required={true}
                    id="title"
                    label="Title"
                    placeholder="Enter the task title"
                    margin="normal"
                    fullWidth
                    autoFocus
                    onChange={event => this.setState({ title: event.target.value })}
                  />
                  <TextField
                    required
                    id="description"
                    label="Description"
                    multiline
                    rowsMax="5"
                    onChange={event => this.setState({ description: event.target.value })}
                    margin="normal"
                    fullWidth
                  />
                </CardContent>
                  <CardActions style={PRIVATE_PAGE_STYLE.cardActions}>
                    <Button
                      raised
                      color="primary"
                      disabled={isEmpty}
                      onClick={this._handleButtonClick}
                      style={PRIVATE_PAGE_STYLE.button}
                    >
                      Add
                  </Button>
              </CardActions>
            </Card>
          </Grid>
        </div>
      )
  }

  _handleButtonClick = () =>{
    const id = this.props.match.params.id;
    REQ_HELPER.postWithoutCooki(URL_REPO.BE_ADD_TASK)
      .send({
        project_id: id,
        task_title: this.state.title,
        task_description: this.state.description,
      }).then(() =>{
        window.alert('Task was added');
        window.location = `${URL_REPO.SHOW_PROJECT}/${id}${URL_REPO.TO_DO_LIST}`;
      }).catch(() =>{
        window.alert('Task already exist');
      })
  };

};

export default withRouter(AddTask);