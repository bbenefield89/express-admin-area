import React, { Component } from 'react'

type Props = {
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
        {this.renderFields()}
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
    const fields: string[] | number[] = this.state.fields
    return React.Children.map(this.props.children, (child: any): any => {
      return React.cloneElement(child, { fields })
    })
  }

}

export { RowContainer }