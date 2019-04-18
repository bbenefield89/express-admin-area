import React, { Component } from 'react'

import {
  RowContainer
} from '../index'

type Props = {
  match: {
    params: {
      tableName: string
    },
    url: string
  }
}

type State = {
  rows: object[]
}

class Table extends Component<Props, State> {

  public tableName: string = this.props.match.params.tableName
  public state = {
    rows: []
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Table</h1>
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
    const apiEndpoint = origin + '/expressadminarea/api/' + url
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(rows => this.setState({ rows }))
      .catch(err => console.log(err))
  }

}

export { Table }