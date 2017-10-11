import React from "react";
import { withRouter } from "react-router";
import AppHeader from "./components/app_header";
import Card, { CardActions, CardContent } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import Dropzone from "react-dropzone";
import REQ_HELPER from "../helpers/request";
import URL_REPO from "../constants/url_repo";
import PRIVATE_PAGE_STYLE from "../style/private_page_style";

const variants = ["Private", "Public"];

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      visibility: "",
      description: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  }
}

export default withRouter(EditUser);
