import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
        {this.renderTableName()}
        {this.renderRows()}
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

  public renderTableName(): any {
    const capitalizedFirstLetter: string = this.tableName[0].toLocaleUpperCase()
    const restOfTableName: string = this.tableName.substring(1)
    const fullTableName: string = capitalizedFirstLetter + restOfTableName
    const tableNameElement: any = <h1>{fullTableName}</h1>
    return tableNameElement
  }
  
  public renderRows(): any {
    const rows: any = this.state.rows.map((row: { id: number }, idx: number): any => (
      <Row key={idx} row={row}>
        <Link to={`/tables/${this.tableName}/${row.id}`}>
          Edit
        </Link>
      </Row>
    ))
    return rows
  }

}

export { Table }