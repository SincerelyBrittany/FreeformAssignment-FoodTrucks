import React from "react";
import { Route, Routes } from "react-router-dom";
import FoodTrucks from "../components/foodTrucks/FoodTrucks";
import Map from "../components/map/Map";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<FoodTrucks />}></Route>
    {/* <Route path="/map" element={<Map />}></Route> */}
    <Route path="/map/:location" element={<Map />}></Route>
  </Routes>
);

export default RoutesComponent;
