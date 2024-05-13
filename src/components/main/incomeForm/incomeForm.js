"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { updateIncome } from "@/lib/action/accounting";
import styles from "./incomeForm.module.css";

const IncomeForm = ({ income }) => {
  const [major, setMajor] = useState(income.major);

  const [state, formAction] = useFormState(updateIncome, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/accounting/income");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={income._id} />
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

export default IncomeForm;
