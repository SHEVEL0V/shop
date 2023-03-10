/** @format */
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function BtnSearch({ onClick, children }) {
  return (
    <Button variant="contained" endIcon={<SearchIcon />} onClick={onClick}>
      {children}
    </Button>
  );
}
