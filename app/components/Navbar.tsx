"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import Login from "./Login";
import Register from "./Register";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import UserMenu from "./UserMenu";

type Props = { currentUser?: SafeUser | null };

const Navigation = ({ currentUser }: Props) => {
  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {currentUser ? (
          <UserMenu currentUser={currentUser} />
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link color="foreground" href="#">
                <Login />
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                <Register />
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
