"use client";
import { logoutUser } from "@/services/auth";
import { NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const LoginButtons = ({ data }: { data: any }) => {
    
  const router = useRouter();
  const handleClick = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <>
      {data.user ? (
        <>
          <NavbarItem>
            <Button color="primary" onPress={handleClick} variant="flat">
              Logout
            </Button>
          </NavbarItem>
        </>
      ) : (
        <>
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
    </>
  );
};

export default LoginButtons;
