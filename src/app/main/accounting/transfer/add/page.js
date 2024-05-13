"use client";

import { addTransfer } from "@/lib/action/accounting";
import styles from "./add.module.css";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Add = ({ searchParams }) => {
  const [state, formAction] = useFormState(addTransfer, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/accounting/transfer");
  }, [state?.success, router]);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        <input type="hidden" name="userId" value={searchParams.userId} />
        <input type="text" name="major" placeholder="Major" />
        <button>Add</button>
        {state?.error}
      </form>
    </div>
  );
};

export default Add;
