import React, { Component } from 'react'

type Props = {
  checkIfAdminJwtIsSet: Function
}
class AdminLogin extends Component<Props> {

  public state = {
    username: '',
    password: '',
    errorText: '',
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

        <p>{ this.state.errorText }</p>
      </React.Fragment>
    )
  }

  /**
   * handleSubmitAdminLoginForm
   */
  private handleSubmitAdminLoginForm = async (e: any): Promise<void> => {
    e.preventDefault()
    this.setFetchOptionsBodyProperty()
    const { data } = await this.authenticateAdmin()
    if (data.error) {
      await this.setErrorText(data)
    }
    else {
      this.setAdminAuthenticationTokenInLocalStorage(data)
      this.props.checkIfAdminJwtIsSet()
    }
  }

  private setFetchOptionsBodyProperty: Function = (): void => {
    const { username, password }: { username: string, password: string } = this.state
    this.fetchOptions.body = JSON.stringify({username, password })
  }

  private authenticateAdmin = (): Promise<any> => {
    return fetch('/expressadminarea/api/authenticateadmin', this.fetchOptions)
      .then(data => data.json())
  }

  private setErrorText = (fetchResponse: any): void => {
    this.setState({ errorText: fetchResponse.error })
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