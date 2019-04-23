import React, { Component } from 'react'

import { FieldEdit, FieldListEdit } from '../index'

type Props = {
  location: { pathname: string }
}

type State = {
  inputs: object
}

class RowEdit extends Component<Props, State> {
  
  state = {
    inputs: []
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

  public renderFormInputs() {
    const inputs = this.state.inputs.map((field: any[]) => {
      return <FieldEdit key={field[0]} field={field} />
    })
    return inputs
  }
  
  public fetchRow() {
    fetch(`/expressadminarea/api${ this.props.location.pathname }`)
      .then(res => res.json())
      .then(async (json) => {
        const inputs: Array<any[]> = Object.entries(json)
        this.setState({ inputs })
      })
      .catch(err => console.log(err))
  }

}

export { RowEdit }