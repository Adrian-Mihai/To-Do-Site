import React from 'react';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import EditIcons from 'material-ui-icons/Edit';
import DeleteIcons from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import PRIVATE_PAGE_STYLE from '../style/private_page_style';

class ProjectFormat extends React.Component{

	constructor(props){
		super(props);

    this.state = {
      expanded: false,
    };

    this._handleButtonClick = this._handleButtonClick.bind(this);
	}

	render(){
    const descriptionLength = this.props.description.length;
    const maxLength = 58;
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
          Status: {this.props.status}
          </Typography>
          <Typography>
            Description:
          </Typography>
          <Typography noWrap>
            {this.props.description}
          </Typography>
          {descriptionLength > maxLength ? 
            <div>
              <IconButton
                onClick={() =>{this.setState({expanded: !this.state.expanded})}}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
                style={PRIVATE_PAGE_STYLE.showMore}
              >
            {this.state.expanded ? <ExpandLess/> : <ExpandMore/>}
          </IconButton>
            </div> : null}
          </CardContent>
           <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
               {this.props.description}
              </Typography>
            </CardContent>
           </Collapse>
          <CardActions style={PRIVATE_PAGE_STYLE.cardActions}>
          <IconButton>
            <EditIcons/>
          </IconButton>
          <IconButton>
            <DeleteIcons/>
          </IconButton>
          </CardActions>
        </Card>
			</div>
		);
	}
  _handleButtonClick = () =>{
    console.log(this.props);
  }
}

export default ProjectFormat;