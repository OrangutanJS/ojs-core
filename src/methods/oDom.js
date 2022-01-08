import { o } from './o';

export function oDom(selector, parentNode = document) {
    if (typeof selector !== 'string') return null;

    const parentNodeElement = (parentNode instanceof o)
        ? parentNode.element
        : parentNode;

    try {
        const element = parentNodeElement.querySelector(selector);

        return element ? o(element) : null;
    } catch (err) {
        return null;
    }
}
