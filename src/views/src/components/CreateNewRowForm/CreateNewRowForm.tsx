import React, { Component } from 'react'

type Props = {
  fields: string[]
  createNewDbRow: (inputFields: object) => void
}

type State = {}

class CreateNewRowForm extends Component<Props, State> {

  inputFields: object|any = {}
  state: State = {}

  render() {
    const createNewDbRow: (inputFields: object) => void = this.props.createNewDbRow
    const fields: string[] = this.props.fields
    
    return (
      <form onSubmit={e => e.preventDefault()}>
        {fields.map((field: string): React.ReactNode => {
          return (
            <React.Fragment key={field}>
              <label htmlFor={field}>
                {field}
              </label>
              <input
                name={field}
                ref={(input: HTMLInputElement): HTMLInputElement => this.inputFields[field] = input}
              />
            </React.Fragment>
          )
        })}
        <input
          type="submit"
          value="Create New Row"
          onClick={(): void => createNewDbRow(this.inputFields)}
        />
      </form>
    )
  }

}

export { CreateNewRowForm }