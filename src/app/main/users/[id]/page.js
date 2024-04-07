import styles from "./user.module.css";
import { getUser } from "@/lib/data";
import { updateUser } from "@/lib/action";

const User = async ({ params }) => {
  const { id } = params;
  const user = await getUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{user.username}</div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>
              Yes
            </option>
            <option value={false} selected={!user.isAdmin}>
              No
            </option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default User;
