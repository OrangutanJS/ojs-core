'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function oFragment(...children) {
    if (!(this instanceof oFragment)) {
        return new oFragment(...children);
    }

    this.children = children.length === 1 && Array.isArray(children[0])
        ? children[0]
        : children;
}

oFragment.prototype.add = function (...children) {
    if (!children.length)
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

function oRef() {
    if (!(this instanceof oRef))
        return new oRef();
    this.target = null;
    this.o = null;
}

function addMethodService(children) {
    if (!(this instanceof o$1)) {
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

    if (children instanceof o$1 || children.__proto__.init) {
        const oInstanceHTML = children.init();
        if (oInstanceHTML instanceof HTMLElement) {
            this.element.appendChild(oInstanceHTML);
        }
    }

    return;
}

function inputFunction(instance, name, value) {
    if (instance.element.nodeName !== 'INPUT' || value === undefined) {
        return instance;
    }
    instance.element[name] = value;
    return instance;
}

function o$1(element) {
    if (!(this instanceof o$1)) {
        return new o$1(element);
    }
    if (element === 'fragment') {
        this.element = oFragment();
        return;
    }

    if (element instanceof HTMLElement) {
        this.element = element;
        return;
    }

    this.element = document.createElement(element);
}


o$1.prototype.event = function (obj) {
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

o$1.prototype.click = function (cb) {
    this.element.addEventListener('click', cb);
    return this;
};


o$1.prototype.setAttribute = function (name, val) {
    this.element.setAttribute(name, val);
    return this;
};

o$1.prototype.setAttributes = function (attributes) {
    return this.attr(attributes);
};

o$1.prototype.attr = function (attrs) {
    if (Array.isArray(attrs)) {
        attrs.forEach(attr => this.element.setAttribute(attr.name, attr.val));
    } else {
        Object.entries(attrs).forEach(([name, val]) => this.element.setAttribute(name, val));
    }
    return this;
};

o$1.prototype.class = function (classNames) {
    if (Array.isArray(classNames)) {
        classNames.forEach(className => this.element.classList.add(className));
    } else if (typeof classNames === 'string') {
        this.element.className = classNames;
    }
    return this;
};

o$1.prototype.classList = function (classList) {
    return this.class(classList)
};
o$1.prototype.className = function (className) {
    return this.class(className)
};

o$1.prototype.id = function (id) {
    this.element.setAttribute('id', id);
    return this;
};

o$1.prototype.add = function (...children) {
    children.forEach(child => addMethodService.call(this, child));
    return this;
};

o$1.prototype.for = function (id) {
    if (this.element.nodeName === 'LABEL') {
        this.element.setAttribute('for', id);
    }
    return this;
};

o$1.prototype.get = function (attribute) {
    return this.element[attribute] || undefined;
};

o$1.prototype.getText = function () {
    return this.element.innerText;
};

o$1.prototype.getId = function () {
    return this.element.id || undefined;
};

o$1.prototype.parent = function () {
    const { parentNode } = this.element;

    return parentNode ? o$1(parentNode) : null;
};

o$1.prototype.text = function (text) {
    if (!['undefined', 'object', 'function'].includes(typeof text)) {
        this.element.textContent = text;
    }
    return this;
};

o$1.prototype.html = function (html) {
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

o$1.prototype.init = function () {
    return (this.element instanceof oFragment) ? this.element.init() : this.element;
};

o$1.prototype.ref = function (oRefInstance) {
    if (!oRefInstance || !(oRefInstance instanceof oRef)) {
        return this;
    }
    oRefInstance.target = this.element;
    oRefInstance.o = this;
    return this;
};

o$1.prototype.style = function (styles) {
    this.element.setAttribute('style', styles);
    return this;
};

// INPUT functions

o$1.prototype.placeholder = function (placeholder) { return inputFunction(this, 'placeholder', placeholder) };
o$1.prototype.value = function (value) { return inputFunction(this, 'value', value) };
o$1.prototype.type = function (type) { return inputFunction(this, 'type', type) };
o$1.prototype.name = function (name) { return inputFunction(this, 'name', name) };
o$1.prototype.min = function (min) { return inputFunction(this, 'min', min) };
o$1.prototype.max = function (max) { return inputFunction(this, 'max', max) };
o$1.prototype.disabled = function (disabled) { return inputFunction(this, 'disabled', disabled) };
o$1.prototype.required = function (required) { return inputFunction(this, 'required', required) };

function oDom(selector, parentNode = document) {
    if (typeof selector !== 'string') return null;

    const parentNodeElement = (parentNode instanceof o$1)
        ? parentNode.element
        : parentNode;

    try {
        const element = parentNodeElement.querySelector(selector);

        return element ? o$1(element) : null;
    } catch (err) {
        return null;
    }
}

function oRender(parentNode, childNode, cleanParentContent = false) {
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
    };

    if (childNode instanceof oFragment) {
        childNode.init().forEach(child => renderNode(child));
        return;
    }

    renderNode(childNode);
}

exports["default"] = o$1;
exports.oDom = oDom;
exports.oFragment = oFragment;
exports.oRef = oRef;
exports.oRender = oRender;
