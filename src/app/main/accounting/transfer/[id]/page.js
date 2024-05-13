import styles from "./transfer.module.css";
import TransferForm from "@/components/main/transferForm/transferForm";
import { getTransfer } from "@/lib/data/accounting";

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const transfer = await getTransfer(id);

  return {
    major: transfer.major,
  };
};

const Transfer = async ({ params }) => {
  const { id } = params;

  const transfer = await getTransfer(id);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <TransferForm transfer={transfer} />
      </div>
    </div>
  );
};

export default Transfer;
