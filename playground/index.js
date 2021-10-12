import o, { oFragment, oRender } from '../src/o';


const html = o('div').add(
    o('p').text('p - init').init(),
    o('p').text('p - without init'),
    oFragment(
        o('p').text('p - inside oFragment with init').init()
    ),
    oFragment([
        o('p').text('p - inside oFragment without init')
    ]),
    oFragment([
        o('p').text('oFragment with init')
    ]).init()
);

// oRender - Scenario #1
oRender(
    document.body,
    html.init()
);

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