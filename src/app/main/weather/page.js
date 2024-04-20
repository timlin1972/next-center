import styles from "./weather.module.css";

import { WiCelsius } from "react-icons/wi";

const datetime_str = (dateTimeStr) => {
  const dateTime = new Date(dateTimeStr);

  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const date = dateTime.getDate().toString().padStart(2, "0");

  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");

  const formattedDateTime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return formattedDateTime;
};

async function getData() {
  const res = await fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${process.env.CWA_SECRET}`,
    { cache: "no-store" }
  );

  return await res.json();
}

export const metadata = {
  title: "Weather",
  description: "Weather",
};

const WeatherUnit = ({ unit }) => {
  const weather = unit.WeatherElement;
  return (
    <div className={styles.unit}>
      <div className={styles.townName}>
        {unit.GeoInfo.CountyName} {unit.GeoInfo.TownName}
      </div>
      <div className={styles.dateTime}>
        {datetime_str(unit.ObsTime.DateTime)}
      </div>
      <br />
      {weather.Weather}
      <br />
      降雨機率: {weather.Now.Precipitation}%
      <br />
      溫度: {weather.AirTemperature}
      <WiCelsius className={styles.icon} /> (
      {weather.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature}
      <WiCelsius />~
      {weather.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature}
      <WiCelsius />)
      <br />
      濕度: {weather.RelativeHumidity}%
      <br />
      UV: {weather.UVIndex}
    </div>
  );
};

const Weather = async () => {
  const data = await getData();

  const stationIds = [
    "466881", // 新北市 新店區
    "467410", // 臺南市 中西區
  ];

  return (
    <div className={styles.container}>
      {data.records.Station.map((unit) => {
        if (stationIds.includes(unit.StationId)) {
          return <WeatherUnit key={unit.StationId} unit={unit} />;
        }
      })}
    </div>
  );
};

export default Weather;
