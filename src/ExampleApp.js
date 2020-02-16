import React, { useState } from 'react'
import { createCustomPortal } from './components'

export const { PortalRoot, PortalContent, Portal } = createCustomPortal('switch')

export const Switch = () => {
  const [state, setState] = useState(false)
  return <>
    <input id="switch" type="checkbox" value={state} onClick={() => setState(!state)} />
    <label htmlFor="switch">switch</label>
    <PortalContent>{state ? "on" : "off"}</PortalContent>
  </>
}

const ExampleApp = () => {
  return (
    <PortalRoot>
      <div style={{padding: 20}} ><Switch /></div>
      <div style={{padding: 20, backgroundColor: "tomato"}} ><Portal /></div>
    </PortalRoot>
  )
}

export default ExampleApp
