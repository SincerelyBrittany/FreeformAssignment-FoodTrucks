import React, { useState, useEffect } from "react";
import Data from "./data/Mobile_Food_Facility_Permit.csv";
import Papa from "papaparse";
import _ from "lodash";
import { paginate } from "./utils/paginate";
import Pagination from "./components/pagination";
import SearchBox from "./components/searchBox";

import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function App() {
  const [isDataLoading, setDataLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = React.useState(23);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

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

  const handlePageChange = (pageNum) => {
    setcurrentPage(pageNum);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setcurrentPage(1);
  };
  const Search = (searchTerm, limit = 10) => {
    let results = [];
    _.map(data, function filterItem(n) {
      if (n.Applicant.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        results.push(n);
      }
    });
    return results;
  };

  const getPagedData = () => {
    let filtered;
    if (searchQuery) {
      filtered = Search(searchQuery);
    } else {
      filtered = data;
    }

    const paginatedData = paginate(filtered, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      paginatedTrucks: paginatedData,
    };
  };

  if (data && data.length === 0) return <p> There are no data </p>;

  const { totalCount, paginatedTrucks } = getPagedData();

  return (
    <div className="App">
      {isDataLoading ? (
        <h1> loading </h1>
      ) : (
        <Container maxW="2xl" bg="blue.600" centerContent>
          <h1> Showing {totalCount} Food Trucks in database.</h1>
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <TableContainer>
            <Table variant="simple" overflow="scroll" size="sm" maxWidth="10">
              <TableCaption>
                <Pagination
                  itemsCount={data.length}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </TableCaption>
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
                {paginatedTrucks.length !== 0 &&
                  paginatedTrucks.map((row, index) => (
                    <Tr key={index}>
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
      )}
    </div>
  );
}

export default App;
