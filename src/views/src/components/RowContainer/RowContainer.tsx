import React, { Component } from 'react'

type Props = {
  row?: any
}

type State = {
  fields?: any
}

class RowContainer extends Component<Props, State> {

  state = {
    fields: []
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.renderFields()}
        </ul>
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

  public renderFields(): any {
    return React.Children.map(this.props.children, (child: any): any => {
      return this.state.fields.map((field: any): any => {
        return React.cloneElement(child, { field })
      })
    })
  }

}

export { RowContainer }