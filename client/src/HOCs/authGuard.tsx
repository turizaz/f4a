import React, { Component } from 'react';
import { connect } from 'react-redux';
interface Props {
  isAuthenticated: any,
  history: any,
}
export default (OriginalComponent:any) => {
  class MixedComponent extends Component<Props> {

    checkAuth() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state: {auth: Props}) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};


