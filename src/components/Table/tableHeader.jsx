import React, { Component } from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

class TableHeader extends Component {
  render() {
    return (
      <Thead>
        <Tr>
          {this.props.columns.map((column) => (
            <Th className="clickable" key={column.path || column.key}>
              {column.label}
            </Th>
          ))}
        </Tr>
      </Thead>
    );
  }
}

export default TableHeader;
