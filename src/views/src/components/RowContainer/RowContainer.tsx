import React, { Component } from 'react'
import { FieldList } from '../FieldList/FieldList';

type Props = {
  url: string
  row: {
    [key: string]: number | string
  }
  removeRow: (id: number | string) => void
}

type State = {
  fields: (number | string)[]
}

class RowContainer extends Component<Props, State> {

  public state: State = {
    fields: []
  }

  render() {
    return (
      this.renderFieldLists()
    )
  }

  componentDidMount() {
    this.setStateFields()
  }

  public setStateFields(): void {
    const fields: (number | string)[] = []
    for (let field in this.props.row) {
      fields.push(this.props.row[field])
    }
    this.setState({ fields })
  }

  private renderFieldLists(): JSX.Element {
    return (
      <FieldList
        id={this.props.row.id}
        fields={this.state.fields}
        url={this.props.url}
        removeRow={this.props.removeRow}
      />
    )
  }

}

export { RowContainer }