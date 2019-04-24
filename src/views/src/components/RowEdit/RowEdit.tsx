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
        <input type="submit" />
      </form>
    )
  }

  componentDidMount() {
    this.fetchRow()
  }

  
  public async fetchRow(): Promise<void> {
    fetch(`/expressadminarea/api${ this.props.location.pathname }`)
      .then(res => res.json())
      .then(async (json: any): Promise<void> => {
        const foo: any = {}
        for (let property in json) {
          foo[property] = json[property]
        }

        const inputNames: Array<string> = Object.keys(json)
        this.setState({ ...foo, inputNames })
      })
      .catch((err: any): void => console.log(err))
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