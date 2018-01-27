export function getSelectionText() {
    var selObj = window.getSelection();
    try {
        var selRange = selObj.getRangeAt(0);
    } catch (err) {
        return null
    }
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
export function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
