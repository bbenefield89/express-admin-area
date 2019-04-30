import React, { Component } from 'react'

import { CreateNewRowForm, RowContainer } from '../index'

type Props = {
  match: {
    params: {
      tableName: string
    },
    url: string
  }
}

type State = {
  fields: string[]
  rows: object[]
}

class Table extends Component<Props, State> {

  public tableName: string = this.props.match.params.tableName
  public state = {
    fields: [],
    rows: []
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Table</h1>

        <CreateNewRowForm fields={this.state.fields} />

        {this.state.rows.map((row: any, idx: number): any => {
          return (
            <RowContainer
              key={idx}
              url={this.props.match.url}
              row={row}
            />
          )
        })}
      </React.Fragment>
    )
  }

  public componentDidMount() {
    const origin: string = window.location.origin
    const url: string = this.props.match.url
    const apiEndpoint = origin + '/expressadminarea/api' + url
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(rows => {
        const fields: string[] = Object.keys(rows[0])
        this.setState({ fields, rows })
      })
      .catch(err => console.log(err))
  }

}

export { Table }