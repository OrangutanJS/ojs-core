import inputFunction from "./utils/inputFunction";

function o(element) {
    if (!(this instanceof o)) {
        return new o(element);
    }
    if (element === 'fragment'){
        this.element = oFragment();
    }else {
        this.element = document.createElement(element);
    }
    if (element === 'form') {
        this.element.addEventListener('submit', e => {
            e.preventDefault();
            console.log('form');
        });
    }
}


o.prototype.event = function(obj) {
    if (obj instanceof Array) {
        obj.forEach(event => this.element.addEventListener(
            event.name,
            event.fn,
        ));
    }else if (obj instanceof Object) {
        this.element.addEventListener(
            obj.name,
            obj.fn,
        );
    }
    return this;
};

o.prototype.click = function(cb) {
    this.element.addEventListener('click', cb);
    return this;
};


o.prototype.setAttribute = function (name, val){
    this.element.setAttribute(name, val);
    return this;
}

o.prototype.setAttributes = function (attributes) {
    return this.attr(attributes);
}

o.prototype.attr = function(attrs) {
    if (Array.isArray(attrs)) {
        attrs.forEach(attr => this.element.setAttribute(attr.name, attr.val));
    } else {
        Object.entries(attrs).forEach(([name,val]) => this.element.setAttribute(name, val));
    }
    return this;
};

o.prototype.class = function(classNames) {
    if (Array.isArray(classNames)) {
        classNames.forEach(className => this.element.classList.add(className));
    }else if (typeof classNames === 'string') {
        this.element.className = classNames;
    }
    return this;
};

o.prototype.classList = function(classList) {
    return this.class(classList)
};
o.prototype.className = function(className) {
    return this.class(className)
}

o.prototype.id = function(id) {
    this.element.setAttribute('id', id);
    return this;
};

o.prototype.add = function(children) {
    if (this.element instanceof oFragment){
        this.element.add(children);
    }else {
        children.forEach(child => {
            try {
                if(typeof child === 'boolean')
                    return;
                if (Array.isArray(child)){
                    child.forEach(childEl => this.element.appendChild(childEl));
                }else {
                    this.element.appendChild(child);
                }
            }catch (err) {
                console.warn(err);
            }
        });
    }
    return this;
};

o.prototype.for = function (id){
    if (this.element.nodeName === 'LABEL'){
        this.element.setAttribute('for', id);
    }
    return this;
};

o.prototype.text = function(text) {
    if (!['undefined', 'object', 'function'].includes(typeof text)) {
        this.element.textContent = text;
    }
    return this;
};

o.prototype.html = function(html) {
    if (typeof(html) == 'object') {
        try {
            this.element.appendChild(html);
        }catch (err) {
            console.warn('Object is not HTMLElement: parametr 1 is type '+typeof(html)+'\n'+err);
        }
    }else if (typeof(html) !== undefined && html !== undefined) {
        this.element.innerHTML = html;
    }

    return this;
};
o.prototype.translatedText = function(text, translatedFromKey) { //NOTE: IMPORTANT! works only with LibrariesTranslator class
    if (translatedFromKey === 'boolean') {
        const value = text == 0 ? 'NIE' : 'TAK';
        return this.text(value);
    }
    if (!translatedFromKey || typeof translatedFromKey !== 'string') {
        return this.text('Brak danych');
    }

    this.element.setAttribute('toTranslate', translatedFromKey);
    this.element.setAttribute('toTranslate-value', text);

    return this.class('dot-flashing');
};

o.prototype.init = function() {
    return (this.element instanceof oFragment) ? this.element.init() : this.element;
};

o.prototype.translate = function(uri, method) {//If key is not in libraries then use just ".translate()" - without parameters
    if (!method) {
        method = 'GET';
    }
    try {
        LibrariesTranslator.init2(this.element, uri, method);
    }catch (e) {
        console.warn(e);
        return this;
    }

    return this;
};
o.prototype.ref = function (oRefInstance){
    if(!oRefInstance || !(oRefInstance instanceof oRef)){
        // console.error('oJS: Cannot set ref (reference) to instance. Wrong oRef instance given.');
        return this;
    }
    oRefInstance.target = this.element;
    oRefInstance.o = this;
    return this;
}

o.prototype.style = function(styles) {
    this.element.setAttribute('style', styles);
    return this;
};

// INPUT functions

o.prototype.placeholder = function(placeholder) { return inputFunction(this, 'placeholder', placeholder) }
o.prototype.value = function(value) { return inputFunction(this, 'value', value) }
o.prototype.type = function(type) { return inputFunction(this, 'type', type) }
o.prototype.name = function(name) { return inputFunction(this, 'name', name) }
o.prototype.min = function(min) { return inputFunction(this, 'min', min) }
o.prototype.max = function(max) { return inputFunction(this, 'max', max) }
o.prototype.disabled = function(disabled) { return inputFunction(this, 'disabled', disabled) }
o.prototype.required = function(required) { return inputFunction(this, 'required', required) }

export default o;

export function oFragment(children = null){
    if (!(this instanceof oFragment)) {
        return new oFragment(children);
    }
    if (children === null){
        this.children = [];
    }else {
        this.children = Array.isArray(children)
            ? [ ...children ]
            : [ children ];
    }
}

oFragment.prototype.add = function (children){
    if (Array.isArray(children)){
        this.children = this.children.concat([ ...children ]);
    }else {
        this.children.push(children);
    }
    return this;
};

oFragment.prototype.init = function (){
    return this.children;
};


export function oRef(){
    if (!(this instanceof oRef))
        return new oRef();
    this.target = null;
    this.o = null;
}
