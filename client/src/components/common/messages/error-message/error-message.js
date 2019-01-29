import React from 'react';
import PropTypes from 'prop-types';
import './error-message.scss';
/**
 * Common error message component
 * @param {object} props
 * @return {string} html
 */
function ErrorMessage(props) {
  return props.message ? (
      <div className="common-error-message">{props.message}</div>
  ) : null;
}
ErrorMessage.propTypes = {
  message: PropTypes.string,
};
export default ErrorMessage;
