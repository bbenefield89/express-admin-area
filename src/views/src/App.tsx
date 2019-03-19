import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import AdminLogin from './components/AdminLogin/AdminLogin'
import Dashboard from './components/Dashboard/Dashboard'
import Navigation from './components/Navigation/Navigation';

import './App.css';

type State = { baseUrl: String }
class App extends Component<any, State> {

  public state = {
    baseUrl: ''
  }
  
  /**
   * render
   */
  render(): any  {
    return (
      <React.Fragment>
        <Route path='/' render={ (props: any): any => <Navigation { ...props } /> } />
        <Route exact path='/' render={ (props: any): any => this.renderAdminLoginComponent(props) } />
        <Route path='/tables' component={ Dashboard } />
      </React.Fragment>
    )
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
      this.redirectUser('tables')
    }
    else {
      this.redirectUser('')
    }
  }

  /**
   * checkIfUrlAndBaseUrlMatch
   */
  private checkIfUrlAndBaseUrlMatch = (): void => {
    const currentUrlEqualsServersBaseUrl: Boolean = (window.location.href === this.state.baseUrl + '/')
    if (currentUrlEqualsServersBaseUrl) {
      // this.redirectUserToDashboard()
    }
  }

  /**
   * redirectUserToDashboard
   */
  private redirectUser = (path: string): void => {
    this.props.history.push(`/${ path }`)
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
