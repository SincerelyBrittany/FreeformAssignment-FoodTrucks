import React from "react";
import _ from "lodash";
import { Tbody, Tr, Td } from "@chakra-ui/react";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  return (
    <Tbody>
      {data.map((item) => (
        <Tr key={item.locationid}>
          {columns.map((column) => (
            <Td
              key={item.locationid + (column.path || column.label)}
              overflow="scroll"
              size="md"
              maxWidth="300px"
            >
              {renderCell(item, column)}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableBody;
