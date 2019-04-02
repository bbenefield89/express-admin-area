import React, { Component } from 'react'

import { Field } from '../Field/Field'

type Props = {
  match?: any
  row?: any
  fields?: any[]
}

type State = {
  fields: any[]
}

class Row extends Component<Props, State> {

  public state = {
    fields: []
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.renderFields()}
        </ul>
        {this.props.children}
      </React.Fragment>
    )
  }

  public renderFields(): any {
    const fields: any[] = []
    if (this.props.fields) {
      this.props.fields.forEach((field: any, idx: number): any => {
        const fieldElement = <Field key={idx} field={field} />
        fields.push(fieldElement)
      })
    }
    return fields
  }

}

export { Row }