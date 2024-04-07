import Search from "@/components/main/search/search";
import styles from "./users.module.css";
import Link from "next/link";
import Pagination from "@/components/main/pagination/pagination";
import { fetchUsers } from "@/lib/data";
import { deleteUser } from "@/lib/action";

export const metadata = {
  title: "Users",
  description: "Users",
};

const Users = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/main/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/main/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </thead>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default Users;
