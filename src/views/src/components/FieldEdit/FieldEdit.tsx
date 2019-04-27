import React, { Component } from 'react'

type Props = {
  inputName: string
  value: string
  handleOnChange: (event: any) => void
}

type State = {}

class FieldEdit extends Component<Props, State> {

  state: State = {}
  
  render() {
    return (
      <input
        type="text"
        name={this.props.inputName}
        value={this.props.value}
        onChange={this.props.handleOnChange}
      />
    )
  }

}

export { FieldEdit }