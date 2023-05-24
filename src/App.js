import React, { useState, useEffect } from "react";
import Data from "./data/Mobile_Food_Facility_Permit.csv";
import Papa from "papaparse";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  HStack,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function App() {
  const [isDataLoading, setDataLoading] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(Data);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csvData = decoder.decode(result.value);
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    }).data;
    setData(parsedData || []);
    setDataLoading(false);
  };

  useEffect(() => {
    setDataLoading(true);
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className="App">
      {isDataLoading ? (
        <h1> loading </h1>
      ) : (
        <Container maxW="1xl" bg="blue.600" centerContent>
          <h1> Showing {data.length} Food Trucks in database.</h1>
          <TableContainer>
            <Table variant="simple" overflow="scroll" size="sm" maxWidth="1">
              <Thead>
                <Tr
                  style={{
                    height: "30px",
                  }}
                >
                  <Th>Name</Th>
                  <Th>Address</Th>
                  <Th>FoodItems</Th>
                  <Th>Location</Th>
                  <Th>Schedule</Th>
                  <Th>dayshours</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.length !== 0 &&
                  data.map((row, index) => (
                    <Tr>
                      <Td overflow="scroll" size="md" maxWidth="300px">
                        {row.Applicant}
                      </Td>
                      <Td overflow="scroll" size="md" maxWidth="300px">
                        {row.Address}
                      </Td>
                      <Td overflow="scroll" size="md" maxWidth="300px">
                        {row.FoodItems}
                      </Td>
                      <Td overflow="scroll" size="md" maxWidth="300px">
                        {row.Location}
                      </Td>
                      <Td overflow="scroll" size="md" maxWidth="300px">
                        {row.Schedule}
                      </Td>
                      <Td overflow="scroll" size="md" maxWidth="300px">
                        {row.dayshours}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
        // </Flex>
      )}
    </div>
  );
}

export default App;
