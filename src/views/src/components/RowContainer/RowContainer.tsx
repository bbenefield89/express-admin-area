import React, { Component } from 'react'

type Props = {
  fieldElement: any
  row?: any
}

type State = {
  fields: any
}

class RowContainer extends Component<Props, State> {

  public state: State = {
    fields: []
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.fieldElement, {
          fields: this.state.fields,
          id: this.props.row.id
        })}
      </React.Fragment>
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