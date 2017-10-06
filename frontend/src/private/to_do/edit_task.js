import React from 'react';
import {withRouter} from 'react-router';
import AppHeader from "../../public/components/app_header";
import URL_REPO from '../../constants/url_repo';
import REQ_HELPER from '../../helpers/request';

const variants = ['To Do', 'In Work', 'Done'];

class EditTask extends React.Component{

  constructor(props){
    super(props);

    this.state= {
      title: '',
      description: '',
      status: '',
    }
    this._getTask = this._getTask.bind(this);
  }

  componentDidMount(){
    this._getTask();
  }

  render(){
    return(
        <div>
          <AppHeader title='Edit Page'/>
        </div>
      )
  }

  _getTask = () =>{
    const id = this.props.match.params.id;
    REQ_HELPER.putWithoutCooki(`${URL_REPO.BE_EDIT_TASK}/${id}`)
    .then(response =>{
      console.log(response);
    }).catch(err =>{
      console.log(err);
    })
  };

};

export default withRouter(EditTask);