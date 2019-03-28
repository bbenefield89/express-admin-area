import React, { Component } from 'react'

import { Row } from '../Row/Row'

type Props = {
  match: {
    params: {
      tableName: string
    }
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
        <h1>{ this.tableName[0].toLocaleUpperCase() + this.tableName.substring(1) }</h1>
        {this.state.rows.map((row: object, idx: number): any => (
          <Row key={idx} row={row} />
        ))}
      </React.Fragment>
    )
  }

  public componentDidMount() {
    const origin: string = window.location.origin
    const tableName: string = this.props.match.params.tableName
    fetch(origin + '/expressadminarea/api/tables/' + tableName)
      .then(res => res.json())
      .then(rows => this.setState({ rows }))
      .catch(err => console.log(err))
  }

}

export { Table }