import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Container,
  Link,
} from "@chakra-ui/react";

import { AuthContext } from "../../App.js";
import AlertMessage from "../utils/AlertMessage.jsx";
import { signIn } from "../../lib/apiClient/auth.js";

const SignIn = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/events");
        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size="lx" as="h2">
                Sign In
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <a href="/signup">Sign Up now!</a>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg-surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    border="1px"
                    id="email"
                    type="email"
                    variant="outlined"
                    required
                    label="Email"
                    value={email}
                    margin="dense"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    border="1px"
                    id="password"
                    variant="outlined"
                    required
                    label="Password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    margin="dense"
                    autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
                <Stack spacing="6">
                  <Button
                    type="submit"
                    size="large"
                    colorScheme="teal"
                    fullWidth
                    onClick={handleSubmit}
                    mt="5"
                    py="3"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  );
};

export default SignIn;
