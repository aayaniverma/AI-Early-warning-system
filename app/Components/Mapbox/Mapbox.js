"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";

// Component to handle map fly-to animation
function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLev, flyToOptions);
    }
  }, [activeCityCords, map]);

  return null;
}

function Mapbox({ className }) { 
  const { forecast } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const activeCityCords = forecast?.coord;

  useEffect(() => {
    if (forecast && forecast.coord) {
      setLoading(false);
    }
  }, [forecast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full relative z-20">
        <h1 className="text-lg font-semibold text-gray-700">Loading Map...</h1>
      </div>
    );
  }

  if (!activeCityCords) {
    return (
      <div className="flex items-center justify-center h-full relative z-20">
        <h1 className="text-lg font-semibold text-red-600">Error: No City Coordinates</h1>
      </div>
    );
  }

  return (
    <div
      className={`relative border rounded-lg ${className}`}
      style={{ height: "100%", width: "100%", zIndex: 10 }} // Ensure map is below other components
    >
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
