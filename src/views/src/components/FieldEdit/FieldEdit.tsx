import React, { Component } from 'react'

type Props = {
  field: any
}

type State = {}

class FieldEdit extends Component<Props, State> {

  state = {}
  
  render() {
    return (
      <input data-column_name={this.props.field[0]} value={this.props.field[1]} />
    )
  }

}

export { FieldEdit }