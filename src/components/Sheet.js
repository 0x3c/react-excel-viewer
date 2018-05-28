import React, { Component } from "react";
import Unit from "./Unit";

const toAsc = num => String.fromCharCode(num);
const toNum = char => char.charCodeAt();
export default class Sheet extends Component {
  state = {
    defaultRow: 20,
    defaultCol: 20,
    w: 100,
    h: 40
  };
  render() {
    const { w, h } = this.state;
    const { data } = this.props;
    console.log(data);

    const xx = data["!ref"] && data["!ref"].split(":")[1];
    if (!xx) {
      return <div>无</div>;
    }
    const col1 = xx.match(/[a-z|A-Z]+/gi)[0].charCodeAt() - 64;
    const row1 = +xx.match(/[\d]+/gi)[0];
    const row = Array.from({ length: row1 }).fill(Math.random());
    const col = Array.from({ length: col1 }).fill(Math.random());
    return (
      <div style={{ overflow: "auto" }}>
        {row.map((item, index) => (
          <div style={{ width: w * row.length, display: "flex" }} key={index}>
            {col.map((elem, idx) => (
              <Unit
                w={w}
                h={h}
                key={index + "" + idx}
                value={data[`${toAsc(idx + 65)}${index + 1}`]}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
