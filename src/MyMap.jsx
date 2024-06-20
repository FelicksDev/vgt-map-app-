import "./App.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "./data/weather.json";
import csvData from "./data/firms.csv";
import csvStations from "./data/estaciones_nuevas.csv";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

function MyMap({
  isCheckedHeatMarkers,
  showHeatPoints,
  selectedOption,
  dataSource,
  opacity,
  showStations,
}) {
  function fetchStationsData() {
    // Converitlo a fetch o await por extrare eun api
    var data = csvStations;
    return data;
  }

  const dataStations = fetchStationsData();
  const LaPazLocation = [-16.489689, -68.119293];
  //An extract of address points from the LINZ bulk extract: http://www.linz.govt.nz/survey-titles/landonline-data/landonline-bde
  //Should be this data set: http://data.linz.govt.nz/#/layer/779-nz-street-address-electoral/
  const dataArray = Object.values(csvData);
  const heatPoints = dataArray.map((row) => [
    Number(row.latitude),
    Number(row.longitude),
    Number(row.frp),
  ]);
  var myBounds = [
    [-18.0331650000000003, -69.0459869999999967],
    [-15.2366890799999997, -63.464638751999999],
  ];
  return (
    <>
      <MapContainer
        style={{}}
        center={LaPazLocation}
        zoom={12}
        // style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={stationLocation}>
          <Popup>Estacion ViewGreen.Tec</Popup>
        </Marker> */}
        {/* <Marker position={[csvStations[0].latitude, csvStations[0].longitude]}>
          <Popup>Estacion ViewGreen.Tec CSV</Popup>
        </Marker> */}
        {showStationsMarkers(showStations, dataStations)};
        {showMapHeatPoints(heatPoints, showHeatPoints)}
        {showSelectedOption(selectedOption, myBounds, opacity, dataSource)}
        {showHeatMarkersFunction(isCheckedHeatMarkers)}
        {/* <Marker position={LaPazLocation}>
          <Popup>
            La Paz, Bolivia <br /> Capital
          </Popup>
        </Marker> */}
        {/* <WeatherMarkers /> */}
      </MapContainer>
    </>
  );
}
function showStationsMarkers(show, stationsData) {
  if (show) {
    return (
      <>
        {stationsData.map((station, index) => {
          return (
            <Marker
              key={index}
              position={[Number(station.latitud), Number(station.longitud)]}
            >
              <Popup>
                <b>Estacion:</b> {station.id}
                <br />
                <b>Nombre:</b> {station.nombre}
                <br />
                <b>MQ2:</b> {Number(station.mq2).toFixed(3)}
                <br />
                <b>MQ7:</b> {Number(station.mq7).toFixed(3)}
                <br />
                <b>MQ135:</b> {Number(station.mq135).toFixed(3)}
                <br />
                <b>Actualización:</b> {station.fecha_actualizacion}
                {/* <p className="mt-1">ViewGreen.Tec</p> */}
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  }
}
function ShowDataSource(
  dataSourceSelection,
  heatPoints,
  showHeatPoints,
  selectedOption,
  myBounds,
  isCheckedHeatMarkers
) {
  switch (dataSourceSelection) {
    case "none":
      return;
    case "nasa":
      return (
        <>
          {showMapHeatPoints(heatPoints, showHeatPoints)}
          {showSelectedOption(selectedOption, myBounds)}
          {showHeatMarkersFunction(isCheckedHeatMarkers)}
        </>
      );
    case "viewGreen":
      return showHeatMarkers();
    default:
      return <h2>Ocurrio un error</h2>;
  }
}
function showSelectedOption(selectedOption, bounds, opacity, dataSource) {
  switch (selectedOption) {
    case "none":
      return;
    case "idw-interpolation":
      return showIdwInterpolation(bounds, opacity, dataSource);
    case "krigin-interpolation":
      return showKriginInterpolation(bounds, opacity, dataSource);
    default:
      return null;
  }
}

function showIdwInterpolation(bounds, opacity, dataSource) {
  console.log(dataSource);

  var url = "";

  switch (dataSource) {
    case "nasa":
      url =
        "https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/images/idw-.jpg";
      break;
    case "viewGreen":
      {
        // bounds = [
        //   [-16.512407, -68.176519],
        //   [-16.495948, -68.159782],
        // ];
        bounds = [
          [-16.5139483, -68.1761886],
          [-16.5063497, -68.1636121],
        ];
        url =
          "https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/images/nuevas_estaciones/estaciones_idw.jpg";
      }
      break;
    default:
      url =
        "https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/images/idw-.jpg";
      break;
  }

  return (
    <ImageOverlay
      url={url}
      opacity={opacity}
      bounds={
        //Va en Top Left y Bottom Right  on orden de
        //  [lat, lon]
        bounds
      }
    />
  );
}
function showKriginInterpolation(bounds, opacity, dataSource) {
  var url = "";

  switch (dataSource) {
    case "nasa":
      url =
        "https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/krigin.jpg";
      break;
    case "viewGreen":
      {
        // bounds = [
        //   [-16.512407, -68.176519],
        //   [-16.495948, -68.159782],
        // ];
        bounds = [
          [-16.5139483, -68.1761886],
          [-16.5063497, -68.1636121],
        ];
        url =
          "https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/images/nuevas_estaciones/estaciones_krig.jpg";
      }
      break;
    default:
      url =
        "https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/images/idw-.jpg";
      break;
  }

  return (
    <ImageOverlay
      // url="https://i.imgur.com/Ion6X7C.jpg"
      url={url}
      opacity={opacity}
      bounds={
        //Va en Top Left y Bottom Right  on orden de
        //  [lat, lon]
        bounds
      }
    />
  );
}
function showMapHeatPoints(heatPoints, show) {
  if (show)
    return (
      <HeatmapLayer
        fitBoundsOnLoad // Ajustar al bouding box de los puntos
        fitBoundsOnUpdate
        points={heatPoints}
        longitudeExtractor={(m) => m[1]}
        latitudeExtractor={(m) => m[0]}
        intensityExtractor={(m) => parseFloat(m[2])}
        // max={700} // Establecer el radio máximo de dispersión en 700 metros
        scaleRadius={false}
        radius={26} // Establecer el radio de dispersión en 20 metros si scaleRadius es false se mide en pixeles
        useLocalExtrema={true}
        blur={15}
        opacity={0.5}
      />
    );
}
function showHeatMarkersFunction(show) {
  if (show) return <DetailHeatMarkers data={csvData} />;
}
function DetailHeatMarkers({ data }) {
  return (
    <>
      {data.map((point, index) => {
        return (
          <Marker
            key={index}
            position={[Number(point.latitude), Number(point.longitude)]}
          >
            <Popup>
              <b>Instrument:</b> {point.instrument}
              <br />
              <b>Satelite:</b> {point.satellite}
              <br />
              <b>Confianza:</b> {point.confidence}
              <br />
              <b>FRP:</b> {point.frp}
              <br />
              <b>BRIGHT:</b> {point.bright_ti4}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

function WeatherMarkers() {
  return (
    <>
      {data.data_1h.time.map((time, index) => {
        const lat = data.metadata.latitude;
        const lon = data.metadata.longitude;
        const windSpeed = data.data_1h.windspeed_80m[index];
        const windDir = data.data_1h.winddirection_80m[index];
        const airDensity = data.data_1h.airdensity[index];
        const pressure = data.data_1h.surfaceairpressure[index];

        const arrowRotation = `rotate(${windDir}deg)`;

        return (
          <Marker key={index} position={[lat, lon]}>
            <Popup>
              <b>Time:</b> {time}
              <br />
              <b>Wind Speed:</b> {windSpeed} ms-1
              <br />
              <b>Wind Direction:</b>{" "}
              <div className="wind-arrow" style={{ transform: arrowRotation }}>
                ↑
              </div>
              <br />
              <b>Air Density:</b> {airDensity} kg/m³
              <br />
              <b>Pressure:</b> {pressure} hPa
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default MyMap;
