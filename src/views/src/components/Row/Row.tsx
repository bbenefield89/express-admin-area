import React, { Component } from 'react'

import { Field } from '../Field/Field'

type Props = {
  row?: any
}

type State = {
  fields: any[]
}

class Row extends Component<Props, State> {

  state = {
    fields: []
  }

  render() {
    return (
      <ul>
        {this.renderFields()}
      </ul>
    )
  }

  componentDidMount() {
    this.setStateFields()
  }

  public setStateFields(): void {
    const fields: any[] = []
    for (let key in this.props.row) {
      fields.push(this.props.row[key])
    }
    this.setState({ fields })
  }

  public renderFields(): any {
    const fields: any[] = this.state.fields.map((field: any, idx: number): any => (
      <Field key={idx} field={field} />
    ))
    return fields
  }

}

export { Row }