import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20 22V5c0-1.654-1.346-3-3-3h-1.171A2.997 2.997 0 0 0 12.412.059l-6.001 1.2A3.01 3.01 0 0 0 4 4.2V22H0v2h24v-2h-4ZM18 5v17h-2V4h1c.551 0 1 .448 1 1ZM6 4.2c0-.475.338-.887.804-.98l6-1.2c.293-.057.598.018.83.208.233.19.366.473.366.773V22H6V4.2Zm6 7.8a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 12 12Z" />
  </svg>
)
export { SvgComponent as ReactComponent }
