// useCity.jsx
import { useState } from "react";

export const useCity = () => {
  const [ciudad, setCiudad] = useState("");

  const handleCambiarCiudad = (e) => {
    setCiudad(e.target.value);
  };

  return { ciudad, handleCambiarCiudad };
};
