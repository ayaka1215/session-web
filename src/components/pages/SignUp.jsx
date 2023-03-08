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
import { signUp } from "../../lib/apiClient/auth.js";

const SignUp = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);

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
                Sign Up
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account?</Text>
                <Button variant="link" colorScheme="blue">
                  <Link to="/signin">Sign In</Link>
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                border="1px"
                id="name"
                type="name"
                required
                value={name}
                margin="dense"
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                border="1px"
                id="email"
                type="email"
                variant="outlined"
                required
                value={email}
                margin="dense"
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="name">Password</FormLabel>
              <Input
                border="1px"
                variant="outlined"
                required
                type="password"
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Password Confirmation</FormLabel>
              <Input
                border="1px"
                variant="outlined"
                required
                type="password"
                value={passwordConfirmation}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
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
                Sign up
              </Button>
            </Stack>
          </Stack>
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

export default SignUp;
