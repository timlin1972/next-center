const si = require("systeminformation");

export const getSystemInformationData = async () => {
  try {
    const si_cpuTemperature = await si.cpuTemperature();
    const si_mem = await si.mem();

    return {
      data: [
        {
          unit: "Self",
          cpuTemperature: si_cpuTemperature,
          mem: si_mem,
        },
      ],
    };
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};
