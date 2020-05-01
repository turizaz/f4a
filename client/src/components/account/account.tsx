import React, {Component} from "react"
import {connect} from 'react-redux'
import './account.scss'
import ErrorMessage from '../../components/common/messages/error-message'
import {loaded, loading} from "../../ac/loader";
import {changePassword} from "../../ac/auth";
interface InputPasswords {password: string, confirmPassword: string}

interface Props {
    auth: any,
    loaded: any,
    loading: any,
    changePassword: any
}
class Account extends Component<Props> {
    state = {
        data: {
            password: '',
            confirmPassword: ''
        },
        loading: false,
        backendErrors: [],
        errors: {password: '', confirmPassword: ''},
    }
    onChange = (e: any) => {
        this.setState({data: {...this.state.data, [e.target.name]: e.target.value}})
    }
    componentDidMount(): void {
        const { auth } = this.props
        if (!auth.isAuthenticated) {
            window.location.href  = '/';
        }
    }

    static validate({password, confirmPassword}: InputPasswords): InputPasswords {
        if((!password || !confirmPassword) || password !== confirmPassword) {
            throw Error('Не валидное значение')
        }
        return {password, confirmPassword}
    }

    onSubmit = async (e: any) => {
        const {loaded, loading, changePassword} = this.props
        loading()
        e.preventDefault();
        try {
            const {password} = Account.validate(this.state.data)
            this.setState({
                ...this.state,
                errors: {password: '', confirmPassword: ''}
            })
            await changePassword(password)
        } catch (e) {
            this.setState({
                ...this.state,
                errors: {
                    password: e.toString().slice(7,100),
                    confirmPassword: e.toString().slice(7,100)
                }
            })
        } finally {
           loaded()
        }
    }
    render(): React.ReactNode {
        const {user} = this.props.auth;
        if(user.type === 'google') {
            return (
              <div>
                  <h3>{user.name}</h3>
                  <p>google account</p>
              </div>
            )
        }
        return (
            <form className='col-12 col-md-12 col-sm-12 col-lg-6 col-xl-6 login-form'
                  onSubmit={this.onSubmit}>
                {this.state.errors.password && (
                    <ErrorMessage message={this.state.errors.password} />
                )}
                <h2>{user.name}</h2>
                <h3>Сменить пароль</h3>
                <div>
                    <label>Новый пароль</label>
                </div>
                <div>
                    <input onChange={this.onChange} name='password' className='form-control'/>
                </div>
                {this.state.errors.confirmPassword && (
                    <ErrorMessage message={this.state.errors.confirmPassword} />
                )}
                <div>
                    <label>Подтвердить пароль</label>
                </div>
                <div>
                    <input onChange={this.onChange} name='confirmPassword' className='form-control'/>
                </div>
                <br/>
                <div className='form-group'>
                    <button type="submit" className="btn submit-btn shadow-0">Сменить пароль</button>
                </div>
                <br/>
            </form>
        );
    }
}
export default connect((state: any) => {
    return {
        auth: state.auth,
    };
}, {loaded, loading, changePassword})(Account)
