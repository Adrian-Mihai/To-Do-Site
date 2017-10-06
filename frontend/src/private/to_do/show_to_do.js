import React from 'react';
import {withRouter} from 'react-router';
import AppHeader from "../../public/components/app_header";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import URL_REPO from '../../constants/url_repo';
import REQ_HELPER from '../../helpers/request';
import TaskFormat from './task_format';
import PRIVATE_PAGE_STYLE from '../style/private_page_style';

class ShowToDo extends React.Component{

  constructor(props){
    super(props);

    this.state= {
      tasks: [],
      taskToDo: [],
      taskInWork: [],
      taskDone: [],
    }

    this._handleAddTaskButtonClick = this._handleAddTaskButtonClick.bind(this);
    this._getTask = this._getTask.bind(this);
    this._sortTask = this._sortTask.bind(this);
  }

  componentDidMount(){
    this._getTask();
  }

  render(){
    console.log(this.state.taskToDo);
    return(
        <div>
          <AppHeader title='To Do'/>
            
            {
              this.state.taskToDo.map(task =>( <Grid
                                              key={task.id}
                                              container
                                              justify= 'center'
                                            >  
                                              <TaskFormat
                                                id={task.id}
                                                projectId ={task.project_id}
                                                title={task.task_title}
                                                description={task.task_description}
                                                date={task.task_date}
                                              />
                                            </Grid>
                                            ))
            }
              <Tooltip placement="bottom" title="Add Task">
                <Button
                  fab
                  color="primary"
                  aria-label="add"
                  onClick = {this._handleAddTaskButtonClick}
                >
                  <AddIcon />
                </Button>
              </Tooltip>
        </div>
      )
  }

  _handleAddTaskButtonClick = () =>{
    const id = this.props.match.params.id;
    window.location = `${URL_REPO.SHOW_PROJECT}/${id}${URL_REPO.TO_DO_LIST}${URL_REPO.ADD_TASK}`
  };

  _getTask = () =>{
    const id = this.props.match.params.id;
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_GET_TASK}/${id}`)
    .then(response =>{
      this.setState({
        tasks: response.body,
      });
      this._sortTask(response.body);
    }).catch(err =>{
      console.log(err.message);
    })
  };

  _sortTask = tasks =>{
    for(let i= 0; i< tasks.length; i++){
      if(tasks[i].task_status === 'To Do'){
        this.setState({
          taskToDo: [...this.state.taskToDo, tasks[i]],
        });
      }else if(tasks[i].task_status === 'In Work'){
        this.setState({
          taskInWork: [...this.state.taskInWork, tasks[i]],  
        });
      }else{
        this.setState({
          taskDone: [...this.state.taskDone, tasks[i]],
        });
      }  
    }
  };

};

export default withRouter(ShowToDo);