import React, { useState, useEffect } from "react";

const MonthYearSelector = ({ onMonthYearChange, value: valueProp }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    const storedMonthYear = localStorage.getItem("selectedMonthYear");
    return storedMonthYear || new Date().toISOString().slice(0, 7); // Formato: "YYYY-MM"
  });

  const displayValue = valueProp ?? selectedMonthYear;

  useEffect(() => {
    localStorage.setItem("selectedMonthYear", displayValue);
  }, [displayValue]);

  useEffect(() => {
    if (valueProp !== undefined) {
      setSelectedMonthYear(valueProp);
    }
  }, [valueProp]);

  const handleMonthYearChange = (event) => {
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
          value={displayValue}
          onChange={handleMonthYearChange}
        />
      </div>
    </div>
  );
};

export default MonthYearSelector;
