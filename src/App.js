import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData,prettyPrintStat } from "./util";
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


// "https://disease.sh/v3/covid-19/countries"
// USEEFFECT = runs a piece of code based on a given condition

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter ] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  
  }, [])

useEffect(() => {
  //code is asynchronous
  //code runs once
  //when the component loads annd not again

  const getCountriesData = async () => {
    await fetch ("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => ({
          name: country.country,   //USA, UK
          value: country.countryInfo.iso2, //UK,USA,France
        }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
    });
  };

  getCountriesData();
}, []);

const onCountryChange = async(event) => {
  const countryCode = event.target.value;

  //console.log("code:",countryCode); testing

  const url = 
  countryCode === "worldwide" 
  ? "https://disease.sh/v3/covid-19/all" : 
  `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then(response => response.json())
  .then(data =>{
    setCountry(countryCode);

    //All the data from country response
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  })
  //  https://disease.sh/v3/covid-19/all
  // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
};

console.log('countryinfo', countryInfo);

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown" >
      <Select 
      variant="outlined" 
      value= {country} onChange={onCountryChange}>

    <MenuItem value="worldwide">Worldwide</MenuItem>
        {/* Loop thru all the countires and show a drop down list */}
    {countries.map(country => (
    <MenuItem value={country.value}>{country.name}</MenuItem>
      ))}

        {/* <MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">Worldwide 1</MenuItem>
        <MenuItem value="worldwide">Worldwide 2</MenuItem>
        <MenuItem value="worldwide">Worldwide 3</MenuItem> */}

      </Select>
    </FormControl>
      </div>
    
{/* We use BEM naming convention*/}

  <div className="app__stats">
        <InfoBox 
        onClick={(e) => setCasesType("cases")}
        title="Coronavirus cases"
         cases={prettyPrintStat(countryInfo.todayCases)} 
         total={prettyPrintStat(countryInfo.cases)}
         />
        
        <InfoBox 
        onClick={(e) => setCasesType("recovered")}
        title="Recovered" 
        cases={prettyPrintStat(countryInfo.todayRecovered)} 
        total={prettyPrintStat(countryInfo.recovered)}
        />

        <InfoBox 
        onClick={(e) => setCasesType("deaths")}
        title="Deaths" 
        cases={prettyPrintStat(countryInfo.todayDeaths)} 
        total={prettyPrintStat(countryInfo.deaths)}
        />
  </div>


    <Map 
    casesType={ casesType }
    countries= { mapCountries }
    center={ mapCenter }
    zoom = { mapZoom } 
    />
      </div>

      
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}/>
        <br/>
        <h3>Worldwide new cases</h3>

        <LineGraph/>
      </CardContent>
    
    
    </Card>
    </div>
  );
}

export default App;