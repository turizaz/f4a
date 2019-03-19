/* eslint-disable no-invalid-this */
import React from 'react';
import './input-barrette.scss';
import PropTypes from 'prop-types';

/**
 * Stylized input
 */
class InputBarrette extends React.Component {
  /**
   * @param {Event} e
   */
  onChange = (e) => {
    this.props.onChange(e);
  };
  /**
   * Main view for widget
   *  @return {string} - html
   */
  render() {
    return (
      <div className="input-barrette">
        <div>
          <input
            type="text"
            className="form-control"
            onChange={this.onChange}
            placeholder="район"/>
        </div>
      </div>
    );
  }
}
InputBarrette.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default InputBarrette;
