import Link from "next/link";

import { fetchIncomes } from "@/lib/data/accounting";
import styles from "./income.module.css";
import Search from "@/components/main/search/search";
import Pagination from "@/components/main/pagination/pagination";
import { deleteIncome } from "@/lib/action/accounting";

const IncomeTable = ({ data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <td>Major</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {data.map((data) => {
        return (
          <tr key={`${data.major}`}>
            <td className={styles.major}>
              <Link
                className={styles.link}
                href={`/main/accounting/income/${data._id}`}
              >
                {data.major}
              </Link>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/main/accounting/income/${data._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteIncome}>
                  <input type="hidden" name="id" value={data._id} />
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </form>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const Income = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, incomes } = await fetchIncomes(q, page);

  return (
    <div className={styles.container}>
      {incomes?.error ? (
        <div>{incomes.error}</div>
      ) : (
        <div>
          <div className={styles.top}>
            <Search placeholder="Search for an income..." />
            <Link
              href={{
                pathname: "/main/accounting/income/add",
              }}
            >
              <button className={styles.addButton}>Add New</button>
            </Link>
          </div>
          <IncomeTable data={incomes} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
};

export default Income;
