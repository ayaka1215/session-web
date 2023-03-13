import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

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
  const { currentUser } = useContext(AuthContext);
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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
              {currentUser && (
                <Flex gap="2">
                  {currentUser.image?.url ? (
                    <Image
                      src={currentUser.image.url}
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
                  <Text>{currentUser.name}</Text>
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
          {currentUser.is_admin && (
            <Text>
              <Link to="/users">メンバー一覧</Link>
            </Text>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Header;
