import React, { Component } from "react";
import TableComponent from "../table/Table";
import { Link } from "react-router-dom";

class FoodTruckTable extends Component {
  constructor() {
    super();
  }
  columns = [
    {
      path: "Applicant",
      label: "Name",
    },
    { path: "FoodItems", label: "FoodItems" },
    { path: "FacilityType", label: "Type" },
    {
      path: "Location",
      label: "Location",
      content: (location) => (
        <Link
          to={`/map/${location.Location}`}
          state={{ from: location.Address }}
        >
          {location.Address}
        </Link>
      ),
    },
  ];

  render() {
    const { paginatedTrucks } = this.props;

    return <TableComponent columns={this.columns} data={paginatedTrucks} />;
  }
}

export default FoodTruckTable;
