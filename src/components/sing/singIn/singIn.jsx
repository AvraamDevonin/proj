import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../contexts/usercontext/userContext";
import singIn from '../../../servises/sing/singIn';

import validator from "validator";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 100px)",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function SingIn() {
  const classes = useStyles();
  let history = useHistory();

  const { user, setuser } = useContext(UserContext);
  const [isValidate, setisValidate] = useState({
      email: true,
      password: true
  });
  const [isLogin, setIsLogin] = useState(true);

  function handlerSend() {
    const isEmail = validator.isEmail(user.email);
    const isPass = validator.isStrongPassword(user.password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    });
  
    if (!isEmail || !isPass) {
        setisValidate({
            email: isEmail,
            password: isPass
        })
        return;
    }
    const userForSend = {
        email: user.email,
        password: user.password
    }
    singIn(userForSend, (data) => {

      if(data.name){
        setuser({...user, name: data.name.replaceAll(`"`, ""), isLogin: true });
        history.push("/room");
      }
      else{
        setIsLogin(false);
      }
    })
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Container>
          <Grid
            className={classes.root}
            container
            alignItems="center"
            direction="column"
          >
            <Box mt={3}>
              <Avatar
                alt="Remy Sharp"
                src="./assets/img/ava.jpg"
                className={classes.large}
              />
            </Box>

            <Box width={300} m={1}>
              <div align="center">{"To come in"}</div>
            </Box>

            <Box width={300} m={1}>
              <TextField
                fullWidth={true}
                required
                id="filled-email"
                label="Email"
                variant="outlined"
                value={user.email}
                error={isValidate.email === false || !isLogin}
                onChange={({ target }) =>
                  setuser({ ...user, email: target.value })
                }
              />
            </Box>
            <Box width={300} m={1}>
              <TextField
                required
                fullWidth={true}
                id="filled-password-input"
                label="Password"
                type="password"
                variant="outlined"
                error={isValidate.password === false || !isLogin}
                value={user.password}
                onChange={({ target }) =>
                  setuser({ ...user, password: target.value })
                }
              />
            </Box>

            <Box width={300} m={1}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handlerSend}
              >
                sing in
              </Button>
            </Box>
          </Grid>
        </Container>
      </form>
    </>
  );
}

export default SingIn;
