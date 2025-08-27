import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/login" style={{ margin: "0 10px", color: "white" }}>Login</Link>
      <Link to="/register" style={{ margin: "0 10px", color: "white" }}>Register</Link>
      <Link to="/customer" style={{ margin: "0 10px", color: "white" }}>Customer</Link>
      <Link to="/admin" style={{ margin: "0 10px", color: "white" }}>Admin</Link>
      <Link to="/agent" style={{ margin: "0 10px", color: "white" }}>Agent</Link>
    </nav>
  );
};

export default Navbar;
