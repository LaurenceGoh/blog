"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import SearchIcon from "@/components/Icons/SearchIcon";

const Search = ({setSearchFilter} : {setSearchFilter : any}) => {
  
  return (
    <>
      <Input
        type="search"
        className="px-12 py-10 max-w-[500px] flex self-center"
        placeholder="Search by title"
        onValueChange={setSearchFilter}
        size="lg"
        startContent={<SearchIcon />}
      />
    </>
  );
};

export default Search;
