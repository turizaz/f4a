import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withGameService} from 'hoc-helpers';

class GamesList extends Component {
  render() {
    const {location} = this.props;
    return <div>{location.get('id')}</div>;
  }
}
GamesList.propTypes = {
  gameService: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default connect(
    (state) => {
      return {
        location: state.location,
      };
    },
    null,
)(withGameService(GamesList));
