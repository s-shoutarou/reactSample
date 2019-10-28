import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 1,
          memo: "サンプルメモ"
        }
      ],
      searchText: ""
    };
    this.addMemo = this.addMemo.bind(this);
    this.callbackSearch = this.callbackSearch.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  addMemo(val) {
    let nextMemo = this.state.data;
    nextMemo.push({ id: this.state.length + 1, memo: val });
    this.setState({
      data: nextMemo
    });
  }

  callbackSearch(val) {
    this.setState({
      searchText: val
    });
  }
  filterSearch(elm) {
    const regexp = new RegExp("^" + this.state.searchText, "i");
    return elm.memo.match(regexp);
  }

  render() {
    let text = this.state.data;
    let memos = [];
    for (let i in text) {
      memos.push(<div key={i}>{text[i].memo}</div>);
    }
    const data = this.state.searchText
      ? this.state.data.filter(this.filterSearch)
      : this.state.data;
    return (
      <div>
        <div>{this.state.searchText}</div>
        <div>This is メモアプリ</div>
        {memos}
        <Serch callbackSearch={this.callbackSearch} />
        <MemoCreater addMemo={this.addMemo} />
        <Table memo={data} />
      </div>
    );
  }
}

class MemoCreater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      err_msg: "ermサンプル"
    };
    this.textChange = this.textChange.bind(this);
    this.addMemo = this.addMemo.bind(this);
  }

  addMemo() {
    const val = this.state.text;
    this.props.addMemo(val);
  }

  textChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    const errMsg = this.state.err_msg ? <span>{this.state.err_msg}</span> : "";
    return (
      <div className="input-area">
        <input
          type="text"
          name="memo"
          value={this.state.val}
          onChange={this.textChange}
        />
        <input type="submit" onClick={this.addMemo} />
        {errMsg}
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.memo;
    let memos = [];
    for (let i in data) {
      memos.push(<Memo key={i} id={data[i].id} text={data[i].memo} />);
    }
    return (
      <table border="1">
        <tbody>{memos}</tbody>
      </table>
    );
  }
}

class Memo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text
    };
  }
  render() {
    return (
      <tr>
        <td>{this.state.text}</td>
      </tr>
    );
  }
}

class Serch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: ""
    };
    this.textChange = this.textChange.bind(this);
  }

  textChange(e) {
    this.setState({
      val: e.target.value
    });
    this.props.callbackSearch(e.target.value);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="serchForm"
          onChange={this.textChange}
          value={this.state.val}
          placeholder="検索ワード"
        />
      </div>
    );
  }
}
render(<App />, document.getElementById("app"));
