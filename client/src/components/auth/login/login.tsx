import React from 'react'
import './login.scss'
import Validator from 'validator'
import ErrorMessage from '../../../components/common/messages/error-message'
import {connect} from 'react-redux'
import {login} from '../../../ac/auth'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {
  history: any,
  login: any
}

class Login extends React.Component<Props> {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    backendErrors: [],
    errors: {email: null, password: null},
  }

  onChange = (e: any) => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    })
  }

  handleErrors(status: number){
    if (status > 399) {
      switch (status) {
        case 401:
          this.setState({
            backendErrors: ['Подтвердите ваш почтовый адресс'],
          })
          break
        case 403:
          this.setState({
            backendErrors: ['Неверный логин или пароль'],
          })
          break
        default:
          this.setState({
            backendErrors: [
              'Произошла серверная ощибка, обратитесь к администратору',
            ],
          })
      }
    } else {
      this.props.history.push('/')
    }
  }

  onSubmit = async (e: any) => {
    const {login} = this.props
    const {data} = this.state
    e.preventDefault()
    const errors = this.validate(data)
    this.setState({errors})
    if (!errors.email && !errors.password) {
      this.setState({loading: true})
      const res = await login(data)
      this.handleErrors(res.status)
      this.setState({loading: false})
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
    const {data} = this.state;
    return (
      <div>
        {this.state.loading &&
              <CircularProgress
                className={'login-spinner'}
                size={200} thickness={1}/>}
        <form className="
        col-12
        col-md-6
        col-lg-6
        col-xl-6
        login-form" onSubmit={this.onSubmit}>
          {
            this.state.backendErrors.map((it) =>
              <ErrorMessage key={it} message={it}/>)}
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
              placeholder="Пароль"
            />
            {this.state.errors.password && (
              <ErrorMessage message={this.state.errors.password} />
            )}
          </div>
          <div className="form-group">
            <div className='forgot-password'>
              <a href="#">Забыли пароль ?</a>
            </div>
            <button type="submit" className="btn submit-btn mb-2">
              Войти
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(
    (state: {auth: any}) => ({
      auth: state.auth,
    }),
    {
      login,
    }
)(Login)
