import o, { oFragment } from '../src/o';


const html = o('div').add(
    o('p').text('p - init').init(),
    o('p').text('p - withot init'),
    oFragment(
        o('p').text('p - inside oFragment with init').init()
    ),
    oFragment([
        o('p').text('p - inside oFragment without init')
    ]),
    oFragment([
        o('p').text('oFragment with init')
    ]).init()
).init();

document.body.appendChild(
    html
);