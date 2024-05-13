import styles from "./income.module.css";
import IncomeForm from "@/components/main/incomeForm/incomeForm";
import { getIncome } from "@/lib/data/accounting";

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const income = await getIncome(id);

  return {
    major: income.major,
  };
};

const Income = async ({ params }) => {
  const { id } = params;

  const income = await getIncome(id);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <IncomeForm income={income} />
      </div>
    </div>
  );
};

export default Income;
