import React, { Component } from 'react'

import { Field } from '../Field/Field'

type Props = {
  match?: any
  row?: any
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

  componentDidMount() {
    if (this.props.row) {
      this.setStateFields(this.props.row)
    }
    else if (this.props.match) {
      fetch(`/expressadminarea/api/${this.props.match.url}`)
        .then(res => res.json())
        .then(json => this.setStateFields(json))
        .catch(err => console.log(err))
    }
  }

  public setStateFields(row: any): void {
    const fields: any[] = []
    for (let key in row) {
      fields.push(row[key])
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