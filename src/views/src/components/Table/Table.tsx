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
  isErrorElementHidden: boolean
}

class Table extends Component<Props, State> {

  public tableName: string = this.props.match.params.tableName
  public state = {
    fields: [],
    rows: [],
    isErrorElementHidden: true
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Table</h1>

        <CreateNewRowForm
          fields={this.state.fields}
          createNewDbRow={this.createNewDbRow.bind(this)}
        />

        {this.shouldErrorElementRender()}

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

  public createNewDbRow(inputFields: object | any): void {
    const inputFieldValues: object | any = {}
    for (let prop in inputFields) {
      inputFieldValues[prop] = inputFields[prop].value
    }

    fetch('/expressadminarea/api/tables/' + this.tableName, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputFieldValues)
    })
      .then(res => res.json())
      .then((newRow: object | any) => {
        if (newRow.status === 400) {
          this.setState({ isErrorElementHidden: false })
        }
        else {
          this.setState({
            rows: [...this.state.rows, newRow],
            isErrorElementHidden: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  public shouldErrorElementRender(): JSX.Element | null {
    let errorElement: JSX.Element | null = null
    if (this.state.isErrorElementHidden === false) {
      errorElement = <p>Error</p>
    }
    return errorElement
  }

}

export { Table }