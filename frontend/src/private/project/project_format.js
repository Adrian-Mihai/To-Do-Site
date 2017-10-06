import React from 'react';
import cookie from 'react-cookies';
import Card, {CardContent, CardActions } from 'material-ui/Card';
import { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import EditIcons from 'material-ui-icons/Edit';
import DeleteIcons from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import ViewListIcon from 'material-ui-icons/ViewList';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import Tooltip from 'material-ui/Tooltip';
import REQ_HELPER from '../../helpers/request';
import URL_REPO from '../../constants/url_repo';
import PRIVATE_PAGE_STYLE from '../style/private_page_style';


class ProjectFormat extends React.Component{

	constructor(props){
		super(props);

    this.state = {
      expanded: false,
      points: 0,
      users: [],
    };

    this._handleVote = this._handleVote.bind(this);
    this._getPoints = this._getPoints.bind(this);
    this._handleEditButtonClick = this._handleEditButtonClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleTaskButtonClick = this._handleTaskButtonClick.bind(this);
	}

  componentDidMount(){
    this._getPoints();
  }

	render(){
    const descriptionLength = this.props.description.length;
    const maxLength = 58;
    const id = cookie.load('userInfo') ? parseInt(cookie.load('userInfo').id, 10)  : undefined;
		return(
			<div>
        <Card style={PRIVATE_PAGE_STYLE.card}>
        <CardContent style={PRIVATE_PAGE_STYLE.cardContent}>
          <Typography
            align='center'
            type="headline"
            style={PRIVATE_PAGE_STYLE.title}
          >
            {this.props.title}
          </Typography>
          <Typography
            align='right'
          >
            Status
          </Typography>
          {
            this.props.status === 'In work' ? <Typography
                                                align= 'right'
                                                style={PRIVATE_PAGE_STYLE.statusInWork}
                                              >
                                                {this.props.status}
                                              </Typography> : <Typography
                                                                align= 'right'
                                                                style={PRIVATE_PAGE_STYLE.statusDone}
                                                              >
                                                                {this.props.status}
                                                              </Typography>   
          }
          <Typography type="body2">
            Description:
          </Typography>
          <Typography noWrap>
            {this.props.description}
          </Typography>  
          {
            descriptionLength > maxLength ? <IconButton
                                              onClick={() =>{this.setState({expanded: !this.state.expanded})}}
                                              aria-expanded={this.state.expanded}
                                              aria-label="Show more"
                                              style={PRIVATE_PAGE_STYLE.showMore}
                                            >
                                              {this.state.expanded ? <ExpandLess/> : <ExpandMore/>}
                                            </IconButton> : null
          }
          </CardContent>
           <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
            <Typography type="body2">
              Description:
            </Typography>
            <Typography paragraph>
             {this.props.description}
            </Typography>
            </CardContent>
           </Collapse>
          <CardActions style={PRIVATE_PAGE_STYLE.cardActions}>
          <InputLabel>{this.state.points}</InputLabel>
          {
            cookie.load('userInfo') ? <Tooltip placement="bottom" title="Like">
                                        <IconButton
                                          onClick={this._handleVote}
                                        >
                                          <FavoriteIcon
                                            style={PRIVATE_PAGE_STYLE.voteStyle}
                                          />
                                        </IconButton>
                                     </Tooltip>  :  <Tooltip placement="bottom"  title="Like">
                                                      <FavoriteIcon
                                                        style={PRIVATE_PAGE_STYLE.voteStyle}
                                                      />
                                                    </Tooltip>
          }
          {
            id === this.props.userId ?  <div>
                                          <Tooltip placement="bottom" title="Edit">
                                            <IconButton
                                              onClick= {() => this._handleEditButtonClick(this.props.id)}
                                            >
                                              <EditIcons
                                                style={PRIVATE_PAGE_STYLE.EditButtonStyle}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip placement="bottom" title="Delete">
                                            <IconButton
                                              onClick = { () => this._handleDeleteButtonClick(this.props.id)}
                                            >
                                              <DeleteIcons
                                                style={PRIVATE_PAGE_STYLE.DeleteButtonStyle}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip placement="bottom" title="Show To-Do">
                                            <IconButton
                                              onClick= {() => this._handleTaskButtonClick(this.props.id)}
                                            >
                                              <ViewListIcon
                                              style={PRIVATE_PAGE_STYLE.taskStyle}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                        </div>  :  null 
          }
          </CardActions>
        </Card>
			</div>
		)
  };

  _getPoints = () =>{
    this.setState({
      points: this.props.points,
      users: this.props.users,
    });
  };

  _handleEditButtonClick = id =>{
    window.location = `${URL_REPO.EDIT_PROJECT}/${id}`;
  };

  _handleDeleteButtonClick = id =>{
    REQ_HELPER.deleteWithCooki(`${URL_REPO.BE_DELETE_PROJECT}/${id}`)
      .then(() =>{
        window.location = `${URL_REPO.SHOW_PROJECT}/${this.props.userId}`;
      }).catch(err =>{
        console.log(err);
      })
  };

  _handleTaskButtonClick = id =>{
    window.location = `${URL_REPO.SHOW_PROJECT}/${id}${URL_REPO.TO_DO_LIST}`;
  }

  _handleVote = () =>{
    const id = cookie.load('userInfo') ? parseInt(cookie.load('userInfo').id, 10) : undefined;
    if(!this.state.users.toString().includes(id)){
      REQ_HELPER.putWithoutCooki(`${URL_REPO.BE_VOTE_PROJECT}/${this.props.id}`)
          .send({
            points: this.state.points + 1,
            users: [...this.state.users, cookie.load('userInfo').id],
          })
          .then(respone =>{
            this.setState({
              points: this.state.points + 1,
              users: [...this.state.users, cookie.load('userInfo').id],
            });
          }).catch(err =>{
            console.log(err.message);
          })
    }
  };

}

export default ProjectFormat;