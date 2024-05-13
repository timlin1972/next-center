import Link from "next/link";

import { fetchAccounts } from "@/lib/data/accounting";
import styles from "./account.module.css";
import Search from "@/components/main/search/search";
import Pagination from "@/components/main/pagination/pagination";
import { deleteAccount } from "@/lib/action/accounting";

const AccountTable = ({ data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <td>Title</td>
        <td>Description</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {data.map((data) => {
        return (
          <tr key={data.title}>
            <td className={styles.title}>
              <Link
                className={styles.link}
                href={`/main/accounting/account/${data._id}`}
              >
                {data.title}
              </Link>
            </td>
            <td>{data.desc}</td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/main/accounting/account/${data._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteAccount}>
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

const Account = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, accounts } = await fetchAccounts(q, page);

  return (
    <div className={styles.container}>
      {accounts?.error ? (
        <div>{accounts.error}</div>
      ) : (
        <div>
          <div className={styles.top}>
            <Search placeholder="Search for an account..." />
            <Link
              href={{
                pathname: "/main/accounting/account/add",
              }}
            >
              <button className={styles.addButton}>Add New</button>
            </Link>
          </div>
          <AccountTable data={accounts} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
};

export default Account;
