import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
//import LogoutIcon from "@mui/icons-material/";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import "./Header.css";
import Logo2 from "../../Assets/Logo2.svg";

const Header = () => {
  const navigate = useNavigate;

  function clearStorage() {
    window.localStorage.clear();
    window.location.reload();
    navigate("/home");
  }

  return (
    <header className="header">
      <nav className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-btn">
          <label htmlFor="nav-check" aria-label="">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <img src={Logo2} alt="Groupomania" className="logo" />
          <a href="/dashboard">
            <HomeOutlinedIcon fontSize="small" className="nav-icon" />
            Home
          </a>
          <a href="api/users">
            <PeopleAltOutlinedIcon
              sx={{}}
              fontSize="small"
              className="nav-icon"
            />
            Membres
          </a>
          <a href="/profile">
            <AccountCircleOutlinedIcon fontSize="small" className="nav-icon" />
            Profile
          </a>
          <a href="/newpost">
            <DriveFileRenameOutlineOutlinedIcon
              fontSize="small"
              className="nav-icon"
            />
            Poster
          </a>
          <Button
            onClick={clearStorage}
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#4a4aa3" }}
            startIcon={<LogoutOutlinedIcon />}
            aria-label="se déconnecter"
          >
            Déconnexion
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
