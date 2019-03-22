import React, { Component } from 'react'

import { Link } from 'react-router-dom'

type Props = {
  tableName: string
}

class TableItem extends Component<Props, any> {

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <li>
        <Link to={`/tables/${this.props.tableName}`}>
          {this.props.tableName}
        </Link>
      </li>
    )
  }

}

export default TableItem