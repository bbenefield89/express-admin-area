import React, { Component } from 'react'

import { Field } from '../index'
import { Link } from 'react-router-dom';

type Props = {
  fields: any[]
  id: string | number
  url: string
}

type State = {}

class FieldList extends Component<Props, State> {

  render() {
    return (
      <React.Fragment>
        {this.renderFieldList()}
        {this.renderEditRowLink()}
      </React.Fragment>
    )
  }

  public renderFieldList() {
    return <ul>
      {this.props.fields.map((field: any, idx: number): any => {
        return <Field key={idx} field={field} />
      })}
    </ul>
  }

  public renderEditRowLink() {
    if (this.props.url.split('/').length === 3) {
      return <Link to={`${this.props.url}/${this.props.id}`}>Edit Row</Link>
    }
  }

}

export { FieldList }