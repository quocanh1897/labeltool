import React, { Component } from 'react';
import './App.css';
import TextArea from './TextArea';
import { download } from './utils';
import categories from './categories.json';

class App extends Component {
  constructor() {
    super();
    categories.normal = {
      color: '#000000',
      shortcut: 'Q',
    };
    this.state = {
      idx: -1,
    };
  }


  handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const newLocal = this;
    reader.onload = (ev) => {
      const data = JSON.parse(ev.target.result);
      newLocal.setState({
        data,
        name: file.name,
        idx: 0,
        runs: data.map(x => x.tags),
      });
    };
    if (file) {
      reader.readAsText(file);
    }
  }

  saveRuns(idx) {
    const { runs } = this.state;
    const newLocal = this;
    return (r) => {
      runs[idx] = r;
      newLocal.setState({ runs });
    };
  }
  saveAll = () => {
    const { data, runs, name } = this.state;
    const list = data.map((x, i) => ({ ...data[i], tags: runs[i] }));
    download(JSON.stringify(list), name, 'application/json');
  }

  render() {
    const {
      idx, data, runs, name,
    } = this.state;
    return (
      <div className="App container">

        {/* <input type="file" id="file" onChange={this.handleFileSelect} /> */}
        <div>
          <label className="btn btn-default btn-file" htmlFor="file">
            Browse
            <input id="file" type="file" style={{ display: 'none' }} onChange={this.handleFileSelect} />
          </label>
          <span>{name && name !== '' ? name : 'Choose file'}</span>
        </div>
        {
          data &&
          [
            <button
              type="button"
              className="btn btn-default"
              key="previous"
              disabled={idx === 0}
              onClick={() => this.setState({ idx: idx - 1 })}
            >
              Previous
            </button>,
            <button
              type="button"
              className="btn btn-default"
              key="next"
              disabled={idx === data.length}
              onClick={() => this.setState({ idx: idx + 1 })}
            >
              Next
            </button>,
            <button
              type="button"
              className="btn btn-default"
              key="save"
              onClick={this.saveAll}
            >
              Save
            </button>,
          ]
        }
        {idx >= 0 && data && data[idx]
          ? <TextArea
            key="text-area"
            id={`article-${idx}`}
            text={data[idx].content}
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
