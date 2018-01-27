export function getSelectionText() {
    console.log(document.activeElement)
    var selObj = window.getSelection();
    console.log(selObj);
    var selRange = selObj.getRangeAt(0);
    // do stuff with the range
    console.log(selRange)
    return selRange
}

export function trimNewLine(x) {
    return x.replace(/^[\r\n]+|[\r\n]+$/gm, '');
}

export function generateRandomString(N) {
    const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array(N).join().split(',').map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
}

export function checkParentRelation(parentNode, childNode) {
    if ('contains' in parentNode) {
        return parentNode.contains(childNode);
    }
    else {
        return parentNode.compareDocumentPosition(childNode) % 16;
    }
}
