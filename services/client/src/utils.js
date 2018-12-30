/**
 * Clean the tree so that only keys title and children are present
 * by using a DFS traversal
 *
 * @param {*} tree 
 */
export function cleanTree(tree) {
    return tree.map(({
        title,
        children
    }) => {
        const result = {
            title
        };
        if (children && children.length > 0) {
            result.children = cleanTree(children);
        }
        return result;
    })
}

/**
 * Compare for a deep equal of two objects
 * @param {Object} x 
 * @param {Object} y 
 */
export function deepEqual(x, y) {
    const ok = Object.keys,
        tx = typeof x,
        ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
}