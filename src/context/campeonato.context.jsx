import { createContext, useState } from "react";

//valor que voce quer acessar
export const CampeonatoContext = createContext({
  campeonatoID: null,
  serieID: null,
  rodadaID: null,
  campeonatoName: "",
  serieName: "",
  setCampeonatoID: () => null,
  setSerieID: () => null,
  setRodadaID: () => null,
  setCampeonatoName: () => null,
  setSerieName: () => null,
});

//Provider é o componente funcional
export const CampeonatoProvider = ({ children }) => {
  const [campeonatoID, setCampeonatoID] = useState("");
  const [campeonatoName, setCampeonatoName] = useState("");
  const [serieID, setSerieID] = useState("");
  const [serieName, setSerieName] = useState("");
  const [rodadaID, setRodadaID] = useState("");
  const value = {
    campeonatoID,
    setCampeonatoID,
    campeonatoName,
    setCampeonatoName,
    serieID,
    setSerieID,
    serieName,
    setSerieName,
    rodadaID,
    setRodadaID,
  };

  return (
    <CampeonatoContext.Provider value={value}>
      {children}
    </CampeonatoContext.Provider>
  );
};
