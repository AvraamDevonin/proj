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

import singUp from "../../../servises/sing/singUp";
import singUpConfirm from "../../../servises/sing/singUpConfirm";
import singUpDeleteTmpCode from "../../../servises/sing/singUpDeleteTmpCode";

import validator from "validator";
import LinearDeterminate from "../../progress/progress";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 100px)",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function SingUp() {
  const classes = useStyles();
  let history = useHistory();

  const { user, setuser } = useContext(UserContext);
  const [valid, setvalid] = useState({
    name: 0,
    email: 0,
    password: 0,
  });

  const [isExistsEmail, setIsExistsEmail] = useState(false);
  const [isConfirm, setIsConfirm] = useState(0);
  const [code, setCode] = useState("");
  const [isTimeOut, setisTimeOut] = useState(false);

  useEffect(() => {
    if (isTimeOut) {
      setisTimeOut(false);
      setIsConfirm(2);
    }
  }, [isTimeOut]);

  function handlerSend(e) {
    console.log("USER : ", user);

    const userSend = {
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
    };
    setuser(userSend);

    const isName = validator.isAlpha(userSend.name);
    const isEmail = validator.isEmail(userSend.email);
    const isPass = validator.isStrongPassword(userSend.password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    });

    setvalid({
      name: isName,
      email: isEmail,
      password: isPass,
    });

    if (!userSend.name || !userSend.email || !userSend.password) return;

    switch (isConfirm) {
      case 0:
        singUp(userSend, (data) => {
          if (data.isExtM) {
            setIsExistsEmail(true);

          } else if (data.isSend) {
            setIsConfirm(1);
          }
        });
        break;
      case 1:
        singUpConfirm({ ...userSend, c: code }, (confirm) => {
          if (confirm) {
            new Promise(() => {
              singUpDeleteTmpCode(userSend, (isSend) => {
                if (isSend) {
                  setuser({ ...user, isLogin: true });
                  history.push("/room");
                }
              });
            });
          }
        });
        break;
      case 2:
        // repeat
        singUpDeleteTmpCode(userSend, (isSend) => {
          if (isSend) {
            singUp(userSend, () => {
              setIsConfirm(1);
            });
          }
        });

        break;
      default:
        break;
    }
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
              <div align="center">{"Check in"}</div>
            </Box>

            <Box width={300} m={1}>
              <TextField
                required
                fullWidth={true}
                id="filled-required"
                label="Name"
                variant="outlined"
                error={valid.name === false}
                value={user.name}
                onChange={({ target }) =>
                  setuser({ ...user, name: target.value })
                }
              />
            </Box>
            <Box width={300} m={1}>
              <TextField
                fullWidth={true}
                required
                id="filled-email"
                label="Email"
                variant="outlined"
                error={valid.email === false}
                value={user.email}
                onChange={({ target }) =>
                  setuser({ ...user, email: target.value })
                }
              />
            </Box>
            <Box width={300} m={1}>
              <p> {isExistsEmail ? "This mail is already registered" : ""} </p>
            </Box>
            <Box width={300} m={1}>
              <TextField
                required
                fullWidth={true}
                id="filled-password-input"
                label="Password (min 8 symb)"
                type="password"
                variant="outlined"
                error={valid.password === false}
                value={user.password}
                onChange={({ target }) =>
                  setuser({ ...user, password: target.value })
                }
              />
            </Box>

            {isConfirm === 1 ? (
              <>
                <Box width={300} m={1}>
                  <p>Check your mail</p>
                </Box>
                <Box width={300} m={1}>
                  <TextField
                    required
                    fullWidth={true}
                    id="filled-password-input"
                    label="Confirm Code"
                    type="text"
                    variant="outlined"
                    value={code}
                    onChange={({ target }) => setCode(target.value)}
                  />
                </Box>

                <Box width={300} m={1}>
                  <LinearDeterminate setisTimeOut={setisTimeOut} />
                </Box>
              </>
            ) : (
              ""
            )}

            <Box width={300} m={1}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handlerSend}
              >
                {isConfirm === 0
                  ? "Password confirmation"
                  : isConfirm === 2 && setisTimeOut
                  ? "Repeat"
                  : "Check In"}
              </Button>
            </Box>
          </Grid>
        </Container>
      </form>
    </>
  );
}

export default SingUp;
