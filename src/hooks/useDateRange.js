import { useState } from "react";

export const useDateRange = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const selectDate = (date) => {
    setSelectedDate(date); 

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const isStart = (date) => isSameDay(date, startDate);
  const isEnd = (date) => isSameDay(date, endDate);

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  return {
    startDate,
    endDate,
    selectedDate,
    selectDate,
    isStart,
    isEnd,
    isInRange,
  };
};