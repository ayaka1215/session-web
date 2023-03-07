import { Link } from "react-router-dom";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import React from "react";
import Header from "../layout/Header.jsx";

const Common = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ margin: "auto", maxWidth: "1000px", paddingTop: "50px" }}>
        {children}
      </div>
    </>
  );
};

export default Common;
