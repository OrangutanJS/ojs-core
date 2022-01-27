export function oFragment(...children) {
  if (!(this instanceof oFragment)) {
    return new oFragment(...children);
  }

  this.children = children.length === 1 && Array.isArray(children[0])
    ? children[0]
    : children;

  this._isofragment = true; // just for development - flag to check is element oFragment function instance
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
