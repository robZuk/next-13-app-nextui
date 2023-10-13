import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { BiLogOut } from "react-icons/bi";

type Props = { currentUser?: SafeUser | null };

export default function UserMenu({ currentUser }: Props) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  console.log(currentUser);

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          name={currentUser?.name as string}
          description={currentUser?.email as string}
          avatarProps={{ src: currentUser?.image as string }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="light">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<BiLogOut className={iconClasses} />}
          onClick={() => signOut()}
        >
          Logout
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
