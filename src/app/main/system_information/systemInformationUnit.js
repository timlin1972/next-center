import { getSystemInformationData } from "@/lib/system_information";
import styles from "./system_information.module.css";

const SystemInformationTable = ({ data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <td>Unit</td>
        <td>Temperature</td>
        <td>Memory (Available/Total)</td>
      </tr>
    </thead>
    <tbody>
      {data.data.map((data) => {
        const mem_available = (data.mem.available / 1024 / 1024).toFixed(2);
        const mem_total = (data.mem.total / 1024 / 1024).toFixed(2);
        return (
          <tr key={data.unit}>
            <td className={styles.unit}>{data.unit}</td>
            <td
              className={`${
                data.cpuTemperature.main < 50 ? styles.normal : styles.abnormal
              }`}
            >
              {data.cpuTemperature.main}
              <span>&#176;</span>C
            </td>
            <td>
              {mem_available} M / {mem_total} M
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const SystemInformationUnit = async () => {
  const data = await getSystemInformationData();

  return (
    <>
      {data?.error ? (
        <div>{data.error}</div>
      ) : (
        <SystemInformationTable data={data} />
      )}
    </>
  );
};

export default SystemInformationUnit;
