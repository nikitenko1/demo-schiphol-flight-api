import React from "react";
import styled from "styled-components";

const DateSelect = ({ dates, selectDateHandler }) => {
  const dateOptions = dates.map((date) => {
    const currentDate = new Date();
    const tomorrow = new Date(Number(currentDate));
    tomorrow.setDate(tomorrow.getDate() + date);

    const formattedDate =
      date === 0
        ? "Today"
        : date === 1
        ? "Tomorrow"
        : tomorrow.getDate() + " " + tomorrow.toLocaleString("en-us", { month: "short" });

    return (
      <option key={date} value={date}>
        {formattedDate}
      </option>
    );
  });

  return (
    <Select name="date" id="date" onChange={(e) => selectDateHandler(e)}>
      {dateOptions}
    </Select>
  );
};

export default DateSelect;

const Select = styled.select`
  width: 22rem;
  height: 35px;
  background: white;
  color: gray;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 1rem;
  border: none;
  margin-left: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-left: 1rem;

  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
