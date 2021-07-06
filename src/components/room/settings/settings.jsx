import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/usercontext/userContext";
import {
  makeStyles,
  Button,
  Container,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@material-ui/core";
import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  avatar: {
    maxWidth: 400,
    height: "100vh",
    "& img": {
      width: "100%",
      height: "auto",
    },
  },
  saveBtn: {
    color: theme.palette.warning.main,
    marginLeft: '1rem'
  },
}));

function Settings() {
  const classes = useStyles();

  const { user, setuser } = useContext(UserContext);
  const [isUnloadAvatar, setisUnloadAvatar] = useState(false);

  function handleCapture({ target }) {
    const fileReader = new FileReader();
    try {
        const types = ["image/png", "image/jpeg", "image/gif"];
        if (types.every((type) => target.files[0].type !== type)) {
          //todo проверить на тип файла (аватарки)
          return;
        }
      fileReader.readAsDataURL(target.files[0]);
      fileReader.onload = (e) => {
        // console.log(e.target.result);
        setisUnloadAvatar(true);
        setuser({ ...user, avatar: e.target.result });
      };
    } catch (e) {
      console.log(e);
    }
  }

  function sendAva() {

    const f = new FormData();

    const ava = user.avatar;

    f.append('file', ava);

    console.log(f);

      fetch("http://localhost:3030/room/settings/avatar", {
          method: "POST",
          headers: {'Content-Type': 'multipart/form-data'},  
          body: f
      }).then((res, req) => console.log(res))
  }

  return (
    <Grid container className={classes.root}>
      <Grid item sm={12}>
        <Box m={3}>
          <Button variant="contained" component="label" color="primary">
            Ваше фото
            <input
              type="file"
              hidden
              accept="image/*"
              name="file"
              onChange={handleCapture}
            />
          </Button>
          {isUnloadAvatar ? (
            <Button className={classes.saveBtn} onClick={sendAva}> Сохранить </Button>
          ) : (
            ""
          )}
        </Box>

        {user.avatar ? (
          <Box className={classes.avatar} m={3}>
            <Image cover src={user.avatar} />
          </Box>
        ) : (
          ""
        )}

<form action="http://localhost:3030/room/settings/avatar" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
  <input type="submit" value="swend" />
</form>
      </Grid>
    </Grid>
  );
}

export default Settings;
