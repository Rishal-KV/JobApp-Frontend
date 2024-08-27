import React from "react";
import { NavbarDefault } from "../../components/admin/NavBar";
import { Table } from "../../components/admin/Table";
import { useSelector } from "react-redux";
function JobList() {
    const admin = useSelector((state) => state.admin)
  return (
    <div className="bg-gray-300 h-screen">
      <div className="p-3">
        <NavbarDefault />
      </div>
      <div className="p-3">
        <Table />
      </div>
    </div>
  );
}

export default JobList;
