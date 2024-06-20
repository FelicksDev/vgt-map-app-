import MyMap from "./MyMap";
import { useState } from "react";
import { CheckboxInput, RangeInput } from "./components/InputTypes";
function App() {
  const [showMarker, setShowMarkers] = useState(false);
  const [showStations, setShowStations] = useState(false);
  const [showHeatPoints, setShowHeatPoints] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const [opacityValue, setOpacityValue] = useState(0.5); // Valor inicial del rango
  // Estado del select de la fuente de datos
  const [sourceSelectedOption, setSourceSelectedOption] = useState("none");
  const handleRangeChange = (event) => {
    setOpacityValue(event.target.value);
  };
  function handleShowMarkers(e) {
    setShowMarkers(e.target.checked);
  }
  function handleShowHeatPoints(e) {
    setShowHeatPoints(e.target.checked);
  }
  function handleSourceSelectedOption(e) {
    setSourceSelectedOption(e.target.value);
  }
  function handleShowStations(e) {
    setShowStations(e.target.checked);
  }

  function NasaConfiguration() {
    return (
      <>
        <CheckboxInput
          type="checkbox"
          id="heatMarkers"
          label="Mostrar marcadores"
          value={showMarker}
          handleChange={handleShowMarkers}
        />
        <CheckboxInput
          type="checkbox"
          id="heatMarkers"
          label="Mostrar puntos de calor"
          value={showHeatPoints}
          handleChange={handleShowHeatPoints}
        />
        {/* TODO : Renderizado condicional para mostrar la  configuracion de opacidad  */}
        {selectedOption != "none" ? (
          <RangeInput value={opacityValue} handleChange={handleRangeChange} />
        ) : null}
      </>
    );
  }

  function ViewGreenConfiguration() {
    return (
      <>
        <CheckboxInput
          type="checkbox"
          id="showStations"
          label="Mostrar Estaciones de ViewGreen"
          value={showStations}
          handleChange={handleShowStations}
        />
        {selectedOption != "none" ? (
          <RangeInput value={opacityValue} handleChange={handleRangeChange} />
        ) : null}
      </>
    );
  }
  function showDataSourceOptions(mapType) {
    switch (mapType) {
      case "none":
        return (
          <h2 className="text-white text-md">Seleccione una fuente de datos</h2>
        );
      case "nasa":
        return <NasaConfiguration />;
      case "viewGreen":
        return <ViewGreenConfiguration />;
      default:
        return <h2>Ocurrio un error</h2>;
    }
  }
  function handleSelectedOption(e) {
    setSelectedOption(e.target.value);
  }
  return (
    <>
      <section className="bg-neutral-800 px-48 py-0">
        <div className="text-2xl font-bold bg-amber-500 text-white p-8 rounded-md flex justify-center">
          <p>ViewGreen SOMINDEFA</p>
        </div>
        <div className="flex flex-wrap md:flex-row justify-around box-border p-3 bg-neutral-700 rounded-lg my-4">
          <section className="flex flex-col md:flex-row gap-4">
            <div>
              <label
                htmlFor="mapType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seleccione una fuente de datos:
              </label>
              <select
                id="mapType"
                value={sourceSelectedOption}
                onChange={handleSourceSelectedOption}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="none">Seleccione fuente de datos</option>
                <option value="nasa">Nasa FIRMS</option>
                <option value="viewGreen">View Green Stations</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="layerType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seleccione una capa:
              </label>
              <select
                id="layerType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedOption}
                onChange={handleSelectedOption}
              >
                <option value="none">Seleccione una capa</option>
                <option value="idw-interpolation">Interpolación por IDW</option>
                <option value="krigin-interpolation">
                  Interpolación por Krigin
                </option>
              </select>
            </div>
          </section>
          <section className="flex flex-col justify-center mt-4 md:mt-0">
            {showDataSourceOptions(sourceSelectedOption)}
          </section>
        </div>
        <div className="rounded-b-md">
          <MyMap
            dataSource={sourceSelectedOption}
            isCheckedHeatMarkers={showMarker}
            showHeatPoints={showHeatPoints}
            selectedOption={selectedOption}
            opacity={opacityValue}
            showStations={showStations}
          />
        </div>
      </section>
    </>
  );
}

export default App;
