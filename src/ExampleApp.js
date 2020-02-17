import React, { useState } from 'react'
import { createPortal } from './components'

export const Portal = createPortal('OnOff')

export const Switch = () => {
  const [state, setState] = useState(false)
  return <>
    <input id="switch" type="checkbox" value={state} onClick={() => setState(!state)} />
    <label htmlFor="switch">switch</label>
    <Portal.Content>{state ? "on" : "off"}</Portal.Content>
  </>
}

const ExampleApp = () => {
  return (
    <Portal.Root>
      <div style={{padding: 20}} ><Switch /></div>
      <div style={{padding: 20, backgroundColor: "tomato"}} ><Portal.Render /></div>
    </Portal.Root>
  )
}

export default ExampleApp
