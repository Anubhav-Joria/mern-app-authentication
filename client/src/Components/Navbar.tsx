import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function ButtonAppBar() {


  const navigate = useNavigate();
  const handleLogout = async () => {
    sessionStorage.removeItem("token");
      navigate("/auth");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar  sx={{display:"flex", flexDirection:"row-reverse"}} >
          <Button onClick={handleLogout} color="inherit" >
            Logout <LogoutIcon/>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
