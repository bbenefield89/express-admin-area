import React, { Component } from 'react'

type Props = {
  fields: string[]
  routerMatch: { params: { tableName: string } }
  createNewDbRow: any  // method
  comp: any
}

type State = {
  [key: string]: any
}

class CreateNewRowForm extends Component<Props, State> {

  inputFields: object|any = {}
  state: State = {}

  render() {
    const tableName: string = this.props.routerMatch.params.tableName
    const createNewDbRow: any = this.props.createNewDbRow
    const fields: string[] = this.props.fields
    
    return (
      <form onSubmit={e => e.preventDefault()}>
        {fields.map((field: string) => {
          return (
            <React.Fragment key={field}>
              <label htmlFor={field}>
                {field}
              </label>
              <input
                name={field}
                ref={input => this.inputFields[field] = input}
              />
            </React.Fragment>
          )
        })}
        <input
          type="submit"
          value="Create New Row"
          onClick={() => createNewDbRow(this.inputFields)}
        />
      </form>
    )
  }

}

export { CreateNewRowForm }