import React, { useState, createContext, useContext } from "react"
import { createPortal, createGlobalPortal } from "./components"

const Portal = createPortal({ displayName: "OnOff" })
const GlobalPortal = createGlobalPortal({ displayName: "OnOff" })
const ExampleContext = createContext()

const Label = ({ text }) => {
	const context = useContext(ExampleContext)
	return <>{text}<br/>({context})</>
}

const Switch = () => {
	const [state, setState] = useState(false)
	return <>
		<input id="switch" type="checkbox" value={state} onClick={() => setState(!state)} />
		<label htmlFor="switch">switch</label>
		<Portal.Content preserveContexts={[ExampleContext]}>
			<Label text={state ? "on" : "off"} />
		</Portal.Content>
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
			<ExampleContext.Provider value="context value is right">
				<div style={{padding: 20}} ><Switch /></div>
			</ExampleContext.Provider>
			<ExampleContext.Provider value="context value is wrong">
				<div style={{padding: 20, backgroundColor: "tomato"}} ><Portal.Render /></div>
			</ExampleContext.Provider>
		</Portal.Root>
		<div style={{padding: 20}} ><SwitchGlobal /></div>
		<div style={{padding: 20, backgroundColor: "tomato"}} ><GlobalPortal.Render /></div>
	</>
}

export default ExampleApp
