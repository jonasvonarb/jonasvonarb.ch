import React, { useState, useEffect } from "react";

import styles from "./main.module.styl";

const DarkMode = ({}) => {
  useEffect(() => {
    getData();
  }, []);
  const getData = async (d) => {
    await fetch(
      "https://ucdpapi.pcr.uu.se/api/gedevents/23.1?pagesize=100&StartDate=2014-01-15&EndDate=2015-02-28",
      { mode: "cors" }
    )
      .then((r) => console.log("ucdpapi", r))
      .then((data) => {
        console.log("ucdpapi", data);
        // nominatimData.value = data;
      });
  };

  return <div className={[styles.container].join(" ")}></div>;
};

export default DarkMode;
