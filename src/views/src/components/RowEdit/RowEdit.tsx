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
      <form>
        {this.renderFormInputs()}
        <input
          type="submit"
        />
      </form>
    )
  }

  componentDidMount() {
    this.fetchRow()
  }

  
  public async fetchRow(): Promise<void> {
    try {
      const response: { json: Function } = await fetch(`/expressadminarea/api${ this.props.location.pathname }`)
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
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

}

export { RowEdit }