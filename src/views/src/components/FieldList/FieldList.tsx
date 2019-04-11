import React, { Component } from 'react'

import { Field } from '../index'
import { Link } from 'react-router-dom';

type Props = {
  fields: any
  id: any
  match: { url: string }
}

type State = {}

class FieldList extends Component<Props, State> {

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.props.fields.map((field: any, idx: number): any => {
            return <Field key={idx} field={field} />
          })}
        </ul>

        <Link to={`${ this.props.match.url }/${ this.props.id }`}>Edit Row</Link>
      </React.Fragment>
    )
  }

}

export { FieldList }