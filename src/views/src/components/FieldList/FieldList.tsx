import React, { Component } from 'react'

import { Field } from '../index'

type Props = {
  fields: any
}

type State = {}

class FieldList extends Component<Props, State> {

  render() {
    return (
      <ul>
        {this.renderFieldListItems()}
      </ul>
    )
  }

  public renderFieldListItems() {
    const fieldListItems: any = this.props.fields.map((field: any, idx: number): any => {
      return <Field key={idx} field={field} />
    })
    return fieldListItems
  }

}

export { FieldList }