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

        <CreateNewRowForm
          fields={this.state.fields}
          routerMatch={this.props.match}
          createNewDbRow={this.createNewDbRow.bind(this)}
          comp={this}
        />

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

  public createNewDbRow(inputFields: object|any): void {
    const inputFieldValues: object|any = {}
    for (let prop in inputFields) {
      inputFieldValues[prop] = inputFields[prop].value
    }
    
    fetch('/expressadminarea/api/tables/' + this.tableName, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputFieldValues)
    })
      .then(res => res.json())
      .then((newRow: object|any) => {
        this.setState({ rows: [...this.state.rows, newRow] })
      })
      .catch(err => console.log(err))
  }

}

export { Table }