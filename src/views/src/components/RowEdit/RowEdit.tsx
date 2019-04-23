import React, { Component } from 'react'

import { FieldListEdit } from '../FieldListEdit/FieldListEdit'

type Props = {
  location: { pathname: string }
}

type State = {
  fields: any[]
  inputs: any[]
}

type Fields = {
  [key: string]: string
}

class RowEdit extends Component<Props, State> {
  
  public state = {
    fields: [],
    inputs: []
  }
  
  render() {
    return (
      <form>
        {this.state.fields.map((field: any, idx: number) => {
          return (
            <FieldListEdit field={field} key={idx} />
          )
        })}
        <input type="submit" />
      </form>
    )
  }

  componentDidMount() {
    this.fetchRow()
  }
  
  public fetchRow() {
    fetch(`/expressadminarea/api${ this.props.location.pathname }`)
      .then(res => res.json())
      .then(async (json) => {
        const fields: any[] = this.createNewArrayFromData(json, this.stateFieldsCallBack)
        const inputs: any[] = this.createNewArrayFromData(json, this.stateInputsCallBack)
        this.setState({ fields, inputs })
      })
      .catch(err => console.log(err))
  }

  public createNewArrayFromData(fields: object, callBack: Function): any[] {
    const returnArray: any[] = []
    for (let fieldName in fields) {
      returnArray.push(callBack(fields, fieldName))
    }
    return returnArray
  }

  public stateFieldsCallBack(fields: Fields, fieldName: string): string {
    return fields[fieldName]
  }

  public stateInputsCallBack(fields: Fields, fieldName: string): object {
    return { [fieldName]: fields[fieldName] }
  }

}

export { RowEdit }