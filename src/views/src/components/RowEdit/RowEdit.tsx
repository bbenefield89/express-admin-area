import React, { Component, ChangeEvent } from 'react'

import { FieldEdit } from '../index'

type Props = {
  location: { pathname: string }
}

type State = {
  [key: string]: any
  inputNames: any[]
}

class RowEdit extends Component<Props, State> {

  state: State = {
    inputNames: []
  }

  render() {
    return (
      <form onSubmit={e => this.handleOnSubmit(e)}>
        {this.renderFormInputs()}
        <input
          type="submit"
        />
      </form>
    )
  }

  public handleOnSubmit(e: any): void {
    e.preventDefault()
    const { inputNames, ...inputsValues } = this.state
    fetch(`/expressadminarea/api${this.props.location.pathname}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputsValues)
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchRow()
  }


  public async fetchRow(): Promise<void> {
    try {
      const response: { json: Function } = await fetch(`/expressadminarea/api${this.props.location.pathname}`)
      const inputsData: any = await response.json()
      const inputNames: string[] = Object.keys(inputsData)
      this.setState({ ...inputsData, inputNames })
    }
    catch (error) {
      console.log(error)
    }
  }

  public renderFormInputs() {
    const inputs = this.state.inputNames.map((name: string): any => {
      return (
        <FieldEdit
          key={name}
          inputName={name}
          value={this.state[name]}
          handleOnChange={event => this.handleOnChange(event)}
        />
      )
    })
    return inputs
  }

  public handleOnChange(event: any): void {
    this.setState({ [event.target.name]: event.target.value })
  }

}

export { RowEdit }