import React, { Component } from "react";
import "whatwg-fetch";
import { Button, Tabs } from "antd";
import Sheet from "./components/Sheet";

import XLSX from "xlsx";
import "./App.css";
const TabPane = Tabs.TabPane;

const url = `http://hzbuilding-public.oss-cn-hangzhou.aliyuncs.com//ops/dev/20180527/245a7fe8-3770-4210-b588-0031bb4810b8.2018年4月电脑、配件及打印耗材报价.XLSX`;
const url2 = `http://hzbuilding-public.oss-cn-hangzhou.aliyuncs.com//ops/dev/20180528/8692ef51-a348-4aa4-ba08-b2d4e049691d.20180501 需求拆分.xlsx`;
class App extends Component {
  state = {
    sheets: [],
    sheetNames: []
  };
  render() {
    const { sheetNames, sheets } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.fetchExcel}>
          fetching
        </Button>
        <div>
          <Tabs tabPosition="bottom">
            {sheetNames.map(item => (
              <TabPane tab={item} key={item}>
                <Sheet data={sheets[item]} />
                {/* {!!sheets[item]["!ref"] && sheets[item]["A1"]["w"]} */}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
  loadend = e => {
    const result = e.currentTarget.result;
    const data = new Uint8Array(result);
    const workbook = XLSX.read(result, { type: "array" });
    this.setState({
      sheetNames: workbook.SheetNames,
      sheets: workbook.Sheets
    });
    window.sheets = workbook.Sheets[workbook.SheetNames[0]];
    console.log(workbook);
  };
  fetchExcel = _ => {
    const reader = new FileReader();
    reader.addEventListener("loadend", this.loadend);
    fetch(url2)
      .then(resp => resp.blob())
      .then(blob => reader.readAsArrayBuffer(blob));
  };
}

export default App;
