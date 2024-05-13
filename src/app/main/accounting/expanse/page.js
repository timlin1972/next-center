import Link from "next/link";

import { fetchExpanses } from "@/lib/data/accounting";
import styles from "./expanse.module.css";
import Search from "@/components/main/search/search";
import Pagination from "@/components/main/pagination/pagination";
import { deleteExpanse } from "@/lib/action/accounting";

const ExpanseTable = ({ data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <td>Major</td>
        <td>Minor</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {data.map((data) => {
        return (
          <tr key={`${data.major}-${data.minor}`}>
            <td className={styles.major}>
              <Link
                className={styles.link}
                href={`/main/accounting/expanse/${data._id}`}
              >
                {data.major}
              </Link>
            </td>
            <td className={styles.major}>
              <Link
                className={styles.link}
                href={`/main/accounting/expanse/${data._id}`}
              >
                {data.minor}
              </Link>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/main/accounting/expanse/${data._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteExpanse}>
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

const Expanse = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, expanses } = await fetchExpanses(q, page);

  return (
    <div className={styles.container}>
      {expanses?.error ? (
        <div>{expanses.error}</div>
      ) : (
        <div>
          <div className={styles.top}>
            <Search placeholder="Search for an expanse..." />
            <Link
              href={{
                pathname: "/main/accounting/expanse/add",
              }}
            >
              <button className={styles.addButton}>Add New</button>
            </Link>
          </div>
          <ExpanseTable data={expanses} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
};

export default Expanse;
