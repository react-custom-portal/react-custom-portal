import React, { createContext, useContext, useState, useLayoutEffect, useEffect } from 'react'

export const createCustomPortal = (name = undefined) => {
	const PortalContext = createContext()

	const PortalRoot = ({ children }) => {
		const [portal] = useState(createPortal)
		return (
			<PortalContext.Provider value={portal}>
				{children}
			</PortalContext.Provider>
		)
	}

	const PortalContent = (props) => {
		const [id] = useState(createID)
		const portal = useContext(PortalContext)
		const data = <PortalContentRenderer {...props} key={id} />

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

	const PortalContentRenderer = ({ children }) => children

	const Portal = ({ render = defaultRender }) => {
		const [id] = useState(createID)
		const portal = useContext(PortalContext)
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

	if (name) {
		PortalRoot.displayName = `${name}.PortalRoot`
		PortalContent.displayName = `${name}.PortalContent`
		Portal.displayName = `${name}.Portal`
	}
	PortalContentRenderer.displayName = PortalContent.displayName || PortalContent.name

	return {
		PortalRoot,
		PortalContent,
		Portal,
	}
}

const createPortal = () => new CustomPortal()

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
