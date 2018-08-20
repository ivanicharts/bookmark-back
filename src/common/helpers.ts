// function reccursiveEncode(object, target = {}) {
//     Object
//         .entries(object)
//         .forEach(([key, value]) => {
//             if (typeof value === 'object') {
//                 target[key] = reccursiveEncode(value, {});
//             } else if (typeof value === 'string') {
//                 target[key] = decodeURI(value);
//             } 
//         });
    
//     return target;
// }

export function reccObjTraverse(object: object, target: object = {}, fn: (x) => any): object {
    Object
        .entries(object)
        .forEach(([key, value]) => {
            if (typeof value === 'object') {
                target[key] = reccObjTraverse(value, {}, fn);
            } else if (typeof value === 'string') {
                target[key] = fn(value);
            } 
        });
    return target;
}

export function reccursiveEncode(object: object, target: object = {}): object {
    return reccObjTraverse(object, target, encodeURI);
}

export function reccursiveDecode(object: object, target: object = {}): object {
    return reccObjTraverse(object, target, decodeURI);
}