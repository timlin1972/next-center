import Link from "next/link";

import { fetchRecords } from "@/lib/data/accounting";
import styles from "./record.module.css";
import Search from "@/components/main/search/search";
import Pagination from "@/components/main/pagination/pagination";
import { deleteRecord } from "@/lib/action/accounting";

const RecordTable = ({ data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <td>Category</td>
        <td>Subcategory</td>
        <td>Account-1</td>
        <td>Account-2</td>
        <td>Amount-1</td>
        <td>Amount-2</td>
        <td>DateTime</td>
        <td>Note</td>
        <td>Tag</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {data.map((data) => {
        return (
          <tr key={data._id}>
            <Link
              className={styles.link}
              href={`/main/accounting/record/${data._id}`}
            >
              <td className={styles.category}>{data.category}</td>
              <td className={styles.subcategory}>{data.category}</td>
            </Link>
            <td>
              <div className={styles.buttons}>
                <Link href={`/main/accounting/record/${data._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteRecord}>
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

const Record = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, records } = await fetchRecords(q, page);

  return (
    <div className={styles.container}>
      {records?.error ? (
        <div>{records.error}</div>
      ) : (
        <div>
          <div className={styles.top}>
            <Search placeholder="Search for an record..." />
            <Link
              href={{
                pathname: "/main/accounting/record/add",
              }}
            >
              <button className={styles.addButton}>Add New</button>
            </Link>
          </div>
          <RecordTable data={records} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
};

export default Record;
