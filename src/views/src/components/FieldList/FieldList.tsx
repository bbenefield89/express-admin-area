import React, { Component } from 'react'

import { Field } from '../index'
import { Link } from 'react-router-dom';

type Props = {
  fields: (number | string)[]
  id: number | string
  url: string
  removeRow: (id: number | string) => void
}

type State = {}

class FieldList extends Component<Props, State> {

  render() {
    return (
      <React.Fragment>
        {this.renderFieldList()}
        {this.renderEditRowLink()}
        {this.renderDeleteRowButton()}
      </React.Fragment>
    )
  }

  public renderFieldList(): JSX.Element {
    return (
      <ul>
        {this.renderFields()}
      </ul>
    )
  }

  private renderFields(): JSX.Element[] {
    const fields: JSX.Element[] = this.props.fields.map((field: number | string, idx: number): JSX.Element => {
      return <Field key={idx} field={field} />
    })
    return fields
  }

  private renderEditRowLink(): JSX.Element | void {
    const isViewingSpecificTableUrl: boolean = (this.props.url.split('/').length === 3)
    if (isViewingSpecificTableUrl === true) {
      const linkTo: string = `${this.props.url}/${this.props.id}`
      return <Link to={linkTo}>Edit Row</Link>
    }
  }

  private renderDeleteRowButton(): JSX.Element {
    return (
      <button onClick={this.deleteRowButtonOnClick.bind(this)}>
        Delete Row
      </button>
    )
  }

  private deleteRowButtonOnClick(): void {
    const fetchUrl: string = '/expressadminarea/api' + this.props.url + '/' + this.props.id
    const fetchOptions: object = { method: 'DELETE' }
    fetch(fetchUrl, fetchOptions)
      .then(() => this.props.removeRow(this.props.id))
      .catch(err => console.log(err))
  }

}

export { FieldList }