"use client";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import Clock from "react-live-clock";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pathname.split("/").pop().replace("_", " ")}
      </div>
      <div className={styles.menu}>
        {isClient && <Clock format={"h:mm:ssa"} ticking={true} />}
      </div>
    </div>
  );
};

export default Navbar;
