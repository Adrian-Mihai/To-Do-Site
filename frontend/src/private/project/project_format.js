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
import REQ_HELPER from '../../helpers/request';
import URL_REPO from '../../constants/url_repo';
import PRIVATE_PAGE_STYLE from '../style/private_page_style';

class ProjectFormat extends React.Component{

	constructor(props){
		super(props);

    this.state = {
      expanded: false,
      points: 0,
    };

    this._handleVote = this._handleVote.bind(this);
    this._getPoints = this._getPoints.bind(this);
	}

  componentDidMount(){
    this._getPoints();
  }

	render(){
    const descriptionLength = this.props.description.length;
    const maxLength = 58;
    const id = cookie.load('userInfo') ? parseInt(cookie.load('userInfo').id) : undefined;
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
            cookie.load('userInfo') ? <IconButton
                                        onClick={this._handleVote}
                                      >
                                        <FavoriteIcon
                                          style={PRIVATE_PAGE_STYLE.voteStyle}
                                        />
                                     </IconButton>  : <FavoriteIcon
                                                        style={PRIVATE_PAGE_STYLE.voteStyle}
                                                      />
          }
          {
            id === this.props.userId ?  <div>
                                    <IconButton>
                                      <EditIcons
                                        style={PRIVATE_PAGE_STYLE.EditButtonStyle}
                                      />
                                    </IconButton>
                                    <IconButton>
                                      <DeleteIcons
                                        style={PRIVATE_PAGE_STYLE.DeleteButtonStyle}
                                      />
                                    </IconButton>
                                    <IconButton>
                                      <ViewListIcon
                                        style={PRIVATE_PAGE_STYLE.taskStyle}
                                      />
                                    </IconButton>
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
    });
  }

  _handleVote = () =>{
    const id = cookie.load('userInfo') ? parseInt(cookie.load('userInfo').id) : undefined;
    if(id !== this.props.userId){
      this.setState({
        points: this.state.points + 1,
      }, () =>{
        REQ_HELPER.putWithoutCooki(`${URL_REPO.BE_VOTE_PROJECT}/${this.props.id}`)
          .send({
            points: this.state.points,
          })
          .then(respone =>{
            console.log(respone);
          }).catch(err =>{
            console.log(err.message);
          })
      })
    }
  };


}

export default ProjectFormat;