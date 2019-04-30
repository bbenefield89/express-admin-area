import React, { Component } from 'react'

type Props = {
  fields: string[]
}

type State = {}

class CreateNewRowForm extends Component<Props, State> {

  render() {
    return (
      <form>
        {this.props.fields.map((field: string) => {
          return (
            <React.Fragment key={field}>
              <label htmlFor={field}>
                {field}
              </label>
              <input name={field} />
            </React.Fragment>
          )
        })}
        <input type="submit" value="Create New Row" />
      </form>
    )
  }

}

export { CreateNewRowForm }