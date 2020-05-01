import React, {Component} from 'react'
import Header from './components/header'
import CreateGame from './components/create-game'
import ForgotPassword from './components/auth/forgot-password'
import Login from './components/auth/login'
import './bootstrap.css'
import {Route} from 'react-router-dom'
import 'app.scss'
import Game from './components/game'
import About from './components/about'
import Registration from './components/auth/registration'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CompleteRegistration from './components/auth/complete-registration'
import Account from "./components/account";
import CircularProgress from '@material-ui/core/CircularProgress';
import {authGuard} from './HOCs'

interface Props {
  location: any,
  loader: any
}

/**
 * Root of application
 */
class App extends Component<Props> {
  render() {
    const {location, loader} = this.props
    const {loading} = loader
    return (
        <div className={location.id && 'city-picked'}>
          <Header/>
          {loading && <CircularProgress className={'loader-spinner'} color='primary' size={400} thickness={0.3}/>}
          <div className="container main-content">
            <Route path="/about" exact component={About}/>
            <Route path="/account" exact component={authGuard(Account)}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/game/:id" exact component={Game}/>
            <Route path="/forgot-password" exact component={ForgotPassword}/>
            <Route path="/registration" exact component={Registration}/>
            <Route path="/complete-registration" exact
                   component={CompleteRegistration}/>
            <Route path="/" exact component={CreateGame}/>
          </div>
        </div>
    )
  }
}

// @ts-ignore
export default withRouter(connect((state: { location: any; loader: any }) => {
  return {
    location: state.location,
    loader: state.loader
  }
}, null)(App));

