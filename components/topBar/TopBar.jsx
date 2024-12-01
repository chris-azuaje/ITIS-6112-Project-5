import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { withRouter, useLocation, Link } from "react-router-dom";
// import FetchModel from '../../lib/fetchModelData';
import axios from "axios";

import LogoutButton from "../logoutButton/logoutButton";

function TopBar(props) {
  const [version, setVersion] = useState("");
  const [name, setName] = useState({ f: "", l: "" });

  const location = useLocation();

  const pathname = location.pathname;
  // Extracting the user name from the pathname (if applicable)
  const userId = pathname.includes("/users/")
    ? pathname.split("/users/")[1]
    : null;
  const photo = pathname.includes("/photos/")
    ? pathname.split("/photos/")[1]
    : null;

  useEffect(() => {
    axios
      .get("/test/info")
      .then((response) => {
        const versionNumber = response.data.version;
        setVersion(versionNumber);
      })
      .catch(() => {
        console.error("Error fetching version number");
      });
  }, []);

  useEffect(() => {
    if (userId || photo) {
      axios
        .get(`/user/${userId !== null ? userId : photo}`)
        .then((response) => {
          let n = { f: response.data.first_name, l: response.data.last_name };
          setName(n);
        })
        .catch(() => {
          console.error("Error fetching name");
        });
    }
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to="/photo-share.html"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="h5" color="inherit">
            G3
          </Typography>
        </Link>
        <Typography variant="h5" color="inherit">
          {props.AppState.isLoggedIn
            ? `Hi ${props.AppState.active_user.first_name}`
            : `Please Login`}
        </Typography>
        <Typography variant="h5" color="inherit">
          {location.pathname.includes("users") &&
            `Details of ${name.f} ${name.l}`}
          {location.pathname.includes("photos") &&
            `Photos of ${name.f} ${name.l}`}
          {location.pathname.includes("favorites") &&
            `Favorites of ${name.f} ${name.l}`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="inherit" mx={2}>
            Version: {version}
          </Typography>
          <Link
            to="/favorites"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Button variant="contained" sx={{ mt: 3, mb: 2, mx: 2 }}>
              Favorites
            </Button>
          </Link>
          <LogoutButton {...props} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(TopBar);
