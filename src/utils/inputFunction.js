function inputFunction(instance, name,  value) {
    if(instance.element.nodeName !== 'INPUT' || value === undefined) {
        return instance;
    }
    instance.element[name] = value;
    return instance;
}
export default inputFunction;
