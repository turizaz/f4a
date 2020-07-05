import * as React from 'react'
import './registration.scss'
import ErrorMessage from '../../../components/common/messages/error-message'
import Validator from 'validator'

import _ from 'lodash'
import {registration} from '../../../ac/auth'
import {connect} from 'react-redux'
import {loaded, loading} from "../../../ac/loader";
import {withNamespaces} from "react-i18next";

interface Props {
  registration: any,
  history: any,
  loading:any,
  loaded: any,
  t: any
}

/**
 * Registration page
 */
class Registration extends React.Component<Props> {

  state = {
    data: {
      email: '',
      password: '',
      name: '',
      repeatPassword: '',
    },
    loading: false,
    errors: {email: null, repeatPassword: null, password: null, name: null},
    backendErrors: [],
  }

  /**
   * Handle all simple text inputs
   * @param {object} e
   * @return {void}
   */
  onChange = (e: any) => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    })
  };

  /**
   * Form validation
   * @return {object}
   */
  validate = (data: any) => {
    const {t} = this.props
    const errors : {
      password: string | null,
      email: string | null,
      name: string | null,
      repeatPassword: string | null
    } = {password: null, email: null, name: null, repeatPassword: null}
    if (!data.password) errors.password = t(`Не может быть пустым`)
    if (!data.email) errors.email = t(`Не может быть пустым`)
    if (!data.name) errors.name = t(`Не может быть пустым`)
    if (!data.password !== !data.repeatPassword) {
      errors.repeatPassword = t(`Пароли не совпадают`)
    }
    if (!Validator.isEmail(data.email)) errors.email = t(`Не валидный емейл`)
    return errors
  };

  onSubmit = async (e: any) => {
    const {t} = this.props
    const {data} = this.state
    e.preventDefault()
    const errors: any = this.validate(data)
    this.setState({errors})
    for (const i in errors) {
      if (errors[i]) {
        return
      }
    }
    const registrationData = _.pick(data, ['name', 'password', 'email'])
    const { registration, loading, loaded } = this.props
    try {
      loading()
      await registration(registrationData)
      this.props.history.push(`/complete-registration`)
    } catch (err) {
      switch (err.status) {
        case 403:
          this.setState({backendErrors: [t('Такой пользователь уже существует')]}
          )
          break
        default:
          this.setState({backendErrors: err.data.errors})
      }
    } finally {
      loaded()
    }
  };

  render() {
    const {t} = this.props
    const {data} = this.state;
    return (
      <form className="
      col-12
      col-md-12
      col-sm-12
      col-lg-6
      col-xl-6
      login-form" onSubmit={this.onSubmit}>
        {
          this.state.backendErrors ? this.state.backendErrors.map(
              (it) => <ErrorMessage key={it} message={it}/>) : null
        }
        <div className="form-group">
          <label>Ник</label>
          <input
            type="name"
            id="name"
            name="name"
            value={data.name}
            placeholder={t('Будет отображатся в интерфейсе')}
            onChange={this.onChange}
            className="form-control"
          />
          {this.state.errors.name && (
            <ErrorMessage message={this.state.errors.name} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">E-mail {t('адрес')}</label>
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
            placeholder="Пароль"
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
            placeholder={t("Повторите пароль")}
          />
          {this.state.errors.repeatPassword && (
            <ErrorMessage message={this.state.errors.repeatPassword} />
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn submit-btn mb-2">
            {t('Зарегистрировтся')}
          </button>
        </div>
      </form>
    )
  }
}

// @ts-ignore
export default connect(null, {registration, loading, loaded})(withNamespaces()(Registration))
