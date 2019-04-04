import React, { Component } from 'react'

type Props = {
  field?: string | number
}

type State = {}

class Field extends Component<Props, State> {

  render() {
    return (
      <li>
        {this.props.field}
      </li>
    )
  }

}

export { Field }