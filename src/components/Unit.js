import React, { Component } from "react";
export default class Unit extends Component {
  render() {
    const { w, h, value } = this.props;
    const content = "内容";
    return (
      <div
        style={{
          border: "0.5px solid #999999",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: w,
          height: h
        }}
      >
        {value ? value["w"] : " "}
      </div>
    );
  }
}
