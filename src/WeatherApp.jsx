import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const ApiKey = "972c7a5d49917b4c56eeb3fccf16b583";
  const lang = "&lang=es";
  const units = "&units=metric"; // Para obtener las temperaturas en grados Celsius

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);
  const [error, setError] = useState('');

  // Cambia el valor de la ciudad
  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) {
      fetchClima();
    }
  };

  // Función para hacer la llamada a la API
  const fetchClima = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${ciudad}&appid=${ApiKey}${lang}${units}`
      );
      const data = await response.json();
      if (response.ok) {
        setDataClima(data);
        setError(""); // Limpiar cualquier error previo si la ciudad es válida
      } else {
        setError("Ciudad no encontrada. Inténtalo de nuevo."); // Manejar error de ciudad no válida
        setDataClima(null); // Limpiar datos anteriores
      }
    } catch (error) {
      setError("A ocurrido un error al obtener los datos. Inténtalo de nuevo."); // Manejar errores de red
      setDataClima(null); // Limpiar datos anteriores
    }
  };

  
  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>

      <form onSubmit={handleSubmit}>
        <input value={ciudad} type="text" onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>

{/* Mostrar datos del clima si hay información disponible */}
      {error && <p style={{color: "red"}}>{error}</p>}

      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {dataClima.main.temp}ºc</p>
          <p>Condicion meteorológica: {dataClima.weather[0].description}</p>
          {<img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Icon clima" />}
        </div>
      )}
    </div>
  );
};
