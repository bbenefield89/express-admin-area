import React, { Component } from 'react'

type Props = {
  fields: string[]
  url: string
  createNewDbRow: (inputFields: object) => void
}

type State = {
  fields: string[]
}

class CreateNewRowForm extends Component<Props, State> {

  inputFields: object | any = {}
  state: State = {
    fields: []
  }

  render() {
    const createNewDbRow: (inputFields: object) => void = this.props.createNewDbRow

    return (
      <form onSubmit={e => e.preventDefault()}>
        {this.renderFields()}

        <input
          type="submit"
          value="Create New Row"
          onClick={(): void => createNewDbRow(this.inputFields)}
        />
      </form>
    )
  }

  // render form method
  public renderFields(): JSX.Element[] {
    return this.state.fields.map((field: any): any => {
      return <React.Fragment key={field}>
        <label htmlFor={field}>
          {field}
        </label>

        <input
          name={field}
          ref={(input: any): any => this.inputFields[field] = input}
        />
      </React.Fragment>
    })
  }

  componentDidMount() {
    this.fetchTableFieldNames()
  }

  public fetchTableFieldNames(): void {
    fetch(`/expressadminarea/api${this.props.url}/describe`)
      .then(res => res.json())
      .then(fields => {
        console.log(fields)
        const fieldsNames: string[] = Object.keys(fields)
        this.setState({ fields: fieldsNames }, () => {
          debugger
          console.log(this.state)
        })
      })
      .catch(err => console.log(err))
  }

}

export { CreateNewRowForm }