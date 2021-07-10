# ojs-core
Open source JavaScript library for creating Object-oriented Web user interfaces.
Core module
#### Quick start
##### input:
```javascript
o('div').class(['container', 'section']).id('first_section').add([
    o('h1').class('section__header').text('Header 1').init(),
    o('p').class('section__paragraph').text('Hello world!').init()
]).init()
```
It's important to init() all o' objects after declare and define.

##### output:
```html
<div class="container section" id="first_section">
    <h1 class="section__header">Header1</h1>
    <p class="section__paragraph">Hello world!</p>
</div>
```
