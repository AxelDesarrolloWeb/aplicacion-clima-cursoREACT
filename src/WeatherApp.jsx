import { useCity } from "./config/useCity";
import { useFetchClima } from "./config/useFetchClima";

export const WeatherApp = () => {

  const  { ciudad, handleCambiarCiudad } = useCity();
  const  { dataClima, error, fetchClima } = useFetchClima(ciudad);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) {
      fetchClima();
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>

      <form onSubmit={handleSubmit}>
        <input value={ciudad} type="text" onChange={handleCambiarCiudad} />
        <button type="submit">Buscar</button>
      </form>

      {/* Mostrar datos del clima si hay información disponible */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {dataClima.main.temp}ºc</p>
          <p>Condicion meteorológica: {dataClima.weather[0].description}</p>
          {
            <img
              src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
              alt="Icon clima"
            />
          }
        </div>
      )}
    </div>
  );
};
