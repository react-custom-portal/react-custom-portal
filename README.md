## react-custom-portal

This helps you if you want to render part of your component markup in some another place.
It's a bit like html portal in react, but for general react markup.

```js
import { createPortal } from 'react-custom-portal'

const ExternalMarkup = createPortal()

const MyComponent = () => {
  <SomeMarkup>
    ...
    <ExternalMarkup.Content>
      This text will not be rendered here,
      but instead it will be rendered within ExternalMarkup.Render
    </ExternalMarkup.Content>
    ...
  </SomeMarkup>
}

const MySettings = () => {
  <AnotherMarkup>
    ...
    {/* The content of <ExternalMarkup.Content ... /> will be rendered here */}
    <ExternalMarkup.Render />
    ...
  </AnotherMarkup>
}

const MyPage = () => {
  <ExternalMarkup.Root>
    ...
    <MyComponent />
    ...
    <MySettings />
    ...
  </ExternalMarkup.Root>
}

```

By default &lt;Portal.Render /> will render the content of  all the &lt;Portal.Content />  been rendered within the &lt;Portal.Root />. If you want to tweak some things you can set the `render` property of &lt;Portal.Render /> to a function and it will be passed an array of &lt;Portal.Content />s. Then filter them by their props and return some markup to render.

`createPortal` can be passed a string `displayName` to tune the names of created components for debug purpose.
