import React, { createContext, useContext, useState, useLayoutEffect, useEffect } from 'react'

export const createPortal = (name = undefined) => {
	const PortalContext = createContext()

	const Root = ({ children }) => {
		const [portal] = useState(createCustomPortal)
		return (
			<PortalContext.Provider value={portal}>
				{children}
			</PortalContext.Provider>
		)
	}

	const Content = (props) => {
		const [id] = useState(createID)
		const portal = useContext(PortalContext)
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

	const ContentRenderer = ({ children }) => children

	const Render = ({ render = defaultRender }) => {
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
		Root.displayName = `${name}.Root`
		Content.displayName = `${name}.Content`
		Render.displayName = `${name}.Render`
	}
	ContentRenderer.displayName = Content.displayName || Content.name

	return {
		Root,
		Content,
		Render,
	}
}

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
