import React, { Component } from 'react'

type Props = {
  fields: string[]
}

type State = {
  [key: string]: any
}

class CreateNewRowForm extends Component<Props, State> {

  inputFields: object|any = {}
  state: State = {}

  render() {
    return (
      <form onSubmit={e => this.handleOnSubmit(e)}>
        {this.props.fields.map((field: string) => {
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
        <input type="submit" value="Create New Row" />
      </form>
    )
  }

  public handleOnSubmit(e: any): void {
    e.preventDefault()
    const inputFieldValues: object|any = {}
    for (let prop in this.inputFields) {
      inputFieldValues[prop] = this.inputFields[prop].value
    }
    fetch('/expressadminarea/api/tables/admin/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputFieldValues)
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

  public handleOnChange(event: object | any): void {
    this.setState({ [event.target.name]: event.target.value })
  }

}

export { CreateNewRowForm }