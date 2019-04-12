import React, { Component } from 'react'

class RowEdit extends Component {
  
  public state = {
    fields: []
  }
  
  render() {
    return (
      <form>
        {this.state.fields.map((field: any, idx: number) => {
          return <input key={idx} value={field} />
        })}

        <input type="submit" />
      </form>
    )
  }

  componentDidMount() {
    this.fetchRow()
  }
  
  public fetchRow() {
    fetch('/expressadminarea/api/tables/admin/162')
      .then(res => res.json())
      .then(json => {
        this.setStateFields(json)
      })
      .catch(err => console.log(err))
  }

  public setStateFields(fields: any) {
    const fieldValues = []
    for (let fieldName in fields) {
      fieldValues.push(fields[fieldName])
    }
    this.setState({ fields: [...fieldValues] })
  }
  
}

export { RowEdit }