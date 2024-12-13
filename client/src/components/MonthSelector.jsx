import React, { useState, useEffect } from "react";

const MonthYearSelector = ({ onMonthYearChange }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    // Recuperar el mes y año almacenados o usar el mes y año actual
    const storedMonthYear = localStorage.getItem("selectedMonthYear");
    return storedMonthYear || new Date().toISOString().slice(0, 7); // Formato: "YYYY-MM"
  });

  useEffect(() => {
    // Guardar el mes y año seleccionados en el almacenamiento local
    localStorage.setItem("selectedMonthYear", selectedMonthYear);
  }, [selectedMonthYear]);

  const handleMonthYearChange = (event) => {
    console.log(event.target.value);
    const newMonthYear = event.target.value;
    setSelectedMonthYear(newMonthYear);
    if (onMonthYearChange) {
      onMonthYearChange(newMonthYear);
    }
  };

  return (
    <div className="card">
      <div className="centered">
        <label htmlFor="month-year-input">Selecciona mes: </label>
        <input
          id="month-year-input"
          type="month"
          value={selectedMonthYear}
          onChange={handleMonthYearChange}
        />
      </div>
    </div>
  );
};

export default MonthYearSelector;
