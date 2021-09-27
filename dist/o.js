function o(element){if(!(this instanceof o))return new o(element);this.element="fragment"===element?oFragment():document.createElement(element),"form"===element&&this.element.addEventListener("submit",(t=>{t.preventDefault(),console.log("form")}))}o.prototype.event=function(obj){return obj instanceof Array?obj.forEach((t=>this.element.addEventListener(t.name,t.fn))):obj instanceof Object&&this.element.addEventListener(obj.name,obj.fn),this},o.prototype.click=function(t){return this.element.addEventListener("click",t),this},o.prototype.setAttribute=function(name,val){return this.element.setAttribute(name,val),this},o.prototype.setAttributes=function(attributes){return this.attr(attributes)},o.prototype.attr=function(attrs){return Array.isArray(attrs)?attrs.forEach((t=>this.element.setAttribute(t.name,t.val))):Object.entries(attrs).forEach((([name,val])=>this.element.setAttribute(name,val))),this},o.prototype.class=function(classNames){return Array.isArray(classNames)?classNames.forEach((className=>this.element.classList.add(className))):"string"==typeof classNames&&(this.element.className=classNames),this},o.prototype.classList=function(classList){return this.class(classList)},o.prototype.className=function(className){return this.class(className)},o.prototype.id=function(id){return this.element.setAttribute("id",id),this},o.prototype.add=function(children){return this.element instanceof oFragment?this.element.add(children):children.forEach((t=>{try{if("boolean"==typeof t)return;Array.isArray(t)?t.forEach((t=>this.element.appendChild(t))):this.element.appendChild(t)}catch(t){console.warn(t)}})),this},o.prototype.for=function(id){return"LABEL"===this.element.nodeName&&this.element.setAttribute("for",id),this},o.prototype.text=function(text){return["undefined","object","function"].includes(typeof text)||(this.element.textContent=text),this},o.prototype.html=function(html){if("object"==typeof html)try{this.element.appendChild(html)}catch(t){console.warn("Object is not HTMLElement: parametr 1 is type "+typeof html+"\n"+t)}else void 0!==typeof html&&void 0!==html&&(this.element.innerHTML=html);return this},o.prototype.translatedText=function(text,t){if("boolean"===t){const t=0==text?"NIE":"TAK";return this.text(t)}return t&&"string"==typeof t?(this.element.setAttribute("toTranslate",t),this.element.setAttribute("toTranslate-value",text),this.class("dot-flashing")):this.text("Brak danych")},o.prototype.init=function(){return this.element instanceof oFragment?this.element.init():this.element},o.prototype.translate=function(t,e){e||(e="GET");try{LibrariesTranslator.init2(this.element,t,e)}catch(t){return console.warn(t),this}return this},o.prototype.ref=function(oRefInstance){return oRefInstance&&oRefInstance instanceof oRef?(oRefInstance.target=this.element,oRefInstance.o=this,this):this},o.prototype.style=function(t){return this.element.setAttribute("style",t),this},o.prototype.placeholder=function(t){return inputFunction(this,"placeholder",t)},o.prototype.value=function(t){return inputFunction(this,"value",t)},o.prototype.type=function(t){return inputFunction(this,"type",t)},o.prototype.name=function(name){return inputFunction(this,"name",name)},o.prototype.min=function(t){return inputFunction(this,"min",t)},o.prototype.max=function(t){return inputFunction(this,"max",t)},o.prototype.disabled=function(t){return inputFunction(this,"disabled",t)},o.prototype.required=function(t){return inputFunction(this,"required",t)};export default o;export function oFragment(children=null){if(!(this instanceof oFragment))return new oFragment(children);this.children=null===children?[]:Array.isArray(children)?[...children]:[children]}oFragment.prototype.add=function(children){return Array.isArray(children)?this.children=this.children.concat([...children]):this.children.push(children),this},oFragment.prototype.init=function(){return this.children};export function oRef(){if(!(this instanceof oRef))return new oRef;this.target=null,this.o=null}