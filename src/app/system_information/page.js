import { getSystemInformationData } from "@/lib/system_information";

export const metadata = {
  title: "System Information",
  description: "System Information",
};

const SystemInformationTable = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th scope="col">Unit</th>
        <th scope="col">Temperature</th>
        <th scope="col">Memory (Available/Total)</th>
      </tr>
    </thead>
    <tbody>
      {data.data.map((data) => {
        const mem_available = (data.mem.available / 1024 / 1024).toFixed(2);
        const mem_total = (data.mem.total / 1024 / 1024).toFixed(2);
        return (
          <tr key={data.unit}>
            <th scope="row">{data.unit}</th>
            <td>
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

const SystemInformation = async () => {
  const data = await getSystemInformationData();

  return (
    <div>
      <h1>System Information</h1>
      {data?.error ? (
        <div>{data.error}</div>
      ) : (
        <SystemInformationTable data={data} />
      )}
    </div>
  );
};

export default SystemInformation;
