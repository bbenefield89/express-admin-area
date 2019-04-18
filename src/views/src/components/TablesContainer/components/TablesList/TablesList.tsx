import React, { Component } from 'react'

import TableItem from '../TableItem/TableItem'

class TablesList extends Component {

  state = {
    tables: []
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.tables.map((tableName: string) => (
              <TableItem
                key={tableName}
                tableName={tableName}
              />
          ))}
        </ul>
      </React.Fragment>
    )
  }

  componentDidMount() {
    this.getTables()
  }

  getTables: any = () => {
    fetch('/expressadminarea/api/tables')
      .then(res => res.json())
      .then(tables => this.setState({ tables }))
      .catch(err => console.log(err))
  }

}

export default TablesList