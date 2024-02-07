import { useState } from "react";
import { ImClock } from "react-icons/im";
import styled from "styled-components";

const Time = () => {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);
  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(() => {
    updateTime();
  }, 1000);

  return (
    <Clock>
      <ImClock />
      {currentTime}
    </Clock>
  );
};

export default Time;

const Clock = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  margin: 0;
  color: #141251;
`;
