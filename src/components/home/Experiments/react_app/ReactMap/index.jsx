import React, { useState, useEffect, useRef } from "react";

import styles from "./main.module.styl";

import citys from "@/assets/world-cities_json";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const randomPlace = citys[(Math.random() * 23018).toFixed(0)];

const ReactMap = ({}) => {
  const [place, setPlace] = useState([0, 0]);
  const mapRef = useRef();
  const [loadingFlyTo, setLoadingFlyTo] = useState(false);

  useEffect(() => {
    getPlace();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      console.log("initiated fly");
      setTimeout(() => {
        fly(map);
      }, 500);
    }
  }, [place]);

  const olten = [7.90329, 47.34999];

  const fly = async (map) => {
    setLoadingFlyTo(true);
    map.flyTo({ center: [place[1], place[0]], preloadOnly: true });
    await map.once("idle");
    console.log("loadded");
    setLoadingFlyTo(false);
    map.flyTo({ center: [place[1], place[0]] });
  };

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
        <div className={[styles.marker].join(" ")} />
        {randomPlace.name}
      </div>
      {loadingFlyTo && (
        <div className={[styles.loaderFly].join(" ")}>
          <p>
            We are currently loading the animation from Olten, to{" "}
            {randomPlace.name}, {randomPlace.country}.
          </p>
        </div>
      )}
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={{
          longitude: olten[0],
          latitude: olten[1],
          zoom: 8,
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
