/* eslint-disable no-invalid-this */
import React from 'react';
import './login.scss';
import Validator from 'validator';
import ErrorMessage from 'components/common/messages/error-message';
import _ from 'lodash';
import {connect} from 'react-redux';
import {login} from 'ac/auth';
import PropTypes from 'prop-types';

/**
 * Login component
 */
class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };
  /**
   * Handle all simple text inputs
   * @param {object} e
   * @return {void}
   */
  onChange = (e) => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });
  };

  /**
   * Submit form
   * @param {object} e
   */
  onSubmit = (e) => {
    const {login, logout} = this.props;
    const {data} = this.state;
    e.preventDefault();
    const errors = this.validate(data);
    this.setState({errors});
    if (_.isEmpty(errors)) {
      login(data).then(
          () => {
            this.props.history.push('/');
          },
          (err) => {
            this.setState({errors: err.response.data.errors, isLoading: false});
          }
      );
    }
  };
  /**
   * Form validation
   * @param {object} data
   * @return {object}
   */
  validate = (data) => {
    const errors = {};
    if (!data.password) errors.password = `Не может быть пустым`;
    if (!data.email) errors.email = `Не может быть пустым`;
    if (!Validator.isEmail(data.email)) errors.email = `Не валидный емейл`;
    return errors;
  };
  /**
   * Ui for login
   * @return {string} html
   */
  render() {
    const {data} = this.state;
    return (
      <form className="col-6 login-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">E-mail адрес</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={data.email}
            onChange={this.onChange}
            className="form-control"
          />
          {this.state.errors.email && (
            <ErrorMessage message={this.state.errors.email} />
          )}
          <small className="form-text text-muted">
            Мы никогда не передадим вашу электронную почту кому-либо еще.
          </small>
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
            className="form-control"
            placeholder="Дер пароль"
          />
          {this.state.errors.password && (
            <ErrorMessage message={this.state.errors.password} />
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mb-2">
            Войти
          </button>
        </div>
      </form>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
      auth: state.auth,
    }),
    {
      login,
    }
)(Login);
