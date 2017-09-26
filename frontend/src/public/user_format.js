import React from 'react';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ViewListIcon from 'material-ui-icons/ViewList';
import PUBLIC_PAGE_PAGE from './style/public_page_style';

class UserFormat extends React.Component{
  
  constructor(props){
    super(props);
  }

  render(){
    return(
        <div>
          <Card
            style={PUBLIC_PAGE_PAGE.card}
          >
            <CardHeader
              avatar={
                <Avatar>
                {this.props.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={this.props.name}
              subheader={this.props.email}
            />
            <CardActions
              style={PUBLIC_PAGE_PAGE.cardActions}
            >
            <IconButton>
              <FavoriteIcon style={PUBLIC_PAGE_PAGE.voteStyle}/>
            </IconButton>
            <IconButton>
              <ViewListIcon style={PUBLIC_PAGE_PAGE.projectStyle}/>
            </IconButton>
            </CardActions>  
          </Card>
        </div>
      )
  }
}

export default UserFormat;
