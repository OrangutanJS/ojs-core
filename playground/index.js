import o, { oFragment, oRender, oDom } from '../src/o';
import './main.css';

const div = o('div');
const html = div.add(
    o('p').text('p - init').init(),
    o('p').id('pElement').text('p - without init'),
    oFragment(
        o('p').text('p - inside oFragment with init').init(),
        o('p').text('p - inside oFragment without init'),
        o('p').text('oFragment with init')
    ),
);

// oRender - Scenario #1
oRender(
    document.body,
    html.init()
);

// const pElement = oDom('#pElement', div);
const pElement = oDom('#pElement');
pElement.text('p - without init but bolded').classList('bold');
console.log(pElement.get('className'));
console.log(pElement.get('id'));
console.log(pElement.getText());
console.log(pElement.parent());


// oRender - Scenario #2
// oRender(
//     document.body,
//     html
// );

// oRender - Scenario #3
// const wrapper = o('div');
// oRender(
//     wrapper,
//     html
// );
// check results:
// console.log(wrapper.init());
// or
// document.body.appendChild(wrapper.init());
// or
// oRender(
//     document.body,
//     wrapper.init()
// );

// oRender - Scenario #4
// const fragment = oFragment(
//     html
// );
// oRender(
//     document.body,
//     fragment
// );

// oRender - Scenario #5
// const fragment = oFragment(
//     html.init()
// );

// oRender(
//     document.body,
//     fragment
// );

// oRender - Scenario #6
// const fragment = oFragment(
//     html.init()
// );

// oRender(
//     document.body,
//     fragment.init()
// );