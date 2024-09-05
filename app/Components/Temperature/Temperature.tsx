"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

// Define types for forecast and weather
interface Weather {
  main: string;
  description: string;
}

interface Forecast {
  main?: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  timezone?: number;
  name?: string;
  weather?: Weather[];
}

interface TemperatureProps {
  className?: string;
}

const Temperature: React.FC<TemperatureProps> = ({ className }) => {
  const { forecast } = useGlobalContext();

  // Destructure and handle default values
  const { main = {}, timezone = 0, name = "", weather = [] } = forecast || {};
  const { temp, temp_min, temp_max } = main;

  if (!forecast || !weather.length) {
    return <div>Loading...</div>;
  }

  const tempCelsius = kelvinToCelsius(temp);
  const minTempCelsius = kelvinToCelsius(temp_min);
  const maxTempCelsius = kelvinToCelsius(temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain = "", description = "" } = weather[0] || {};

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className={`pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between bg-green-200 text-blue-800 shadow-lg ${className}`}
    >
      <p className="flex justify-between items-center text-lg">
        <span className="font-semibold">{currentDay}</span>
        <span className="font-semibold">{localTime}</span>
      </p>
      <p className="pt-2 text-2xl font-bold flex gap-1 items-center">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-7xl font-extrabold self-center">{tempCelsius}°</p>

      <div>
        <div className="flex items-center gap-2">
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-xl font-semibold">{description}</p>
        </div>
        <p className="flex items-center gap-2 text-lg">
          <span>Low: {minTempCelsius}°</span>
          <span>High: {maxTempCelsius}°</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
