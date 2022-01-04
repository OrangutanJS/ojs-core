export function oRef() {
    if (!(this instanceof oRef))
        return new oRef();
    this.target = null;
    this.o = null;
}