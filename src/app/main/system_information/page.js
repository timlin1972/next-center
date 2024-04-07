import SystemInformationUnit from "./systemInformationUnit";
import styles from "./system_information.module.css";

export const metadata = {
  title: "System Information",
  description: "System Information",
};

const SystemInformation = async () => {
  return (
    <div className={styles.container}>
      <SystemInformationUnit />
    </div>
  );
};

export default SystemInformation;
