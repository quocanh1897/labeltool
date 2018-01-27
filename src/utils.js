export function getSelectionText() {
  // eslint-disable-next-line
  const selObj = window.getSelection();
  try {
    const selRange = selObj.getRangeAt(0);
    return selRange;
  } catch (err) {
    return null;
  }
}

export function trimNewLine(x) {
  return x.replace(/^[\r\n]+|[\r\n]+$/gm, '');
}

export function generateRandomString(N) {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array(N).join().split(',').map(() => s.charAt(Math.floor(Math.random() * s.length)))
    .join('');
}

export function checkParentRelation(parentNode, childNode) {
  if ('contains' in parentNode) {
    return parentNode.contains(childNode);
  }
  return parentNode.compareDocumentPosition(childNode) % 16;
}
export function download(data, filename, type) {
  // eslint-disable-next-line
  const file = new Blob([data], { type });
  // eslint-disable-next-line
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    // eslint-disable-next-line
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    // eslint-disable-next-line
    const a = document.createElement('a')
    // eslint-disable-next-line
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    // eslint-disable-next-line
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      // eslint-disable-next-line
      document.body.removeChild(a);
      // eslint-disable-next-line
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
