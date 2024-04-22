import styles from "./weather.module.css";

import { WiCelsius } from "react-icons/wi";
import {
  WiCloud,
  WiNa,
  WiCloudy,
  WiDayHaze,
  WiDayRain,
  WiDayThunderstorm,
  WiDaySunny,
} from "react-icons/wi";

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

async function getData(key) {
  const res = await fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${key}?Authorization=${process.env.CWA_SECRET}`,
    { cache: "no-store" }
  );

  return await res.json();
}

export const metadata = {
  title: "Weather",
  description: "Weather",
};

const getWeather = (weather) => {
  switch (weather) {
    case "陰":
      return (
        <span className={styles.icon}>
          <WiCloud />
        </span>
      );
    case "多雲":
      return (
        <span className={styles.icon}>
          <WiCloudy />
        </span>
      );
    case "陰有靄":
      return (
        <span className={styles.icon}>
          <WiDayHaze />
        </span>
      );
    case "陰有雨":
      return (
        <span className={styles.icon}>
          <WiDayRain />
        </span>
      );

    case "短暫陣雨或雷雨":
      return (
        <span className={styles.icon}>
          <WiDayThunderstorm />
        </span>
      );
    case "晴":
      return (
        <span className={styles.icon}>
          <WiDaySunny />
        </span>
      );
    default:
      return weather;
  }
};

const WeatherCurrentTable = ({ unit }) => {
  const weather = unit.WeatherElement;
  return (
    <tr>
      <td key="地區">
        {unit.GeoInfo.CountyName} {unit.GeoInfo.TownName}
        <div className={styles.dateTime}>
          {datetime_str(unit.ObsTime.DateTime)}
        </div>
      </td>
      <td key="天氣">{getWeather(weather.Weather)}</td>
      <td key="降雨機率">{weather.Now.Precipitation}%</td>
      <td key="溫度">
        {weather.AirTemperature}
        <WiCelsius className={styles.icon} /> (
        {weather.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature}
        <WiCelsius />~
        {weather.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature}
        <WiCelsius />)
      </td>
      <td key="UV">{weather.UVIndex}</td>
    </tr>
  );
};

const getHours = (dateTimeStr) => dateTimeStr.substring(11, 13);

const WeatherForcastUnitTable = ({ element, unit, count }) => {
  let timeTable = [];
  for (let i = 0; i < count; i++) {
    timeTable.push(
      <td key={element.time[i].startTime}>
        {getHours(element.time[i].startTime)}
      </td>
    );
  }
  let valueTable = [];
  for (let i = 0; i < count; i++) {
    let value = element.time[i].elementValue[0].value;
    if (element.elementName == "Wx") {
      value = getWeather(element.time[i].elementValue[0].value);
    }
    valueTable.push(
      <td key={element.time[i].startTime}>
        {value}
        {unit}
      </td>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>{timeTable.map((time) => time)}</tr>
      </thead>
      <tbody>
        <tr>{valueTable.map((value) => value)}</tr>
      </tbody>
    </table>
  );
};

const WeatherForcastUnitTable2 = ({ element, unit, count }) => {
  let timeTable = [];
  for (let i = 0; i < count; i++) {
    timeTable.push(
      <td key={element.time[i].dataTime}>
        {getHours(element.time[i].dataTime)}
      </td>
    );
  }
  let valueTable = [];
  for (let i = 0; i < count; i++) {
    valueTable.push(
      <td key={element.time[i].dataTime}>
        {element.time[i].elementValue[0].value}
        {unit}
      </td>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>{timeTable.map((time) => time)}</tr>
      </thead>
      <tbody>
        <tr>{valueTable.map((value) => value)}</tr>
      </tbody>
    </table>
  );
};

const WeatherForcastUnit = ({ locationsName, location }) => {
  return (
    <div className={styles.unit} key={locationsName}>
      <div className={styles.townName}>
        {locationsName} {location.locationName}
      </div>
      {location.weatherElement.map((element) => {
        if (element.elementName == "PoP6h") {
          return (
            <div key="PoP6h">
              <div className={styles.subtitle}>降雨機率</div>
              <WeatherForcastUnitTable element={element} unit="%" count={4} />
            </div>
          );
        }
        if (element.elementName == "Wx") {
          return (
            <div key="Wx">
              <div className={styles.subtitle}>天氣現象</div>
              <WeatherForcastUnitTable element={element} unit="" count={8} />
            </div>
          );
        }
        if (element.elementName == "T") {
          return (
            <div key="T">
              <div className={styles.subtitle}>溫度</div>
              <WeatherForcastUnitTable2
                element={element}
                unit=<WiCelsius />
                count={8}
              />
            </div>
          );
        }
      })}
      <hr />
    </div>
  );
};

const Weather = async () => {
  const dataCurrent = await getData("O-A0003-001"); // get current
  const dataForecastRow = [];
  dataForecastRow.push(await getData("F-D0047-069")); // get forecast 新北市
  dataForecastRow.push(await getData("F-D0047-077")); // get forecast 臺南市

  const stationIds = [
    "466881", // 新北市 新店區
    "467410", // 臺南市 中西區
  ];

  const locationNames = [
    {
      locationsName: "新北市",
      locationName: "新店區",
    },
    {
      locationsName: "臺南市",
      locationName: "北區",
    },
  ];

  const dataForecast = [];
  dataForecastRow.map((unit) => {
    locationNames.map((locationName) => {
      if (
        unit.records.locations[0].locationsName == locationName.locationsName
      ) {
        unit.records.locations[0].location.map((location) => {
          if (location.locationName == locationName.locationName) {
            dataForecast.push({
              locationsName: unit.records.locations[0].locationsName,
              location,
            });
          }
        });
      }
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>現在天氣</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td key="地區">地區</td>
            <td key="天氣">天氣</td>
            <td key="降雨機率">降雨機率</td>
            <td key="溫度">溫度</td>
            <td key="UV">UV</td>
          </tr>
        </thead>
        <tbody>
          {dataCurrent.records.Station.map((unit) => {
            if (stationIds.includes(unit.StationId)) {
              return <WeatherCurrentTable key={unit.StationId} unit={unit} />;
            }
          })}
        </tbody>
      </table>
      <hr />
      <div className={styles.title}>未來天氣</div>
      {dataForecast.map((unit) => {
        return (
          <WeatherForcastUnit
            key={`${unit.locationsName}${unit.location}`}
            locationsName={unit.locationsName}
            location={unit.location}
          />
        );
      })}
    </div>
  );
};

export default Weather;
