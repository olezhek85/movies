import { connect } from "react-redux";
import React, { Component } from "react";
import { replace } from "react-router-redux";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { auth } from "../actions";
import {
  isLoggedIn,
  isLogginIn,
  getAuthError,
  getNextLocation
} from "../selectors";

const styles = {
  container: {
    height: "100%",
    width: "100%",
    padding: 16
  },
  card: {
    padding: 16,
    maxWidth: 500,
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexDerection: "column",
    justifyContent: "center"
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
  }
};

const mapStateToProps = state => ({
  isLogginIn: isLogginIn(state),
  isLoggedIn: isLoggedIn(state),
  error: getAuthError(state),
  nextLocation: getNextLocation(state)
});

@withStyles(styles)
@connect(mapStateToProps, { auth, replace })
export default class Login extends Component {
  state = {
    login: "",
    password: ""
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.redirectAuthUser(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.redirectAuthUser(nextProps);
    }
  }

  redirectAuthUser = props => {
    if (props.nextLocation) {
      props.replace(props.nextLocation);
    } else {
      props.replace("/movies?search=");
    }
  };

  handleLoginChange = e => {
    this.setState({
      login: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleLogIn = () => {
    this.props.auth(this.state.login, this.state.password);
  };

  render() {
    const { error, classes } = this.props;

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              fullWidth
              label="Login"
              value={this.state.login}
              onChange={this.handleLoginChange}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <p />
            <Button
              fullWidth
              variant="raised"
              color="primary"
              size="medium"
              onClick={this.handleLogIn}
            >
              Log In
            </Button>
            <p />
            {error && <p className={classes.error}>{error}</p>}
          </CardContent>
        </Card>
      </div>
    );
  }
}
