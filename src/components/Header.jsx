import React from "react";
import ChecklistTwoToneIcon from "@mui/icons-material/ChecklistTwoTone";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

function Header({
  onLogout,
  showLogout = false,
  darkMode,
  onToggleDarkMode
}) {
  return (
    <header>
      <h1>
        <ChecklistTwoToneIcon fontSize="large" />
        Keeper
      </h1>

      <div className="header-actions">
        <button
          type="button"
          className="theme-button"
          onClick={onToggleDarkMode}
        >
          {darkMode ? <LightModeOutlinedIcon/> : <DarkModeOutlinedIcon/> }
          {darkMode ? "Light Mode" : "Dark Mode"}

        </button>
    
        {showLogout && (
          <button
            type="button"
            className="logout-button"
            onClick={onLogout}
          >
            <LogoutOutlinedIcon/>
             logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
