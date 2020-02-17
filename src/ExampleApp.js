import React, { useState } from 'react'
import { createPortal, createGlobalPortal } from './components'

const Portal = createPortal('OnOff')
const GlobalPortal = createGlobalPortal('OnOff')

const Switch = () => {
  const [state, setState] = useState(false)
  return <>
    <input id="switch" type="checkbox" value={state} onClick={() => setState(!state)} />
    <label htmlFor="switch">switch</label>
    <Portal.Content>{state ? "on" : "off"}</Portal.Content>
  </>
}

const SwitchGlobal = () => {
  const [state, setState] = useState(false)
  return <>
    <input id="global-switch" type="checkbox" value={state} onClick={() => setState(!state)} />
    <label htmlFor="global-switch">global switch</label>
    <GlobalPortal.Content>{state ? "global-on" : "global-off"}</GlobalPortal.Content>
  </>
}

const ExampleApp = () => {
  return <>
    <Portal.Root>
      <div style={{padding: 20}} ><Switch /></div>
      <div style={{padding: 20, backgroundColor: "tomato"}} ><Portal.Render /></div>
    </Portal.Root>
    <div style={{padding: 20}} ><SwitchGlobal /></div>
    <div style={{padding: 20, backgroundColor: "tomato"}} ><GlobalPortal.Render /></div>
  </>
}

export default ExampleApp
