import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash'
import TextArea from './TextArea'

class App extends Component {
  constructor() {
    super();
    const categories = require('./categories.json')
    categories['normal'] = {
      'color': '#000000',
      'shortcut': 'Q'
    }
    this.state = {
      idx: -1,
      categories
    }
  }


  handleFileSelect = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const _this = this
    reader.onload = (function (theFile) {
      return function (e) {
        const data = JSON.parse(e.target.result)
        _this.setState({
          data,
          idx: 0,
          runs: data.map(x => null)
        })
      };
    })(file);
    reader.readAsText(file)

  }

  saveRuns(idx) {
    const { runs } = this.state
    const _this = this
    return r => {
      runs[idx] = r
      this.setState({ runs })
    }
  }

  render() {
    const { idx, data, categories, runs } = this.state
    let len = 0
    return (
      <div className="App">

        <input type="file" id="file" onChange={this.handleFileSelect} />
        {
          data &&
          [
            <button key='previous' disabled={idx === 0} onClick={e => this.setState({ idx: idx - 1 })}>
              Previous
            </button>,
            <button key='next' disabled={idx === data.length} onClick={e => this.setState({ idx: idx + 1 })}>
              Next
            </button>
          ]
        }
        {idx >= 0 && data && data[idx]
          ? <TextArea
            key='text-area'
            id={`article-${idx}`}
            text={data[idx]['content']}
            categories={categories}
            runs={runs[idx]}
            onSaved={this.saveRuns(idx)}
          />
          : null}
      </div>
    );
  }
}

export default App;
