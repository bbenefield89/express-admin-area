import React, { Component } from 'react'

class AdminLogin extends Component {
  
  state = {
    username: '',
    password: '',
    errorText: '',
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
  handleSubmitAdminLoginForm = (e: any): void => {
    e.preventDefault()

    fetch('/expressadminarea/authenticateadmin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(data => data.json())
      .then(({ data }) => {
        if (data.error) {
          this.setState({ errorText: data.error })
          throw new Error(data.error)
        }

        console.log(data)
        localStorage.setItem('token', data)
      })
      .catch(err => console.log(err))
  }

  /**
   * handleUpdateInputField
   */
  handleUpdateInputField = (e: any): void => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
}

export default AdminLogin