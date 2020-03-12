import React from 'react'
import './forgot-password.scss'
import {connect} from 'react-redux'
import {forgotPassword} from '../../../ac/auth'
import Validator from 'validator'
import ErrorMessage from '../../../components/common/messages/error-message'
import _ from 'lodash'

class ForgotPassword extends React.Component<any> {
    state = {
        data: {
            email: ''
        },
        loading: false,
        backendErrors: [],
        errors: {email: null},
    }

    onChange = (e: any) => {
        this.setState({data: {...this.state.data, [e.target.name]: e.target.value}})
    }
    static validate(data: any) {
        const errors = {email: ''}
        if(data.email && !Validator.isEmail(data.email)) errors.email = 'Не валидный емейл'
        if(!data.email) errors.email = 'Не может быть пустым'
        return errors
    }
    submit = async (e: any) => {
        const {forgotPassword} = this.props
        e.preventDefault()
        const errors = ForgotPassword.validate(this.state.data)
        if(!_.isEmpty(errors.email)) {
            this.setState({errors})
            return
        }
        await forgotPassword(this.state.data.email)
        window.location.href = '/'

    }
    render() {
        const {email} = this.state.data
        return(
            <div>
                <form className="col-12 col-md-6 col-lg-6 col-xl-6 login-form" onSubmit={this.submit}>
                    <div className="form-group">
                        {this.state.errors.email && (
                            <ErrorMessage message={this.state.errors.email} />
                        )}
                        <label>Email</label>
                        <input value={email} name={'email'} onChange={this.onChange} className="form-control" type="text"/>
                    </div>
                    <p>
                        <button type="submit" className="btn submit-btn mb-2">Войти</button>
                    </p>
                </form>
            </div>
        )
    }
}

export default connect(null, {forgotPassword})(ForgotPassword)
