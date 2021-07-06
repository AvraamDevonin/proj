import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/usercontext/userContext";
import { Link } from "react-router-dom";

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

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import InputOutlinedIcon from "@material-ui/icons/InputOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  listInv: {
    width: "100%",
    // backgroundColor: theme.palette.secondary.dark,
  },
  listInv_item: {
    color: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.secondary.contrastText,
      color: theme.palette.secondary.main,
      "& div": {
        "& svg": {
          color: theme.palette.secondary.main,
        },
      },
    },
  },
  fullWidth: {
    width: "100%",
    justifyContent: "flex-start",

    "& svg": {
      marginRight: "2rem",
    },
  },
  rotateIco: {
    transform: "rotate(180deg)",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function RoomSideBar() {
  const classes = useStyles();

  return (
    <>
      <Grid item sm={3} md={3} className={classes.root}>
        <Box display="flex" justifyContent="center" mt={3} mb={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg"
            className={classes.avatar}
          />
        </Box>

        <Box mb={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.fullWidth}
            justify="flex-start"
          >
            <InputOutlinedIcon /> Сделать вклад
          </Button>
        </Box>

        <Box mb={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.fullWidth}
          >
            <InputOutlinedIcon className={classes.rotateIco} /> Вывести средства
          </Button>
        </Box>

        <Box>
          <List
            aria-label="contacts"
            className={classes.listInv}
            justifyContent="center"
          >
            <ListItem button className={classes.listInv_item}>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Ваш профиль" />
            </ListItem>

            <ListItem button className={classes.listInv_item}>
              <ListItemText inset primary="Ваши вклады" />
            </ListItem>
            <ListItem button className={classes.listInv_item}>
              <ListItemText inset primary="История вкладов" />
            </ListItem>
            <ListItem button className={classes.listInv_item}>
              <ListItemText inset primary="История вывода" />
            </ListItem>
            <ListItem button className={classes.listInv_item}>
              <ListItemText inset primary="История доходов" />
            </ListItem>
            <ListItem button className={classes.listInv_item}>
              <ListItemText inset primary="Ваши партнёры" />
            </ListItem>
            <ListItem button className={classes.listInv_item}>
              <ListItemText inset primary="Рекламные материалы" />
            </ListItem>

            <Link to="/room/settings">
              <ListItem button className={classes.listInv_item}>
                <ListItemText inset primary="Натройки" />
              </ListItem>
            </Link>

            <ListItem button className={classes.listInv_item}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          </List>
        </Box>
      </Grid>
    </>
  );
}

export default RoomSideBar;
