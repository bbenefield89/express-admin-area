import React, { Component } from 'react'
import { FieldList } from '../FieldList/FieldList';

type Props = {
  url: string
  row: {
    id: string | number
    [key: string]: any
  }
}

type State = {
  fields: any[]
}

class RowContainer extends Component<Props, State> {

  public state: State = {
    fields: []
  }

  render() {
    return (
      <FieldList
        id={this.props.row.id}
        fields={this.state.fields}
        url={this.props.url}
      />
    )
  }

  componentDidMount() {
    this.setStateFields()
  }

  public setStateFields(): void {
    const fields = []
    for (let field in this.props.row) {
      fields.push(this.props.row[field])
    }
    this.setState({ fields })
  }

}

export { RowContainer }