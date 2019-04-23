import React, { Component } from 'react'

type Props = {
  field: any
}

type State = {}

class FieldListEdit extends Component<Props, State> {

  state = {}
  
  render() {
    return (
      <input value={this.props.field} />
    )
  }

}

export { FieldListEdit }