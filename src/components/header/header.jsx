import React, { useContext } from "react";
import { UserContext } from "../../contexts/usercontext/userContext";

import {
  Grid,
  Button,
  ButtonGroup,
  Typography,
  Toolbar,
  Paper,
} from "@material-ui/core";

import { Link } from "react-router-dom";

function Header() {
  const { user, setuser } = useContext(UserContext); 
  return (
    <>
      <Toolbar>
        <Grid container spacing={3} justify="space-between" alignItems="center">
          <Typography variant="h6">Hype</Typography>

          <ButtonGroup disableElevation variant="contained" color="primary">
            <Link to="/checkin">
              <Button color="secondary" onClick={() => {
                  if(user.isLogin){
                    setuser({...user, isLogin: false});
                  }
              }}>{user.isLogin ? "Sing Out" : "Sing In"}</Button>
            </Link>

            <Link to="/checkup">
              <Button variant="outlined" color="secondary">
                Sing Up
              </Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Toolbar>
    </>
  );
}

export default Header;
