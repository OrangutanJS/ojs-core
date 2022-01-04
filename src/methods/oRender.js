import { oFragment } from "./oFragment";
import { o } from "./o";

export function oRender(parentNode, childNode, cleanParentContent = false) {
    if (Array.isArray(childNode)) {
        childNode.forEach(child => oRender(parentNode, child));
        return;
    }

    const isParentNodeValid = (parentNode instanceof HTMLElement) || (parentNode instanceof o);
    const isChildNodeValid = (childNode instanceof HTMLElement) || !!childNode.__proto__.init;
    if (!isParentNodeValid || !isChildNodeValid)
        return;

    let parentNodeHTML = (parentNode instanceof HTMLElement) ? parentNode : parentNode.element;
    const renderNode = childNode => {
        if (childNode instanceof HTMLElement) {
            if (cleanParentContent) parentNodeHTML.innerHTML = '';
            parentNodeHTML.appendChild(childNode);
            return;
        }
        if (childNode.__proto__.init) {
            if (cleanParentContent) parentNodeHTML.innerHTML = '';
            parentNodeHTML.appendChild(childNode.init());
        }
    }

    if (childNode instanceof oFragment) {
        childNode.init().forEach(child => renderNode(child));
        return;
    }

    renderNode(childNode);
}