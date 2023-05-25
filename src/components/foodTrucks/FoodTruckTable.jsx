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
    { path: "Address", label: "Address" },
    { path: "FacilityType", label: "Type" },
    {
      path: "Location",
      label: "Location",
      content: (location) => (
        // <div>{location.Location}</div>,
        <Link to={`/map/${location.Location}`}>{location.Location}</Link>
      ),
    },
  ];

  render() {
    console.log(this.props.paginatedTrucks[0]);
    const { paginatedTrucks } = this.props;

    return <TableComponent columns={this.columns} data={paginatedTrucks} />;
  }
}

export default FoodTruckTable;
