import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";
import { getUserSession, logoutUser } from "@/services/auth";
import LoginButtons from "./LoginButtons";
const AppBar = async () => {
  const { data } = await getUserSession(); 
  return (
    <Navbar position="static" isBordered className="h-20">
      <NavbarBrand>
        <p className="font-bold text-inherit">Blogify</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blogs">
            Blogs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        
        <LoginButtons data={data}/>


      </NavbarContent>
    </Navbar>
  );
};

export default AppBar;
