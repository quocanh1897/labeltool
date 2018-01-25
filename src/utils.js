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
