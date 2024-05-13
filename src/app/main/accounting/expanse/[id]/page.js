import styles from "./expanse.module.css";
import ExpanseForm from "@/components/main/expanseForm/expanseForm";
import { getExpanse } from "@/lib/data/accounting";

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const expanse = await getExpanse(id);

  return {
    major: expanse.major,
    minor: expanse.minor,
  };
};

const Expanse = async ({ params }) => {
  const { id } = params;

  const expanse = await getExpanse(id);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <ExpanseForm expanse={expanse} />
      </div>
    </div>
  );
};

export default Expanse;
