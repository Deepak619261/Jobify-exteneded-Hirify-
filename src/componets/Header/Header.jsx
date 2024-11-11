import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem, Button } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
  const role = user?.role || "Admin"; // Default to Admin if no role found

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setAnchorEl(null); // Close the menu
    navigate("/"); // Redirect to home page
  };

  const getInitials = () => {
    if (!user || !user.username) return "L"; // Default to 'L' for Login
    return user.username[0].toUpperCase(); // Use first letter of username
  };

  return (
    <>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" className="mr-3 h-14" alt="Logo" />
          </Link>
          <ul className="flex space-x-8 font-medium">
            {role === "Admin" && (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-orange-700">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/assessment" className="hover:text-orange-700">
                    Assessments
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-orange-700">
                    About
                  </Link>
                </li>
              </>
            )}
            {role === "Candidate" && (
              <li>
                <Link
                  to="/candidate-dashboard"
                  className="hover:text-orange-700"
                >
                  Jobs
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {user ? (
          <>
            <IconButton onClick={handleIconClick}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>{getInitials()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </>
  );
}
