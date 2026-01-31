import React from "react";
import { userAuthStore } from "../stores/userAuthStore";
import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = userAuthStore((state) => state.logout);
  const user = userAuthStore((state) => state.user);
  return (
    <div
      className="position-sticky top-0  z-3 shadow-lg glass-effect "
      style={{
        borderBottom: "1px solid ",
        color: "hsla(163, 100%, 88%, 1.00)",
        // height:"10vh"
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            City Hospital
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user?.role === "Patient" && (
                <li className="ps-3">
                  <Link
                    to="/bookAppointment"
                    className="fw-bold"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Book Your Appointment
                  </Link> 
                </li>
              )}
              {user?.role === "Patient" && (
                <li className="ps-3">
                  <Link
                    to="/myAppointments"
                    className="fw-bold"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    My Appointments
                  </Link>{" "}
                </li>
              )}
               {user?.role === "Patient" && (
                <li className="ps-3">
                  <Link
                    to="/profile"
                    className="fw-bold"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    My Profile
                  </Link>{" "}
                </li>
              )}
               {user?.role === "Doctor" && (
                <li className="ps-3">
                  <Link
                    to="/doctor/appointments"
                    className="fw-bold"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    My Appointment
                  </Link>
                </li>
              )}
               {user?.role === "Doctor" && (
                <li className="ps-3">
                  <Link
                    to="/profile"
                    className="fw-bold"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Todays Appointment
                  </Link>
                </li>
              )}
            </ul>
            {user && (
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
