import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getSelectionText } from './utils'
import _ from 'lodash'
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      idx: -1,
      selectedText: '',
      runs: {}
    }
    document.onselectionchange = _.debounce(this.handleTextSelected, 500)
  }
  handleTextSelected = (e) => {
    const range = getSelectionText()
    if (range) {
      const { startContainer, endContainer, startOffset, endOffset } = range
      const startIdx = parseInt(startContainer.parentNode.id) + startOffset
      const endIdx = parseInt(endContainer.parentNode.id) + endOffset
      console.log(startIdx, endIdx)
    }
    this.setState({
      selectedText: getSelectionText()
    })
  }
  handleFileSelect = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const _this = this
    reader.onload = (function (theFile) {
      return function (e) {
        _this.setState({
          data: JSON.parse(e.target.result),
          idx: 0
        })
      };
    })(file);
    reader.readAsText(file)

  }
  render() {
    const { idx, data } = this.state
    let len = 0
    return (
      <div className="App">
        <input type="file" id="file" onChange={this.handleFileSelect} />
        {idx >= 0 && data && data[idx] ? <div id={`article-${idx}`}>
          {
            data[idx]["content"].split('\n').map((x, i) => {
              const id = len
              len += x.length
              return <p key={i} id={id}>{x}</p>
            })
          }
        </div> : null}
      </div>
    );
  }
}

export default App;
