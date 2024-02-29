'use client'

import { ModeToggle } from "@/components/theme/mode-toggle";
import { RiLogoutBoxLine } from 'react-icons/ri';  // Importa el ícono de logout
import styles from "../sidebar.module.css";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const UserData = ({ rol, username, avatar }: { rol: string, username: string, avatar: string }) => {
  const usernameFormat = username.slice(0, 2).toUpperCase()
  return (
    <>
      <Avatar>
        <AvatarImage src={avatar} alt="@shadcn" />
        <AvatarFallback className="ml-2 mt-2">{usernameFormat}</AvatarFallback>
      </Avatar>
      <div className={styles.userDetail}>
        <span className={styles.username}>{username}</span>
        <span className={styles.userTitle}>
          {rol}
        </span>
      </div>
      <div className={styles.userActions}>
        <RiLogoutBoxLine className={styles.logoutIcon} />
        <ModeToggle />
      </div>
    </>
  );
};

