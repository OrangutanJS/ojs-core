import o, { oFragment } from "../o";

export default function addMethodService(children) {
    if (!(this instanceof o)) {
        console.error('Wrong usage of addService function');
        return;
    }

    if (
        typeof children === 'boolean' ||
        children === null ||
        typeof children === 'undefined'
    ) return;

    if (Array.isArray(children)) {
        children.forEach(child => addMethodService.call(this, child));
        return;
    }

    if (children instanceof oFragment) {
        children.init().forEach(child => addMethodService.call(this, child));
        return;
    }

    if (children instanceof HTMLElement) {
        this.element.appendChild(children);
        return;
    }

    if (children instanceof o || children.__proto__.init) {
        const oInstanceHTML = children.init();
        if (oInstanceHTML instanceof HTMLElement) {
            this.element.appendChild(oInstanceHTML);
        }
    }

    return;
}