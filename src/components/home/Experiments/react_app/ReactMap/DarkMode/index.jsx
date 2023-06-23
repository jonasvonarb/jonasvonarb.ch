import React, { useState, useEffect } from "react";

import styles from "./main.module.styl";

const DarkMode = ({}) => {
  useEffect(() => {
    getData();
  }, []);
  const getData = async (d) => {
    await fetch(
      "https://ucdpapi.pcr.uu.se/api/gedevents/23.1?pagesize=100&Country=90,91,92"
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        // nominatimData.value = data;
      });
  };

  return <div className={[styles.container].join(" ")}></div>;
};

export default DarkMode;
