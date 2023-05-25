import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import { Table } from "@chakra-ui/react";

const TableComponent = ({ columns, data }) => {
  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </Table>
  );
};

export default TableComponent;
