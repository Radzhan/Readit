import React from "react";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import UserMenu from "../../features/Menu/UserMenu";
import AnonMenu from "../../features/Menu/AnonMenu";
const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const Navbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Forum</Link>
          </Typography>
          <Grid item>{user ? <UserMenu user={user} /> : <AnonMenu />}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
