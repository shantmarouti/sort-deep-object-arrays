'use strict';

module.exports = sortDeep;

function isObject(obj) {
    return obj && typeof obj === 'object';
}

function hashObject(obj) {
    if (Array.isArray(obj)) {
        return JSON.stringify(obj);
    }
    if (isObject(obj)) {
        return JSON.stringify(
            Object.keys(obj)
                .sort()
                .filter(key => !Array.isArray(obj[key]) && !isObject(obj[key]))
                .map(key => [key, obj[key]])
        );
    }
    return obj;
}

function compareArrayObjects(a, b) {
    let aKey = hashObject(a),
        bKey = hashObject(b);

    return (aKey < bKey ? -1 : (aKey > bKey ? 1 : 0));
}

function sortDeep(root) {
    if (Array.isArray(root)) {
        return root
            .map(sortDeep)
            .sort(compareArrayObjects);
    }

    if (isObject(root)) {
        return Object.keys(root)
            .sort()
            .reduce((sortedRoot, key) => {
                sortedRoot[key] = sortDeep(root[key]);
                return sortedRoot;
            }, {});
    }

    return root;
}
