import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getCurrentUser } from "../../lib/apiClient/auth.js";
import { getUserDetail } from "../../lib/apiClient/user.js";

import {
  Flex,
  Text,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
} from "@chakra-ui/react";

import { signOut } from "../../lib/apiClient/auth.js";
import { AuthContext } from "../../App.js";

const Header = () => {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const resUser = await getCurrentUser();
      const currentUserId = resUser.data.data.id;

      const res = await getUserDetail(currentUserId);
      setUser(res.data);
      setImage(res.data.image);
    };
    f();
  });

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
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
          <Text color="inherit" onClick={handleSignOut}>
            ログアウト
          </Text>
        );
      } else {
        return (
          <>
            <Text component={Link} to="/signin" color="inherit">
              Sign in
            </Text>
            <Text component={Link} to="/signup" color="inherit">
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
      <Box as="nav" p="5" borderBottom="1px" borderColor="gray.200">
        <Flex minWidth="max-content" alignItems="center" gap="5">
          <Heading size="md">
            <Link to="/events">Session App</Link>
          </Heading>
          <Menu>
            <MenuButton as={Button}>
              {user && (
                <Flex gap="2">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt="image"
                      borderRadius="lg"
                      width="30px"
                    />
                  ) : (
                    <Image
                      src={`${process.env.PUBLIC_URL}/user_no_image.png`}
                      alt="no image"
                      borderRadius="lg"
                      width="20px"
                    />
                  )}
                  <Text>{user.name}</Text>
                </Flex>
              )}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/mypage">マイページ</Link>
              </MenuItem>
              <MenuItem>予約一覧</MenuItem>
              <MenuItem>
                <AuthButtons />
              </MenuItem>
            </MenuList>
          </Menu>
          <Text>
            <Link to="/users">メンバー一覧</Link>
          </Text>
        </Flex>
      </Box>
      {/* <AppBar position="static" colorScheme="blue">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          ></IconButton>
        </Toolbar>
      </AppBar> */}
    </>
  );
};

export default Header;
