"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { updateExpanse } from "@/lib/action/accounting";
import styles from "./expanseForm.module.css";

const ExpanseForm = ({ expanse }) => {
  const [major, setMajor] = useState(expanse.major);
  const [minor, setMinor] = useState(expanse.minor);

  const [state, formAction] = useFormState(updateExpanse, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/accounting/expanse");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={expanse._id} />
      <input
        type="text"
        name="major"
        placeholder="Major"
        value={major}
        onChange={(e) => {
          setMajor(e.target.value);
        }}
      />
      <input
        type="text"
        name="minor"
        placeholder="minor"
        value={minor}
        onChange={(e) => {
          setMinor(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExpanseForm;
