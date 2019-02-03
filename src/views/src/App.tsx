import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import AdminLogin from './components/AdminLogin/AdminLogin'
import Dashboard from './components/Dashboard/Dashboard'

import './App.css';

type State = { baseUrl: String }
class App extends Component<Object, State> {

  state = {
    baseUrl: ''
  }
  
  /**
   * render
   */
  render(): any  {
    return (
      <React.Fragment>
        <nav>
          <button onClick={ this.adminLogOut }>Log Out</button>
        </nav>
        <Route exact path='/' render={ props => this.renderAdminLoginComponent(props) } />
        <Route path='/dashboard' component={ Dashboard } />
      </React.Fragment>
    )
  }

  public adminLogOut = (): void => {
    localStorage.removeItem('token')
    window.location.href = '/expressadminarea'
  }
  
  /**
   * componentDidMount
   */
  public async componentWillMount(): Promise<void> {
    await this.setBaseUrl()
    this.checkIfAdminJwtIsSet()
  }

  /**
   * renderAdminLoginComponent
   */
  private renderAdminLoginComponent = (props: Object) => {
    return (
      <AdminLogin
        { ...props }
        checkIfAdminJwtIsSet={ this.checkIfAdminJwtIsSet }
      />
    )
  }

  /**
   * checkIfAdminJwtIsSet
   */
  public checkIfAdminJwtIsSet = (): void => {
    const adminJwt: String | null = localStorage.getItem('token')
    if (adminJwt) {
      this.checkIfUrlAndBaseUrlMatch()
    }
  }

  /**
   * checkIfUrlAndBaseUrlMatch
   */
  private checkIfUrlAndBaseUrlMatch = (): void => {
    const currentUrlEqualsServersBaseUrl: Boolean = (window.location.href === this.state.baseUrl + '/')
    if (currentUrlEqualsServersBaseUrl) {
      this.redirectUserToDashboard()
    }
  }

  /**
   * redirectUserToDashboard
   */
  private redirectUserToDashboard = (): void => {
    window.location.href = `${ this.state.baseUrl }/dashboard`
  }

  /**
   * setBaseUrl
   */
  private setBaseUrl = async (): Promise<void> => {
    return fetch('/expressadminarea/api/baseurl')
      .then(res => res.json())
      .then(({ data }) => this.setState({ baseUrl: data }))
  }

}

export default App;
