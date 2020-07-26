import React from 'react'
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from './util';

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                url = "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
 {/* Loop thru countries and draw circles on screen */}
            {showDataOnMap(countries, casesType)}
            </LeafletMap>
            {/* <h1>I am a map</h1> */}
        </div>
    );
}

export default Map;
