import React from "react";
import cookie from "react-cookies";
import Card, { CardContent, CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Tooltip from "material-ui/Tooltip";
import EditIcons from "material-ui-icons/Edit";
import DeleteIcons from "material-ui-icons/Delete";
import IconButton from "material-ui/IconButton";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import Collapse from "material-ui/transitions/Collapse";
import URL_REPO from "../../constants/url_repo";
import REQ_HELPER from "../../helpers/request";
import PRIVATE_PAGE_STYLE from "../style/private_page_style";

class TaskFormat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this._handleEditButtonClick = this._handleEditButtonClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
  }

  render() {
    const taskLength = this.props.description.length;
    const maxLength = 58;
    return (
      <div style={PRIVATE_PAGE_STYLE.taskFormatStyle}>
        <Card style={PRIVATE_PAGE_STYLE.card}>
          <CardContent style={PRIVATE_PAGE_STYLE.cardContent}>
            <Typography
              align="center"
              type="headline"
              style={PRIVATE_PAGE_STYLE.title}
            >
              {this.props.title}
            </Typography>
            <Typography type="body2">Description:</Typography>
            <Typography noWrap>{this.props.description}</Typography>
            {taskLength > maxLength ? (
              <IconButton
                onClick={() =>
                  this.setState({ expanded: !this.state.expanded })}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
                style={PRIVATE_PAGE_STYLE.showMore}
              >
                {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            ) : null}
            <Typography align="right">{this.props.date}</Typography>
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
          <CardActions style={PRIVATE_PAGE_STYLE.cardActions}>
            <Tooltip placement="bottom" title="Edit">
              <IconButton
                onClick={() => this._handleEditButtonClick(this.props.id)}
              >
                <EditIcons style={PRIVATE_PAGE_STYLE.EditButtonStyle} />
              </IconButton>
            </Tooltip>
            <Tooltip placement="bottom" title="Delete">
              <IconButton
                onClick={() => this._handleDeleteButtonClick(this.props.id)}
              >
                <DeleteIcons style={PRIVATE_PAGE_STYLE.DeleteButtonStyle} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </div>
    );
  }

  _handleEditButtonClick = id => {
    const userId = cookie.load("userInfo").id;
    window.location = `/${userId}${URL_REPO.SHOW_PROJECT}/${this.props
      .projectId}${URL_REPO.TO_DO_LIST}${URL_REPO.EDIT_TASK}/${id}`;
  };

  _handleDeleteButtonClick = id => {
    const userId = cookie.load("userInfo").id;
    REQ_HELPER.deleteWithCooki(`${URL_REPO.BE_DELETE_TASK}/${id}`)
      .then(() => {
        window.location = `/${userId}${URL_REPO.SHOW_PROJECT}/${this.props
          .projectId}${URL_REPO.TO_DO_LIST}`;
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default TaskFormat;
