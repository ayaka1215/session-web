import { Box } from "@chakra-ui/react";
import React from "react";
import Header from "../layout/Header.jsx";

const Common = ({ children }) => {
  return (
    <>
      <Header />
      <Box margin="auto" maxWidth="1000px" paddingTop="50px">
        {children}
      </Box>
    </>
  );
};

export default Common;
