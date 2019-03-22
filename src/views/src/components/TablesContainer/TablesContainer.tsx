import React, { Component } from 'react'

import TablesList from './components/TablesList/TablesList'

class TablesContainer extends Component {

  state = {
    tables: []
  }
  
  render() {
    return (
      <React.Fragment>
        <h1>Tables</h1>
        <TablesList />
      </React.Fragment>
    )
  }

}

export default TablesContainer