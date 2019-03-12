import React, { Component } from 'react'

type Props = {
  checkIfAdminJwtIsSet: Function
}
class AdminLogin extends Component<Props> {

  public state = {
    username: '',
    password: '',
    errorText: '',
    validInputDisplay: 'none'
  }

  private fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={ this.handleSubmitAdminLoginForm }>
          <label htmlFor='username'>Username</label>
          <input
            name='username'
            onChange={ this.handleUpdateInputField }
            type='text'
            value={ this.state.username }
          />

          <label htmlFor='password'>Password</label>
          <input
            name='password'
            onChange={ this.handleUpdateInputField }
            type='text'
            value={ this.state.password }
          />

          <input
            type='submit'
            value='Submit'
          />
        </form>

        <p style={{ display: this.state.validInputDisplay }}>Must supply a valid username and password</p>
        <p>{ this.state.errorText }</p>
      </React.Fragment>
    )
  }

  /**
   * handleSubmitAdminLoginForm
   */
  private handleSubmitAdminLoginForm = async (e: any): Promise<void> => {
    e.preventDefault()
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      this.setState({ validInputDisplay: 'block' })
    }
    else {
      this.setState({ validInputDisplay: 'none' })
      this.setFetchOptionsBodyProperty()
      this.authAdmin()
    }
  }

  private authAdmin = async (): Promise<void> => {
    const authAdminResponse: any = await this.fetchAdmin()
    if (authAdminResponse.token === undefined) {
      await this.setErrorText()
    }
    else {
      this.setAdminAuthenticationTokenInLocalStorage(authAdminResponse.token)
      this.props.checkIfAdminJwtIsSet()
    }
  }

  private setFetchOptionsBodyProperty: Function = (): void => {
    const { username, password }: { username: string, password: string } = this.state
    this.fetchOptions.body = JSON.stringify({ username, password })
  }

  private fetchAdmin = (): Promise<any> => {
    return fetch('/expressadminarea/api/auth', this.fetchOptions)
      .then(data => data.json())
      .then(data => data)
      .catch(err => {
        console.log(err)
      })
  }

  private setErrorText = (): void => {
    this.setState({ errorText: 'Username & password combination is incorrect' })
  }

  private setAdminAuthenticationTokenInLocalStorage = (token: string): void => {
    localStorage.setItem('token', token)
  }

  /**
   * handleUpdateInputField
   */
  private handleUpdateInputField = (e: any): void => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
}

export default AdminLogin