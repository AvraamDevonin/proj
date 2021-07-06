import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/usercontext/userContext";
import RoomSideBar from "./roomSideBar";
import Settings from './settings/settings';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { makeStyles, Container, Grid, Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({}));

function Room() {
  const { user, setuser } = useContext(UserContext);
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={3}>
        <RoomSideBar />

        <Grid item sm={9} md={9}>
            <Switch>
            <Route path="/room/settings">
                <Settings />
            </Route>
            </Switch>
      </Grid>

      </Grid>

      
    </Container>
  );
}

export default Room;
