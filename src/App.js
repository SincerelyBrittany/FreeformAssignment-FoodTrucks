import React, { useState, useEffect } from "react";
import Data from "./data/Mobile_Food_Facility_Permit.csv";
import Papa from "papaparse";
import { Container } from "@chakra-ui/react";

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
    <Container maxW="2xl" bg="blue.600" centerContent>
      <div className="App">
        {isDataLoading ? (
          <h1> loading </h1>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>FacilityType</th>
                <th>LocationDescription</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.Applicant}</td>
                  <td>{row.FacilityType}</td>
                  <td>{row.LocationDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}

export default App;
