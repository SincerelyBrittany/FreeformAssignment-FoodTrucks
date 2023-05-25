import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

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
