## react-custom-portal

If you want to render part of your component markup in some another place this help you.
It's a bit like html portal in react, but for general react markup.

```js
import { createCustomPortal } from 'react-custom-portal'

const {
	PortalRoot: MyPortalRoot,
	PortalContent: ComponentExternalMarkup,
	Portal: ExternalMarkupPlaceHolder,
} = createCustomPortal()

const MyComponent = () => {
	<SomeMarkup>
		...
		<ComponentExternalMarkup>
			This will not be rendered here,
			but instead it will be rendered within ExternalMarkupPlaceHolder
		</ComponentExternalMarkup>
		...
	</SomeMarkup>
}

const MySettings = () => {
	<AnotherMarkup>
		...
		<ExternalMarkupPlaceHolder>
			{/*  content of the <ComponentExternalMarkup ... /> */}
		</ExternalMarkupPlaceHolder>
		...
	</AnotherMarkup>
}

const MyPage = () => {
	<MyPortalRoot>
		...
		<MyComponent />
		...
		<MySettings />
		<
	</MyPortalRoot>
}

```

By default &lt;Portal /> will render the content of  all the &lt;PortalContent />  been rendered within the &lt;PortalRoot />. If you want to tweak some things you can set the `render` property of &lt;Portal /> to a function and it will be passed an array of &lt;PortalContent />s. Then filter them by their props and return some markup to render.

`createCustomPortal` can be passed a string `name` to tune the names of created components for debug purpose.
