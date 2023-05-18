import React, { useState, useEffect, useRef } from "react";

import styles from "./main.module.css";

import citys from "@/assets/world-cities_json";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const randomPlace = citys[(Math.random() * 23018).toFixed(0)];

const ReactMap = ({}) => {
  const [place, setPlace] = useState([0, 0]);
  const mapRef = useRef();

  useEffect(() => {
    getPlace();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.flyTo({ center: [place[1], place[0]] });
    }
  }, [place]);

  const getPlace = async (d) => {
    await fetch(
      `https://nominatim.openstreetmap.org/search?q=${randomPlace.name}&format=json&limit=1`
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setPlace([+data[0].lat, +data[0].lon]);
      });
  };
  return (
    <div className={[styles.container].join(" ")}>
      <div className={[styles.placeName].join(" ")}>
        {randomPlace.name}
      </div>
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={{
          longitude: 7.90329,
          latitude: 47.34999,
          zoom: 10,
        }}
        projection="globe"
        mapboxAccessToken="pk.eyJ1Ijoiam9uYXN2b25hIiwiYSI6ImNrbnl0eG83azFrOWsybnBzaWN3MXJtaWIifQ.ZGtwL5am2jW7AH0OiQGcNg"
        mapStyle="mapbox://styles/jonasvona/clhtambtz002701qsa98pdtte"
      >
        <Marker longitude={place[1]} latitude={place[0]} anchor="center">
          <div className={[styles.marker].join(" ")} />
        </Marker>
      </Map>
    </div>
  );
};

export default ReactMap;