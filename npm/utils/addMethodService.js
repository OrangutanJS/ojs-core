import e,{oFragment as i}from"../o";export default function addMethodService(n){if(this instanceof e){if("boolean"!=typeof n&&null!=n)if(Array.isArray(n))n.forEach((e=>addMethodService.call(this,e)));else if(n instanceof i)n.init().forEach((e=>addMethodService.call(this,e)));else if(n instanceof HTMLElement)this.element.appendChild(n);else if(n instanceof e||n.__proto__.init){const e=n.init();e instanceof HTMLElement&&this.element.appendChild(e)}}else console.error("Wrong usage of addService function")}