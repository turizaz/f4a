/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import './registration.scss';
import ErrorMessage from 'components/common/messages/error-message';
import Validator from 'validator';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {registration} from 'ac/auth';
import {connect} from 'react-redux';

/**
 * Registration page
 */
class Registration extends Component {
  state = {
    data: {
      email: '',
      password: '',
      name: '',
      repeatPassword: '',
    },
    loading: false,
    errors: {},
    backendErrors: [],
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
   * Form validation
   * @param {object} data
   * @return {object}
   */
  validate = (data) => {
    const errors = {};
    if (!data.password) errors.password = `Не может быть пустым`;
    if (!data.email) errors.email = `Не может быть пустым`;
    if (!data.name) errors.name = `Не может быть пустым`;
    if (!data.password !== !data.repeatPassword) {
      errors.repeatPassword = `Пароли не совпадают`;
    }
    if (!Validator.isEmail(data.email)) errors.email = `Не валидный емейл`;
    return errors;
  };
  /**
   * Submit form
   * @param {object} e
   */
  onSubmit = (e) => {
    const {data} = this.state;
    e.preventDefault();
    const errors = this.validate(data);
    this.setState({errors});
    if (_.isEmpty(errors)) {
      const registrationData = _.pick(data, ['name', 'password', 'email']);
      const {registration} = this.props;
      registration(registrationData).then(
          () => {
            this.props.history.push('/');
          },
          (err) => {
            switch (err.status) {
              case 409:
                this.setState(
                    {backendErrors: ['Такой пользователь уже существует']}
                );
                break;
              default:
                this.setState({backendErrors: err.data.errors});
            }
          }
      );
    }
  };
  /**
   * @return {JSX} html
   */
  render() {
    const {data} = this.state;
    return (
      <form className="col-6 login-form" onSubmit={this.onSubmit}>
        {
          this.state.backendErrors.map(
              (it) => <ErrorMessage key={it} message={it}/>)}
        <div className="form-group">
          <label>Ник</label>
          <input
            type="name"
            id="name"
            name="name"
            value={data.name}
            placeholder="Будет отображатся в интерфейсе"
            onChange={this.onChange}
            className="form-control"
          />
          {this.state.errors.name && (
            <ErrorMessage message={this.state.errors.name} />
          )}
        </div>
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
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={data.repeatPassword}
            onChange={this.onChange}
            className="form-control"
            placeholder="Повторите пароль"
          />
          {this.state.errors.repeatPassword && (
            <ErrorMessage message={this.state.errors.repeatPassword} />
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn submit-btn mb-2">
            Зарегистрировтся
          </button>
        </div>
      </form>
    );
  }
}
Registration.propTypes = {
  registration: PropTypes.func.isRequired,
  history: PropTypes.object,
};
export default connect(null, {registration})(Registration);
