import React, { createContext, useContext, useState, useLayoutEffect, useEffect } from 'react'

//
//
export const createPortal = (displayName = `Portal${++DefaultPortalName}`) => {
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
		return usePortalContent(portal, props, ContentRenderer)
	}
	PortalContent.displayName = `${displayName}.Content`

	const ContentRenderer = ({ children }) => children
	ContentRenderer.displayName = PortalContent.displayName

	const PortalRender = ({ render = defaultRender }) => {
		const portal = useContext(PortalContext)
		return usePortalRender(portal, render)
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
export const createGlobalPortal = (displayName = `GlobalPortal${++DefaultPortalName}`) => {
	const portal = createCustomPortal()

	const PortalContent = (props) => {
		return usePortalContent(portal, props, ContentRenderer)
	}
	PortalContent.displayName = `${displayName}.Content`

	const ContentRenderer = ({ children }) => children
	ContentRenderer.displayName = PortalContent.displayName

	const PortalRender = ({ render = defaultRender }) => {
		return usePortalRender(portal, render)
	}
	PortalRender.displayName = `${displayName}.Render`

	return {
		Content: PortalContent,
		Render: PortalRender,
	}
}

//
//
let DefaultPortalName = 0

//
//
const usePortalContent = (portal, props, ContentRenderer) => {
	const [id] = useState(createID)
	const data = <ContentRenderer {...props} key={id} />

	portal.data.set(id, data)
	useLayoutEffect(() => {
		portal.data.set(id, data)
		portal.dataChanged()
	})
	useEffect(() => () => {
		portal.data.delete(id)
		portal.dataChanged()
	}, [])

	return null
}

//
//
const usePortalRender = (portal, render = defaultRender) => {
	const [id] = useState(createID)
	const [, subscription] = useState()

	portal.subscriptions.set(id, subscription)
	useLayoutEffect(() => {
		portal.subscriptions.set(id, subscription)
	})
	useEffect(() => () => {
		portal.subscriptions.delete(id)
	}, [])

	return render([...portal.data.values()])
}

//
//
const createCustomPortal = () => new CustomPortal()

class CustomPortal {
	data = new Map()
	subscriptions = new Map()

	dataChanged() {
		[...this.subscriptions.values()].forEach(subscription => subscription({}))
	}
}

const defaultRender = items => items

let ID = 0

const createID = () => ++ID
