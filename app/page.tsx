"use client";
import AirPollution from "./Components/AirPollution/AirPollution";
import Humidity from "./Components/Humidity/Humidity";
import Mapbox from "./Components/Mapbox/Mapbox";
import Navbar from "./Components/Navbar";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import UvIndex from "./Components/UvIndex/UvIndex";
import Wind from "./Components/Wind/Wind";
import { useGlobalContextUpdate } from "./context/globalContext";
import { useState } from "react";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [userLocation, setUserLocation] = useState(""); // Track user location

  const getClickedCityCords = ([lat, lon]) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar onLocationChange={setUserLocation} />

      {/* Display the user location if available */}
      {userLocation && (
        <div className="user-location">
          <h3>User Location</h3>
          <p>{userLocation}</p>
        </div>
      )}

      {/* Two-column layout with Temperature and Mapbox */}
      <div className="pb-4 flex flex-col gap-4 md:flex-row md:items-stretch">
        {/* Left: Temperature block with full height */}
        <div className="w-full md:w-[50%]">
          <Temperature className="w-full h-full" />
        </div>

        {/* Right: Mapbox */}
        <div className="w-full md:w-[50%]">
          <Mapbox className="w-full h-full" />
        </div>
      </div>

      {/* Central Section: Other Weather Information */}
      <div className="flex flex-col items-center gap-4">
        {/* Grid layout for other weather information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 w-full max-w-5xl">
          <AirPollution />
          <Sunset />
          <Wind />
        </div>

        {/* Centered UvIndex and Humidity at the bottom */}
        <div className="flex justify-center gap-4 w-full max-w-5xl">
          <UvIndex />
          <Humidity />
        </div>
      </div>
    </main>
  );
}
