## react-custom-portal

So if you want to render part of component markupin another place this is right for you.
It's a bit like html portal in react, but for general react markup.

```js
import { createCustomPortal } from 'react-custom-portal'

const {
	PortalRoot: MyPortalRoot,
	PortalContent: ComponentSettings,
	Portal: SettingsPlaceHolder,
} = createCustomPortal()

const MyComponent = () => {
	<SomeMarkup>
		...
		<ComponentSettings>
			This will not be rendered here,
			but instead it will be rendered within SettingsPlaceHolder
		</ComponentSettings>
		...
	</SomeMarkup>
}

const MySettings = () => {
	<AnotherMarkup>
		...
		<SettingsPlaceHolder>
			{/*  content of the <ComponentSettings ... /> */}
		</SettingsPlaceHolder>
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

By default &lt;Portal /> will render the content of  all the &lt;PortalContent />  been rendered within the &lt;PortalRoot />. If you want to tweak some things you can set the `render` property of &lt;Portal /> to a function and it will be passed an array of &lt;PortalContent />s. Then filter them by theie props and return some markup to render.

`createCustomPortal` can be passed a string `name` to tune the names of created components for debug purpose.
