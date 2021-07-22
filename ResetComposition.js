import {isReactive, isRef, toRaw} from 'vue';

function ResetComposition(...originals) {
    this._original = [];
    this.refs = [];
    if(originals.length > 1){
        originals.forEach(item => {
            this.add(item);
        });
    }else{
        let original = originals[0];
        Object.entries(original).forEach(([, value]) => {
            this.add(value);
        });
    }
}

// https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
ResetComposition.prototype._deepClone = function(obj, hash = new WeakMap()) {
    let that = this;
    if (Object(obj) !== obj) return obj; // primitives
    if (hash.has(obj)) return hash.get(obj); // cyclic reference
    const result = obj instanceof Set ? new Set(obj) // See note about this!
        : obj instanceof Map ? new Map(Array.from(obj, ([key, val]) => [key, this._deepClone(val, hash)]))
        : obj instanceof Date ? new Date(obj)
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
        : isRef(obj) ? (this.refs.push({target: obj, data: obj.value}))
        // ... add here any specific treatment for other classes ...
        // and finally a catch-all:
        : obj.constructor ? new obj.constructor()
        : Object.create(null);
    hash.set(obj, result);
    return Object.assign(result, ...Object.keys(obj).map(key => ({[key]: that._deepClone(obj[key], hash)})));
}

ResetComposition.prototype.reset = function () {
    this.refs.forEach(item => {
        item.target.value = item.data;
    });
    this._original.forEach(item => {
        Object.assign(item.target, item.data);
    });
}

ResetComposition.prototype.add = function (value) {
    if (isReactive(value)) {
        this._original.push({target: value, data: this._deepClone(toRaw(value))});
    } else if (isRef(value)) {
        this.refs.push({target: value, data: value.value});
    }
}

export default ResetComposition;
