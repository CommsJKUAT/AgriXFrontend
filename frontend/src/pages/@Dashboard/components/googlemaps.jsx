import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapboxComponent = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null }); // Ground station
  const [allCoordinates, setAllCoordinates] = useState([]); // To store all coordinates
  const [map, setMap] = useState(null);
  const [latestMarker, setLatestMarker] = useState(null); // To store the latest marker
  const [groundStationMarker, setGroundStationMarker] = useState(null); // To store the ground station marker
  const [distance, setDistance] = useState(50); // Set the distance in meters (default 50 meters)

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get("https://agroxsat.onrender.com/backendapi/");
        const { latitude, longitude } = response.data;
        setCoordinates({ latitude, longitude });
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    const fetchAllCoordinates = async () => {
      try {
        const response = await axios.get("https://agroxsat.onrender.com/backendapi/satLocation/");
        const { coordinates } = response.data;
        console.log("data",coordinates);
        setAllCoordinates(coordinates); 
      } catch (error) {
        console.error("Error fetching all coordinates:", error);
      }
    };

    fetchCoordinates();
    fetchAllCoordinates();

    const intervalId = setInterval(() => {
      fetchCoordinates();
      fetchAllCoordinates();
    }, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude && allCoordinates.length > 0) {
      initMap();
    }
  }, [coordinates, allCoordinates]);

  const initMap = () => {
    if (map) return; 

    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 13,
    });

    setMap(mapInstance);

    mapInstance.on("load", () => {
      // Add the ground station marker
      const groundStationMarkerElement = document.createElement("div");
      groundStationMarkerElement.style.backgroundImage = "url('/GSimage.jpg')";
      groundStationMarkerElement.style.width = "30px";
      groundStationMarkerElement.style.height = "30px";
      groundStationMarkerElement.style.backgroundSize = "contain";

      const marker = new mapboxgl.Marker(groundStationMarkerElement)
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(mapInstance);

      setGroundStationMarker(marker);

      
      const latestCoord = allCoordinates[allCoordinates.length - 1];
      const latestMarkerElement = document.createElement("div");
      latestMarkerElement.style.backgroundImage = "url('/cubesat.jpg')";
      latestMarkerElement.style.width = "30px";
      latestMarkerElement.style.height = "30px";
      latestMarkerElement.style.backgroundSize = "contain";

      const latestMarkerInstance = new mapboxgl.Marker(latestMarkerElement)
        .setLngLat([latestCoord.longitude, latestCoord.latitude])
        .addTo(mapInstance);

      setLatestMarker(latestMarkerInstance);

      
      const line = turf.lineString(
        allCoordinates.map(coord => [coord.longitude, coord.latitude])
      );

      
      mapInstance.addSource("line-source", { type: "geojson", data: line });
      mapInstance.addLayer({
        id: "line-layer",
        type: "line",
        source: "line-source",
        paint: {
          "line-color": "#00FF00", // Green color
          "line-width": 3,
        },
      });

      // Create a green circle around the ground station
      const groundStationPoint = turf.point([coordinates.longitude, coordinates.latitude]);
      const circle = turf.circle(groundStationPoint, distance, { units: 'meters' });

      // Add the circle to the map
      mapInstance.addSource("circle-source", {
        type: "geojson",
        data: circle
      });

      mapInstance.addLayer({
        id: "circle-layer",
        type: "fill",
        source: "circle-source",
        paint: {
          "fill-color": "#00FF00",
          "fill-opacity": 0.3
        }
      });

      
      const bounds = new mapboxgl.LngLatBounds();
      allCoordinates.forEach(coord => bounds.extend([coord.longitude, coord.latitude]));
      mapInstance.fitBounds(bounds, { padding: 50 });
    });
  };

  useEffect(() => {
    if (latestMarker && allCoordinates.length > 0) {
      const latestCoordinate = allCoordinates[allCoordinates.length - 1];

      
      latestMarker.setLngLat([latestCoordinate.longitude, latestCoordinate.latitude]);

      
      const line = turf.lineString(
        allCoordinates.map(coord => [coord.longitude, coord.latitude])
      );

      
      if (map.getSource("line-source")) {
        map.getSource("line-source").setData(line);
      } else {
        map.addSource("line-source", { type: "geojson", data: line });
        map.addLayer({
          id: "line-layer",
          type: "line",
          source: "line-source",
          paint: {
            "line-color": "#00FF00", 
            "line-width": 3,
          },
        });
      }

      
      const bounds = new mapboxgl.LngLatBounds();
      allCoordinates.forEach(coord => bounds.extend([coord.longitude, coord.latitude]));
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [allCoordinates]);

  if (!coordinates.latitude || !coordinates.longitude || allCoordinates.length === 0) {
    return <div>Loading map...</div>;
  }

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapboxComponent;
