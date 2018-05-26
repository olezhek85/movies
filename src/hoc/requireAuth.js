import { connect } from "react-redux";
import React, { Component } from "react";
import { isLoggedIn } from "../selectors";
import { replace } from "react-router-redux";

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
  pathname: state.router.location.pathname,
  search: state.router.location.search
});

export default function requireAuth(WrappedComponent) {
  @connect(mapStateToProps, { replace })
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth = props => {
      const { isLoggedIn } = props;

      if (!isLoggedIn) {
        props.replace({
          pathname: "/login",
          state: {
            nextLocation: {
              pathname: props.pathname,
              search: props.search
            }
          }
        });
      }
    };

    render() {
      const { isLoggedIn, ...otherProps } = this.props;

      return isLoggedIn ? <WrappedComponent {...otherProps} /> : null;
    }
  }

  return AuthenticatedComponent;
}
