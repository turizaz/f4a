/* eslint-disable no-invalid-this */
import React from 'react'
import './input-barrette.scss'

interface Props {
  onChange: any,
}
// Style input
class InputBarrette extends React.Component<Props> {
  onChange = (e: any) => {
    this.props.onChange(e)
  }

  render() {
    return (
      <div className="input-barrette-wrap">
        <div className="input-barrette shadow-1">
          <div>
            <input
              type="text"
              className="form-control"
              onChange={this.onChange}
              placeholder="район"/>
          </div>
        </div>
      </div>
    )
  }
}

export default InputBarrette
