import FlightCard from "../FlightCard";
import styled from "styled-components";

const Board = ({ arrival, data, filteredData }) => {
  return (
    <BoardContainer>
      {filteredData?.length
        ? filteredData.map((flight, id) => {
            return (
              <div key={id}>
                <FlightCard arrival={arrival} flight={flight} />
              </div>
            );
          })
        : data.map((flight, id) => {
            return (
              <div key={id}>
                <FlightCard arrival={arrival} flight={flight} />
              </div>
            );
          })}
    </BoardContainer>
  );
};

export default Board;

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 2rem;
  gap: 2rem;
`;
