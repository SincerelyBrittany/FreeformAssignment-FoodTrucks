import React, { useState, useEffect } from "react";
import Data from "../../data/Mobile_Food_Facility_Permit.csv";
import Papa from "papaparse";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../globalComponents/Pagination";
import SearchBox from "../globalComponents/SearchBox";
import FoodTruckTable from "../foodTrucks/FoodTruckTable";

import { Container } from "@chakra-ui/react";

export default function FoodTrucks() {
  const [isDataLoading, setDataLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = React.useState(20);
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
      paginatedData: paginatedData,
    };
  };

  if (data && data.length === 0) return <p> There are no data </p>;

  const { totalCount, paginatedData } = getPagedData();

  return (
    <div className="App">
      {isDataLoading ? (
        <h1> loading </h1>
      ) : (
        <Container maxW="2xl" bg="blue.600" centerContent>
          <h1> Showing {totalCount} Food Trucks in database.</h1>
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <FoodTruckTable paginatedTrucks={paginatedData} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Container>
      )}
    </div>
  );
}
