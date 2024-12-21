import React from 'react';
import AdminNavbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="Admin w-full px-0 mb-0">
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout