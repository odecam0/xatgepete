import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20 22V3c0-1.654-1.346-3-3-3H7C5.346 0 4 1.346 4 3v19H0v2h24v-2h-4ZM6 3c0-.551.448-1 1-1h10c.552 0 1 .449 1 1v19H6V3Zm10 9a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 16 12Z" />
  </svg>
)
export { SvgComponent as ReactComponent }
