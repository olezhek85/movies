import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";

export default class App extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
