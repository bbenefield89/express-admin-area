import React, { Component } from 'react';
import './App.css';

import AdminLogin from './components/AdminLogin/AdminLogin'

class App extends Component {

  state = {
    baseUrl: ''
  }
  
  render() {
    this.handleCheckIfAdminJwtIsSet()
    
    return (
      <AdminLogin />
    )
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.handleSetServerBaseUrl()
  }
  
  /**
   * handleCheckIfAdminJwtIsSet
   */
  handleCheckIfAdminJwtIsSet = (): void => {
    const adminJwt = localStorage.getItem('token')
    const currentUrlEqualsServersBaseUrl = (window.location.href === this.state.baseUrl + '/')
    if (adminJwt) {
      if (currentUrlEqualsServersBaseUrl) {
        window.location.href = `${ this.state.baseUrl }/dashboard`
      }
    }
  }

  /**
   * handleSetServerBaseUrl
   */
  handleSetServerBaseUrl = (): void => {
    this.handleFetchBaseUrl()
  }

  /**
   * handleFetchBaseUrl
   */
  handleFetchBaseUrl = (): void => {
    fetch('/expressadminarea/baseurl')
      .then(data => data.json())
      .then(({ data }) => {
        this.setState({ baseUrl: data })
      })
      .catch(() => console.log('\n\nError: "App.tsx (handleFetchBaseUrl)"'))
  }
  
}

export default App;
