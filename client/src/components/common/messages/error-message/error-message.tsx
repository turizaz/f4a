import React from 'react'
import './error-message.scss'

function ErrorMessage(props: any) {
  return props.message ? (
      <div className="common-error-message">{props.message}</div>
  ) : null
}
export default ErrorMessage
