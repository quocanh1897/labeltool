import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      idx: -1
    }
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
    return (
      <div className="App">
        <input type="file" id="file" onChange={this.handleFileSelect} />
        <div>
          {
            idx >= 0 && data && data[idx] ? data[idx]["content"] : ''
          }
        </div>
      </div>
    );
  }
}

export default App;
