export function oRef() {
  if (!(this instanceof oRef))
    return new oRef();
  this.target = null;
  this.o = null;

  this._isoref = true; // just for development - flag to check is element oRef function instance
}
