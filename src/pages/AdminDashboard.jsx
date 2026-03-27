import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Admin Dashboard</h2>

      {/* Stats Row */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Total Farmers</h5>
            <p className="fs-4 fw-bold text-primary">120</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Total Buyers</h5>
            <p className="fs-4 fw-bold text-success">120</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Total Products</h5>
            <p className="fs-4 fw-bold text-warning">50</p>
          </div>
        </div>
      </div>

      {/* Management Links */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4>Manage Farmers</h4>
            <p>Approve, block or edit farmer accounts.</p>
            <Link to="/admin/farmers" className="btn btn-primary w-100">
              View Farmers
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4>Manage Buyers</h4>
            <p>View customer details and orders.</p>
            <Link to="/admin/customers" className="btn btn-success w-100">
              View Customers
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4>Manage Products</h4>
            <p>Approve and monitor products from farmers.</p>
            <Link to="/admin/products" className="btn btn-warning w-100">
              View Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
