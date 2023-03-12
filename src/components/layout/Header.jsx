import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Flex, Text, Box, Heading } from "@chakra-ui/react";

import { signOut } from "../../lib/apiClient/auth.js";
import { AuthContext } from "../../App.js";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none",
  },
}));

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <Text
            color="inherit"
            className={classes.linkBtn}
            onClick={handleSignOut}
          >
            Sign out
          </Text>
        );
      } else {
        return (
          <>
            <Text
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign in
            </Text>
            <Text
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign Up
            </Text>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <AppBar position="static" colorScheme="blue">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Flex minWidth="max-content" alignItems="center" gap="5">
            <Heading size="md">
              <Link to="/events">Session App</Link>
            </Heading>
            <Text>
              <Link to="/mypage">マイページ</Link>
            </Text>
            <Text>予約一覧</Text>
            <Text>
              <Link to="/users">メンバー一覧</Link>
            </Text>
            <AuthButtons />
          </Flex>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
