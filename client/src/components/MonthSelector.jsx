import Select from "react-select";
import { useState, useEffect } from "react";

export default function MonthSelector({ onDateChange }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const actualYear = new Date().getFullYear();
  const yearOptions = [];

  for (let i = 0; i < 3; i++) {
    yearOptions.push({ value: actualYear - i, label: actualYear - i });
  }

  const monthOptions = [
    { value: 0, label: "Enero" },
    { value: 1, label: "Febrero" },
    { value: 2, label: "Marzo" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Mayo" },
    { value: 5, label: "Junio" },
    { value: 6, label: "Julio" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Septiembre" },
    { value: 9, label: "Octubre" },
    { value: 10, label: "Noviembre" },
    { value: 11, label: "Diciembre" },
  ];

  useEffect(() => {
    const month = new Date().getMonth();
    const monthOption = monthOptions.find((option) => option.value === month);
    setSelectedMonth(monthOption);

    const year = new Date().getFullYear();
    const yearOption = yearOptions.find((option) => option.value === year);
    setSelectedYear(yearOption);
  }, []);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const month = selectedMonth.value;
    const year = selectedYear.value;
    onDateChange(month, year);
  };

  return (
    <>
      <div className="card">
        <h3 htmlFor="month">Elige la fecha que quieres revisar</h3>

        <form onSubmit={handleSubmit} className="month-selector">
          <Select
            placeholder="Mes"
            options={monthOptions}
            value={selectedMonth}
            onChange={handleMonthChange}
            className="date-info"
          />

          <Select
            placeholder="Año"
            options={yearOptions}
            value={selectedYear}
            onChange={handleYearChange}
            className="date-info"
          />

          <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  );
}
