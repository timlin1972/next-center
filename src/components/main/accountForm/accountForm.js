"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { updateAccount } from "@/lib/action/accounting";
import styles from "./accountForm.module.css";

const AccountForm = ({ account }) => {
  const [title, setTitle] = useState(account.title);
  const [desc, setDesc] = useState(account.desc);

  const [state, formAction] = useFormState(updateAccount, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/accounting/account");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={account._id} />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        type="text"
        name="desc"
        placeholder="desc"
        value={desc}
        rows={5}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AccountForm;
