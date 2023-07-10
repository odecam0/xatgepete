import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    {...props}
  >
    <title>{"plus-frame"}</title>
    <path d="M0 26.016q0 2.496 1.76 4.224T6.016 32h20q2.464 0 4.224-1.76T32 26.016v-20q0-2.496-1.76-4.256T26.016 0h-20Q3.52 0 1.76 1.76T0 6.016v20zm4 0v-20q0-.832.576-1.408T6.016 4h20q.8 0 1.408.608T28 6.016v20q0 .832-.576 1.408T26.016 28h-20q-.832 0-1.44-.576T4 26.016zM8 16q0 .832.576 1.44t1.44.576h4v4q0 .832.576 1.408T16 24t1.408-.576.608-1.408v-4h4q.8 0 1.408-.576T24 16t-.576-1.408-1.408-.576h-4v-4q0-.832-.608-1.408T16 8t-1.408.608-.576 1.408v4h-4q-.832 0-1.44.576T8 16z" />
  </svg>
)
export { SvgComponent as ReactComponent }
