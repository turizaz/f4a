import * as React from 'react'
import './login.scss'
import Validator from 'validator'
import ErrorMessage from '../../../components/common/messages/error-message'
import {connect} from 'react-redux'
import {login} from '../../../ac/auth'
import {Link} from 'react-router-dom'
import {loaded, loading} from "../../../ac/loader";
import SingInGoogle from './oauth/google'
import {withNamespaces} from "react-i18next";
interface Props {history: any, login: any, loading: any, loaded: any, t: any}

class Login extends React.Component<Props> {

  state = {
    data: {email: '', password: ''},
    loading: false,
    backendErrors: [],
    errors: {email: null, password: null},
  }

  goToRegister = (e: any) => {
    e.preventDefault()
    window.location.href = '/registration'
  }

  onChange = (e: any) => {
    this.setState({data: {...this.state.data, [e.target.name]: e.target.value}})
  }

  handleErrors(status: number){
    if(status < 300) {
      this.props.history.push('/')
      return
    } else {
      switch (status) {
        case 401:
          this.setState({backendErrors: ['Подтвердите ваш почтовый адресс']})
          break
        case 403:
          this.setState({backendErrors: ['Неверный логин или пароль']})
          break
        default:
          this.setState({backendErrors: ['Произошла серверная ощибка, обратитесь к администратору']})
      }
    }
  }

  submit = async (e: any) => {
    const {login, loading, loaded} = this.props
    const {data} = this.state
    e.preventDefault()
    const errors = this.validate(data)
    this.setState({errors})
    if (!errors.email && !errors.password) {
      try {
        loading()
        const res = await login(data)
        this.handleErrors(res.status)
      } finally {
        loaded()
      }
    }
  }

  validate = (data: any) => {
    const errors: {password: any, email: any} = {password: null, email: null}
    if (!data.password) errors.password = `Не может быть пустым`
    if (!data.email) errors.email = `Не может быть пустым`
    if (!Validator.isEmail(data.email)) errors.email = `Не валидный емейл`
    return errors
  }

  render() {
    const {t} = this.props
    const {data} = this.state;
    return (
      <div>
        <form className="col-md-6 login-form" onSubmit={this.submit}>
          {
            this.state.backendErrors.map((it) =>
              <ErrorMessage key={it} message={it}/>)}
          <div className="form-group">
            <label>E-mail {t('адрес')}</label>
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
            <div className='forgot-password'>
              <Link to="/forgot-password">{t('Забыли')} пароль ?</Link>
            </div>
            <button type="submit" className="btn submit-btn mb-2">{t('Войти')}</button>
            &nbsp;
            <button onClick={this.goToRegister} className="btn submit-btn mb-2">{t('Зарегистрировтся')}</button>
            <br/>
            <SingInGoogle/>
          </div>
        </form>
      </div>
    )
  }
}


export default connect(
    (state: {auth: any}) => ({
      auth: state.auth,
    }), {login, loading, loaded}
    // @ts-ignore
)(withNamespaces()(Login))
