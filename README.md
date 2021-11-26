# ojs-core
Open source JavaScript library for creating Object-oriented Web user interfaces.
Core OrangutanJS module.
## Install using npm:
```bash
npm i -D ojs-core
```
### Quick start
##### input:
```js
import o from 'ojs-core';
(...)

o('div').class('section border').id('first_section').add(
    o('h1').class('section__header').text('Hello oJS!!'),
    o('p').class('section__paragraph').text('This is OrangutanJS.')
]);
```
##### output:
```html
<div class="section border" id="first_section">
    <h1 class="section__header">Hello oJS!</h1>
    <p class="section__paragraph">This is OrangutanJS.</p>
</div>
```

#### Render ojs to DOM:
```js
import o, { oRender } from 'ojs-core';

const ojsContent = o('div').class('section border').id('first_section').add(
    o('h1').class('section__header').text('Hello oJS!!'),
    o('p').class('section__paragraph').text('This is OrangutanJS.')
]);

oRender(
    document.body,
    ojsContent
);
```

## oJS instance
Before you use *init* method ojs instance is an object that you can work with using various methods.

```js
o('div');           // o{ element: div, (...)}
o('div').init();    // <div></div>
```

You don't need to use init method when you are using oRender method. oRender would do it on its own.


## oRender
```ts
oRender(parentNode: HTMLElement, childNode: HTMLElement | ojsInstance, cleanParentContent: boolean = false)
```

## oFragment
oFragment is shadowElement where you can add multiple elements without creating unnecessary HTML Element.
```ts
oFragment(children: Array<HTMLElement|ojsInstance>)
```
### Important: You can pass children in Array or just separated by a comma.

#### Example:
```js
import o, { oRender, oFragment } from 'ojs-core';

oRender(
    document.body,
    oFragment(
        o('p').text('p1'),
        o('p').text('p2')
    )
)
```
#### Result:
```html
<body>
    <p>p1</p>
    <p>p2</p>
</body>
```

### .add()
You don't have to pass children elements right away when creating oFragment instance
#### Example:
```js
import o, { oFragment } from 'ojs-core';

const fragment = oFragment();
const paragraphs = ['p1', 'p2'];

fragment.add(
    paragraphs.map(paragraph => o('p').text(paragraph))
)
```

### oFragment - .init()
Init method returns Array of all children from instance;
#### Example:
```js
const fragment = oFragment(
    o('p').text('p1').init(),
    o('p').text('p2').init()
);

fragment.init();
// [
//  <p>p1</p>,
//  <p>p2</p>
// ]
```

## oDom
oDom allows to get element from DOM using query selector (css selectors). Returns ojs object.
Returns null in all other cases (element not found or wrong arguments);
```ts
oDom(selector: String, parentNode: DOMElement|ojsInstance = document)
```
#### Example:
```js
import o,{ oDom } from 'ojs-core';

const pElement = oDom('#someParagraph');

pElement.text('new paragraph text set using ojs API');
```