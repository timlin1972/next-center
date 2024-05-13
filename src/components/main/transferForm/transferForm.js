"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { updateTransfer } from "@/lib/action/accounting";
import styles from "./transferForm.module.css";

const TransferForm = ({ transfer }) => {
  const [major, setMajor] = useState(transfer.major);

  const [state, formAction] = useFormState(updateTransfer, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/accounting/transfer");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={transfer._id} />
      <input
        type="text"
        name="major"
        placeholder="Major"
        value={major}
        onChange={(e) => {
          setMajor(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransferForm;
