import React from "react";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import { InputLabel } from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import Collapse from "material-ui/transitions/Collapse";
import FavoriteIcon from "material-ui-icons/Favorite";
import ViewListIcon from "material-ui-icons/ViewList";
import Tooltip from "material-ui/Tooltip";
import PUBLIC_PAGE_PAGE from "./style/public_page_style";
import REQ_HELPER from "../helpers/request";
import URL_REPO from "../constants/url_repo";

class UserFormat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      points: 0
    };

    this._handleProjectButtonClick = this._handleProjectButtonClick.bind(this);
    this._getPoints = this._getPoints.bind(this);
  }

  componentDidMount() {
    this._getPoints();
  }

  render() {
    const descriptionLength = this.props.description.length;
    const maxLength = 32;
    return (
      <div>
        <Card style={PUBLIC_PAGE_PAGE.card}>
          <CardHeader
            avatar={<Avatar>{this.props.name.charAt(0).toUpperCase()}</Avatar>}
            title={this.props.name}
            subheader={this.props.email}
          />
          <CardContent style={PUBLIC_PAGE_PAGE.cardContent}>
            <Typography type="body2">Description:</Typography>
            <Typography noWrap>{this.props.description}</Typography>
            {descriptionLength > maxLength ? (
              <IconButton
                onClick={() => {
                  this.setState({ expanded: !this.state.expanded });
                }}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
                style={PUBLIC_PAGE_PAGE.showMore}
              >
                {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            ) : null}
          </CardContent>
          <Collapse
            in={this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardContent>
              <Typography type="body2">Description:</Typography>
              <Typography paragraph>{this.props.description}</Typography>
            </CardContent>
          </Collapse>
          <CardActions style={PUBLIC_PAGE_PAGE.cardActions}>
            <InputLabel>{this.state.points}</InputLabel>
            <Tooltip placement="bottom" title="Like">
              <FavoriteIcon style={PUBLIC_PAGE_PAGE.voteStyle} />
            </Tooltip>
            <Tooltip title="Show project" placement="bottom">
              <IconButton
                onClick={() => this._handleProjectButtonClick(this.props.id)}
              >
                <ViewListIcon style={PUBLIC_PAGE_PAGE.projectStyle} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </div>
    );
  }

  _getPoints = () => {
    REQ_HELPER.getWithCooki(`${URL_REPO.BE_GET_POINTS}/${this.props.id}`)
      .then(response => {
        this.setState({
          points: response.text
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  _handleProjectButtonClick = id => {
    window.location = `/${id}${URL_REPO.SHOW_PROJECT}`;
  };
}

export default UserFormat;
