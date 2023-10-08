import { oFragment } from "./oFragment";
import { addMethodService } from "../utils/addMethodService";
import { inputFunction } from "../utils/inputFunction";

export function o(element) {
  if (!element) {
    return null;
  }

  if (!(this instanceof o)) {
    return new o(element);
  }

  Object.defineProperty(
    this,
    '_isoelement',
    {
      value: true,
      writable: false,
    },
  );

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

// TODO: Instead of event change to events and .event method change to method with two attributes - name and fn (like in .setAttribute method)
// Example: .event('change', () => {...})
// Example: .events([{ name: 'change', fn: () => {...} }])
o.prototype.event = function (events) {
  if (events instanceof Array) {
    events.forEach(event => this.element.addEventListener(
      event.name,
      event.fn,
    ));
  } else if (events instanceof Object) {
    this.element.addEventListener(
      events.name,
      events.fn,
    );
  }
  return this;
};

o.prototype.click = function (fn) {
  this.element.addEventListener('click', fn);
  return this;
};

o.prototype.setAttribute = function (name, val) {
  this.element.setAttribute(name, val);
  return this;
}

o.prototype.setAttributes = function (attributes) {
  if (Array.isArray(attributes)) {
    attributes.forEach(attribute => this.element.setAttribute(attribute.name, attribute.val));
  } else {
    Object.entries(attributes).forEach(([name, val]) => this.element.setAttribute(name, val));
  }

  return this;
}

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

o.prototype.getId = function () {
  return this.element.id || undefined;
}

o.prototype.parent = function () {
  const { parentNode } = this.element;

  return parentNode ? o(parentNode) : null;
}

o.prototype.text = function (text) {
  if (!['undefined', 'object', 'function'].includes(typeof text)) {
    this.element.textContent = String(text);
  }

  return this;
};

// TODO: xss save
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
  if (!oRefInstance || !oRefInstance._isoref) {
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
