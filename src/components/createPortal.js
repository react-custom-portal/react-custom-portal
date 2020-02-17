import React, { createContext, useContext, useState, useLayoutEffect, useEffect } from "react"

//
//
export const createPortal = (options) => {
	const { displayName } = getOptions(options)

	const PortalContext = createContext()

	const PortalRoot = ({ children }) => {
		const [portal] = useState(createCustomPortal)
		return (
			<PortalContext.Provider value={portal}>
				{children}
			</PortalContext.Provider>
		)
	}
	PortalRoot.displayName = `${displayName}.Root`

	const PortalContent = (props) => {
		const portal = useContext(PortalContext)
		return renderContentProxy(portal, ContentRenderer, props)
	}
	PortalContent.displayName = `${displayName}.Content`

	const ContentRenderer = ({ children }) => children
	ContentRenderer.displayName = PortalContent.displayName

	const PortalRender = ({ children }) => {
		const portal = useContext(PortalContext)
		return usePortalRender(portal, children)
	}
	PortalRender.displayName = `${displayName}.Render`

	return {
		Root: PortalRoot,
		Content: PortalContent,
		Render: PortalRender,
	}
}

//
//
export const createGlobalPortal = (options) => {
	const { displayName } = getOptions(options)

	const portal = createCustomPortal()

	const PortalContent = props => renderContentProxy(portal, ContentRenderer, props)
	PortalContent.displayName = `${displayName}.Content`

	const ContentRenderer = ({ children }) => children
	ContentRenderer.displayName = PortalContent.displayName

	const PortalRender = ({ children }) => usePortalRender(portal, children)
	PortalRender.displayName = `${displayName}.Render`

	return {
		Content: PortalContent,
		Render: PortalRender,
	}
}

//
//
const getOptions = (options, component) => {
	let actualOptions = typeof options === "string" ? { displayName: options } : { ...options }
	if (!actualOptions.displayName) {
		actualOptions.displayName = `${component}${++DefaultPortalName}`
	}
	return actualOptions
}

//
//
let DefaultPortalName = 0

//
//
const  renderContentProxy = (portal, ContentRenderer, { children, preserveContexts, ...proxyProps }) =>
	(function render(index, content) {
		if (preserveContexts && index < preserveContexts.length) {
			const Context = preserveContexts[index]
			return (
				<Context.Consumer>
					{value => render(index + 1, <Context.Provider value={value}>{content}</Context.Provider>)}
				</Context.Consumer>
			)
		} else {
			return (
				<ContentProxy {...{ content, proxyProps, portal, ContentRenderer }} />
			)
		}
	})(0, children)

//
//
const ContentProxy = ({ content, proxyProps, portal, ContentRenderer }) => {
	const [id] = useState(createID)

	const markup = <ContentRenderer {...proxyProps} key={id}>{content}</ContentRenderer>

	portal.data.set(id, markup)
	useLayoutEffect(() => {
		portal.data.set(id, markup)
		portal.dataChanged()
	})
	useEffect(() => () => {
		portal.data.delete(id)
		portal.dataChanged()
		// eslint-disable-next-line
	}, [])

	return null
}

//
//
const usePortalRender = (portal, children = defaultRender) => {
	const [id] = useState(createID)
	const [, subscription] = useState()

	portal.subscriptions.set(id, subscription)
	// eslint-disable-next-line
	useLayoutEffect(() => {
		portal.subscriptions.set(id, subscription)
	})
	useEffect(() => () => {
		portal.subscriptions.delete(id)
		// eslint-disable-next-line
	}, [])

	return children([...portal.data.values()])
}

//
//
const createCustomPortal = () => new CustomPortal()

class CustomPortal {
	data = new Map()
	subscriptions = new Map()

	dataChanged() {
		for (const subscription of this.subscriptions.values()) {
			subscription({})
		}
	}
}

const defaultRender = items => items

let ID = 0

const createID = () => ++ID
