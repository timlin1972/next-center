"use client";

import styles from "./add.module.css";
import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Add = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/users");
  }, [state?.success, router]);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <select name="isAdmin" id="isAdmin">
          <option value={false}>User</option>
          <option value={true}>Admin</option>
        </select>
        <button type="submit">Submit</button>
        {state?.error}
      </form>
    </div>
  );
};

export default Add;
