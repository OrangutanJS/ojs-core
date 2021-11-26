import addMethodService from "./utils/addMethodService";
import inputFunction from "./utils/inputFunction";

function o(element) {
    if (!(this instanceof o)) {
        return new o(element);
    }
    if (element === 'fragment') {
        this.element = oFragment();
        return;
    }

    if(element instanceof HTMLElement) {
        this.element = element;
        return;
    }

    this.element = document.createElement(element);
}


o.prototype.event = function (obj) {
    if (obj instanceof Array) {
        obj.forEach(event => this.element.addEventListener(
            event.name,
            event.fn,
        ));
    } else if (obj instanceof Object) {
        this.element.addEventListener(
            obj.name,
            obj.fn,
        );
    }
    return this;
};

o.prototype.click = function (cb) {
    this.element.addEventListener('click', cb);
    return this;
};


o.prototype.setAttribute = function (name, val) {
    this.element.setAttribute(name, val);
    return this;
}

o.prototype.setAttributes = function (attributes) {
    return this.attr(attributes);
}

o.prototype.attr = function (attrs) {
    if (Array.isArray(attrs)) {
        attrs.forEach(attr => this.element.setAttribute(attr.name, attr.val));
    } else {
        Object.entries(attrs).forEach(([name, val]) => this.element.setAttribute(name, val));
    }
    return this;
};

o.prototype.class = function (classNames) {
    if (Array.isArray(classNames)) {
        classNames.forEach(className => this.element.classList.add(className));
    } else if (typeof classNames === 'string') {
        this.element.className = classNames;
    }
    return this;
};

o.prototype.classList = function (classList) {
    return this.class(classList)
};
o.prototype.className = function (className) {
    return this.class(className)
}

o.prototype.id = function (id) {
    this.element.setAttribute('id', id);
    return this;
};

o.prototype.add = function (...children) {
    children.forEach(child => addMethodService.call(this, child));
    return this;
}

o.prototype.for = function (id) {
    if (this.element.nodeName === 'LABEL') {
        this.element.setAttribute('for', id);
    }
    return this;
};

o.prototype.get = function (attribute) {
    return this.element[attribute] || undefined;
}

o.prototype.getText = function () {
    return this.element.innerText;
}

o.prototype.getId = function() {
    return this.element.id || undefined;
}

o.prototype.parent = function() {
    const { parentNode }  = this.element;
    return parentNode
        ? o(parentNode)
        : null;
}

o.prototype.text = function (text) {
    if (!['undefined', 'object', 'function'].includes(typeof text)) {
        this.element.textContent = text;
    }
    return this;
};

o.prototype.html = function (html) {
    if (typeof (html) == 'object') {
        try {
            this.element.appendChild(html);
        } catch (err) {
            console.warn('Object is not HTMLElement: parametr 1 is type ' + typeof (html) + '\n' + err);
        }
    } else if (typeof (html) !== undefined && html !== undefined) {
        this.element.innerHTML = html;
    }

    return this;
};

o.prototype.init = function () {
    return (this.element instanceof oFragment) ? this.element.init() : this.element;
};

o.prototype.ref = function (oRefInstance) {
    if (!oRefInstance || !(oRefInstance instanceof oRef)) {
        return this;
    }
    oRefInstance.target = this.element;
    oRefInstance.o = this;
    return this;
}

o.prototype.style = function (styles) {
    this.element.setAttribute('style', styles);
    return this;
};

// INPUT functions

o.prototype.placeholder = function (placeholder) { return inputFunction(this, 'placeholder', placeholder) }
o.prototype.value = function (value) { return inputFunction(this, 'value', value) }
o.prototype.type = function (type) { return inputFunction(this, 'type', type) }
o.prototype.name = function (name) { return inputFunction(this, 'name', name) }
o.prototype.min = function (min) { return inputFunction(this, 'min', min) }
o.prototype.max = function (max) { return inputFunction(this, 'max', max) }
o.prototype.disabled = function (disabled) { return inputFunction(this, 'disabled', disabled) }
o.prototype.required = function (required) { return inputFunction(this, 'required', required) }

export default o;

export function oFragment(...children) {
    if (!(this instanceof oFragment)) {
        return new oFragment(...children);
    }

    this.children = children.length === 1 && Array.isArray(children[0])
        ? children[0]
        : children;
}

oFragment.prototype.add = function (...children) {
    if(!children.length)
        return this;
    const childrenArray = children.length === 1 && Array.isArray(children[0])
        ? children[0]
        : children;

    this.children = this.children.concat(childrenArray);

    return this;
};

oFragment.prototype.init = function () {
    return this.children;
};


export function oRef() {
    if (!(this instanceof oRef))
        return new oRef();
    this.target = null;
    this.o = null;
}


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
            if(cleanParentContent) parentNodeHTML.innerHTML = '';
            parentNodeHTML.appendChild(childNode);
            return;
        }
        if (childNode.__proto__.init) {
            if(cleanParentContent) parentNodeHTML.innerHTML = '';
            parentNodeHTML.appendChild(childNode.init());
        }
    }

    if (childNode instanceof oFragment) {
        childNode.init().forEach(child => renderNode(child));
        return;
    }

    renderNode(childNode);
}

export function oDom(selector, parentNode = document) {
    if(typeof selector !== 'string') return null;

    const parentNodeElement = (parentNode instanceof o)
        ? parentNode.element
        : parentNode;

    try{
        const element = parentNodeElement.querySelector(selector);

        return element ? o(element) : null;
    }catch(err) {
        return null;
    }
}