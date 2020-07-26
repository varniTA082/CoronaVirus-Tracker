import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import React from "react";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
       // rgb: "rgb(204, 16, 52)",
      //  half_op: "rgba(204,16,52,0.5)",
        multiplier:800,
    },
    recovered: {
        hex: "#7dd71d",
       // rgb: "rgb(125, 215, 29)",
     //   half_op: "rgba(125,215,29,0.5)",
        multiplier:1200,
    },
    deaths: {
        hex: "#fb4443",
      //  rgb: "rgb(251, 68, 67)",
      //  half_op: "rgba(251,68,67,0.5)",
        multiplier:2000,
    }
};

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => {

        console.log(a.cases);

        if(a.cases > b.cases){
            return -1;
        }
        else {
            return 1;
        }
    });
    return sortedData;
}

export const showDataOnMap = (data, casesType='cases') => 
  data.map((country) => (
<Circle
center={[country.countryInfo.lat, country.countryInfo.long]} 
fillOpacity={0.4}
color={casesTypeColors[casesType].hex}
fillColor={casesTypeColors[casesType].hex}
radius={
    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
}
>
    <Popup>
        <h1>I am a popup</h1>
    </Popup>
</Circle>
  ));

//or 
// return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1);