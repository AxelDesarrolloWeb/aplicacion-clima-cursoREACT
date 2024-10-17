// useFetchClima.jsx
import { useState } from "react";
import { config } from "./config";

export const useFetchClima = (ciudad) => {
  const [dataClima, setDataClima] = useState(null);
  const [error, setError] = useState("");

  const fetchClima = async () => {
    try {
      const response = await fetch(
        `${config.urlBase}?q=${ciudad}&appid=${config.ApiKey}${config.lang}${config.units}`
      );
      const data = await response.json();
      if (response.ok) {
        setDataClima(data);
        setError("");
      } else {
        setError("Ciudad no encontrada. Inténtalo de nuevo.");
        setDataClima(null);
      }
    } catch (error) {
      setError("Ocurrió un error al obtener los datos. Inténtalo más tarde.");
      setDataClima(null);
    }
  };

  return { dataClima, error, fetchClima };
};
