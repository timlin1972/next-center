import Link from "next/link";

import { fetchTransfers } from "@/lib/data/accounting";
import styles from "./transfer.module.css";
import Search from "@/components/main/search/search";
import Pagination from "@/components/main/pagination/pagination";
import { deleteTransfer } from "@/lib/action/accounting";

const TransferTable = ({ data }) => (
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
                href={`/main/accounting/transfer/${data._id}`}
              >
                {data.major}
              </Link>
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/main/accounting/transfer/${data._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteTransfer}>
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

const Transfer = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, transfers } = await fetchTransfers(q, page);

  return (
    <div className={styles.container}>
      {transfers?.error ? (
        <div>{transfers.error}</div>
      ) : (
        <div>
          <div className={styles.top}>
            <Search placeholder="Search for a transfer..." />
            <Link
              href={{
                pathname: "/main/accounting/transfer/add",
              }}
            >
              <button className={styles.addButton}>Add New</button>
            </Link>
          </div>
          <TransferTable data={transfers} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
};

export default Transfer;
