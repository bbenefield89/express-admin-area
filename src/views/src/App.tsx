import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  RowEdit,
  Table
} from './components/index'
import AdminLogin from './components/AdminLogin/AdminLogin'
import TablesContainer from './components/TablesContainer/TablesContainer'
import Navigation from './components/Navigation/Navigation';

import './App.css';

class App extends Component<any, any> {

  /**
   * render
   */
  render(): any {
    return (
      <React.Fragment>
        <Route path='/' render={(props: any): any => <Navigation {...props} />} />
        <Route exact path='/' render={(props: any): any => this.renderAdminLoginComponent(props)} />
        <Route exact path='/tables' component={TablesContainer} />
        <Route exact path='/tables/:tableName' render={(props: any): any => <Table {...props} />} />
        <Route exact path='/tables/:tableName/:pk' render={(props: any): any => <RowEdit {...props} />} />
      </React.Fragment>
    )
  }

  /**
   * componentDidMount
   */
  public async componentWillMount(): Promise<void> {
    this.checkIfAdminJwtIsSet()
  }

  /**
   * renderAdminLoginComponent
   */
  private renderAdminLoginComponent = (props: Object) => {
    return (
      <AdminLogin
        {...props}
        checkIfAdminJwtIsSet={this.checkIfAdminJwtIsSet}
      />
    )
  }

  /**
   * checkIfAdminJwtIsSet
   */
  public checkIfAdminJwtIsSet = async (): Promise<void> => {
    const adminJwt: String | null = localStorage.getItem('token')
    if (adminJwt) {
      await this.verifyAdminJwt()
    }
    else {
      this.redirectUser('')
    }
  }

  /**
   * verifyAdminJwt
   */
  public verifyAdminJwt = async (): Promise<void> => {
    const response: any = await fetch('/expressadminarea/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Token: `${localStorage.getItem('token')}` }
    })
    const { body }: { body: boolean } = await response.json()
    if (body === true) {
      this.redirectUser('tables')
    }
    else {
      this.redirectUser('')
    }
  }

  /**
   * redirectUserToDashboard
   */
  private redirectUser = (path: string): void => {
    this.props.history.push(`/${path}`)
  }

}

export default App;
