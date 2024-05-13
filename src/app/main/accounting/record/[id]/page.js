import styles from "./account.module.css";
import AccountForm from "@/components/main/accountForm/accountForm";
import { getAccount } from "@/lib/data/accounting";

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const account = await getAccount(id);

  return {
    title: account.title,
    description: account.desc,
  };
};

const Account = async ({ params }) => {
  const { id } = params;

  const account = await getAccount(id);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <AccountForm account={account} />
      </div>
    </div>
  );
};

export default Account;
