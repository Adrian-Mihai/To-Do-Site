import React from 'react';
import AppHeader from '../../public/components/app_header';
import ProjectFormat from './project_format';
import Grid from 'material-ui/Grid';
import REQ_HELPER from '../../helpers/request';
import URL_REPO from '../../constants/url_repo';
import PRIVATE_PAGE_STYLE from '../style/private_page_style';

class ShowProject extends React.Component{
	constructor(props){
    super(props);
    
    this.state = {
      projects: [],
    }

    this._getProject = this._getProject.bind(this);
  }

  componentDidMount(){
    this._getProject();
  }

    render(){
        return(
            <div>
                <AppHeader title="Project"/>
                <Grid
                  container
                  style={PRIVATE_PAGE_STYLE.root}
                  justify="center"
                >
                  {
                    this.state.projects.map( project =>(<Grid
                                                          key={project.id}
                                                          style={PRIVATE_PAGE_STYLE.projectStyle}
                                                        >
                                                          <ProjectFormat
                                                            title={project.project_title}
                                                            description={project.project_description}
                                                            status = {project.project_status}
                                                          />
                                                        </Grid>
                                                        ))
                  }
                </Grid>            
            </div>
        );
    }

    _getProject = () =>{
      REQ_HELPER.getWithCooki(URL_REPO.BE_SHOW_PROJECT)
        .then(response =>{
          this.setState({
            projects: response.body,
          });
        }).catch(err =>{
          console.log(err.message);
        })
    };
}

export default ShowProject;